function sendRefreshCookie(res, token, env) {
  const isProd = env === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  res.cookie("refreshToken", token, cookieOptions);
}

module.exports = sendRefreshCookie;
