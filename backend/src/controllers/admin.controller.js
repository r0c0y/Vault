const prisma = require('../prismaClient');

exports.getDashboardStats = async (req, res) => {
    try {
        const [userCount, projectCount, totalViews, totalVotes, bannedUsers, verifiedUsers] = await Promise.all([
            prisma.user.count(),
            prisma.project.count(),
            prisma.project.aggregate({ _sum: { viewCount: true } }),
            prisma.project.aggregate({ _sum: { voteCount: true } }),
            prisma.user.count({ where: { isBanned: true } }),
            prisma.user.count({ where: { isVerified: true } })
        ]);

        res.json({
            users: userCount,
            projects: projectCount,
            views: totalViews._sum.viewCount || 0,
            votes: totalVotes._sum.voteCount || 0,
            bannedUsers,
            verifiedUsers
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                isBanned: true,
                isVerified: true,
                _count: { select: { projects: true } }
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Admin get users error:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } }
            }
        });
        res.json(projects);
    } catch (error) {
        console.error('Admin get projects error:', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

exports.getProjectDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                user: { select: { name: true, email: true, avatarUrl: true } }
            }
        });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        console.error('Admin get project details error:', error);
        res.status(500).json({ message: 'Failed to fetch project details' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Admin delete user error:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.project.delete({ where: { id } });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Admin delete project error:', error);
        res.status(500).json({ message: 'Failed to delete project' });
    }
};

// Toggle User Ban Status
exports.toggleBanUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { isBanned: !user.isBanned }
        });
        res.json({ message: `User ${updatedUser.isBanned ? 'banned' : 'unbanned'}`, isBanned: updatedUser.isBanned });
    } catch (error) {
        console.error('Toggle ban error:', error);
        res.status(500).json({ message: 'Failed to toggle ban status' });
    }
};

// Toggle User Verification Status
exports.toggleVerifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { isVerified: !user.isVerified }
        });
        res.json({ message: `User ${updatedUser.isVerified ? 'verified' : 'unverified'}`, isVerified: updatedUser.isVerified });
    } catch (error) {
        console.error('Toggle verify error:', error);
        res.status(500).json({ message: 'Failed to toggle verification status' });
    }
};

// Toggle Project Feature Status
exports.toggleFeatureProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const updatedProject = await prisma.project.update({
            where: { id },
            data: { isFeatured: !project.isFeatured }
        });
        res.json({ message: `Project ${updatedProject.isFeatured ? 'featured' : 'unfeatured'}`, isFeatured: updatedProject.isFeatured });
    } catch (error) {
        console.error('Toggle feature error:', error);
        res.status(500).json({ message: 'Failed to toggle feature status' });
    }
};

// Toggle Project Publish Status (Shadowban)
exports.togglePublishProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const updatedProject = await prisma.project.update({
            where: { id },
            data: { isPublished: !project.isPublished }
        });
        res.json({ message: `Project ${updatedProject.isPublished ? 'published' : 'hidden'}`, isPublished: updatedProject.isPublished });
    } catch (error) {
        console.error('Toggle publish error:', error);
        res.status(500).json({ message: 'Failed to toggle publish status' });
    }
};
