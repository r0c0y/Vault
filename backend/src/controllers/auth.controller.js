const bcrypt = require("bcryptjs");
const prisma = require("../prismaClient");
const {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} = require("../utils/jwt");
const sendRefreshCookie = require("../utils/sendCookie");

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15d";
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "30d";

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    const payload = { userId: user.id, email: user.email };
    const accessToken = signAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET,
      ACCESS_EXPIRES
    );
    const refreshToken = signRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET,
      REFRESH_EXPIRES
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    sendRefreshCookie(res, refreshToken, process.env.NODE_ENV);

    return res.status(201).json({
      message: "User created successfully",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        bannerUrl: user.bannerUrl,
        location: user.location,
        portfolioUrl: user.portfolioUrl,
        resumeUrl: user.resumeUrl,
        socials: user.socials,
        createdAt: user.createdAt
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = signAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET,
      ACCESS_EXPIRES
    );
    const refreshToken = signRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET,
      REFRESH_EXPIRES
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    sendRefreshCookie(res, refreshToken, process.env.NODE_ENV);

    return res.json({
      message: "Logged in successfully",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        bannerUrl: user.bannerUrl,
        location: user.location,
        portfolioUrl: user.portfolioUrl,
        resumeUrl: user.resumeUrl,
        socials: user.socials,
        createdAt: user.createdAt
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const payload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
    if (!payload) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const newAccess = signAccessToken(
      { userId: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      ACCESS_EXPIRES
    );
    const newRefresh = signRefreshToken(
      { userId: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      REFRESH_EXPIRES
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefresh },
    });

    sendRefreshCookie(res, newRefresh, process.env.NODE_ENV);

    return res.json({
      accessToken: newAccess,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        bannerUrl: user.bannerUrl,
        location: user.location,
        portfolioUrl: user.portfolioUrl,
        resumeUrl: user.resumeUrl,
        socials: user.socials,
        createdAt: user.createdAt
      },
    });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      const payload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
      if (payload) {
        await prisma.user.update({
          where: { id: payload.userId },
          data: { refreshToken: null },
        });
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      bio: dbUser.bio,
      avatarUrl: dbUser.avatarUrl,
      bannerUrl: dbUser.bannerUrl,
      location: dbUser.location,
      portfolioUrl: dbUser.portfolioUrl,
      resumeUrl: dbUser.resumeUrl,
      socials: dbUser.socials,
      createdAt: dbUser.createdAt,
    });
  } catch (err) {
    console.error("Me endpoint error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if a user is logged in to determine "isFollowing" status
    // We can get the token from the header manually since this is a public route but might have auth
    let currentUserId = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          currentUserId = decoded.userId;
        } catch (e) {
          // Ignore invalid token
        }
      }
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        avatarUrl: true,
        bannerUrl: true,
        location: true,
        portfolioUrl: true,
        resumeUrl: true,
        socials: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            projects: { where: { isPublished: true } }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isFollowing = false;
    if (currentUserId) {
      const follow = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: id
          }
        }
      });
      isFollowing = !!follow;
    }

    res.json({ ...user, isFollowing });
  } catch (err) {
    console.error("Get user profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followingId = req.params.id;

    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    await prisma.follows.create({
      data: {
        followerId,
        followingId
      }
    });

    res.json({ message: "Followed successfully" });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Already following" });
    }
    console.error("Follow error:", error);
    res.status(500).json({ message: "Failed to follow user" });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followingId = req.params.id;

    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ message: "Failed to unfollow user" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, bio, avatarUrl, bannerUrl, location, portfolioUrl, resumeUrl, socials } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        avatarUrl,
        bannerUrl,
        location,
        portfolioUrl,
        resumeUrl,
        socials
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatarUrl: true,
        bannerUrl: true,
        location: true,
        portfolioUrl: true,
        resumeUrl: true,
        socials: true,
        createdAt: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
