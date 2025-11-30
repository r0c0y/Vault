const prisma = require('../prismaClient');

exports.getDashboardStats = async (req, res) => {
    try {
        const [userCount, projectCount, totalViews, totalVotes] = await Promise.all([
            prisma.user.count(),
            prisma.project.count(),
            prisma.project.aggregate({
                _sum: { viewCount: true }
            }),
            prisma.project.aggregate({
                _sum: { voteCount: true }
            })
        ]);

        res.json({
            users: userCount,
            projects: projectCount,
            views: totalViews._sum.viewCount || 0,
            votes: totalVotes._sum.voteCount || 0
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
                _count: {
                    select: { projects: true }
                }
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
                user: {
                    select: { name: true, email: true }
                }
            }
        });
        res.json(projects);
    } catch (error) {
        console.error('Admin get projects error:', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete all related data first if not using cascade delete in DB
        // Prisma MongoDB doesn't support cascade delete natively in the same way SQL does for some relations,
        // but we'll rely on Prisma's relation handling or manual cleanup if needed.
        // For now, simple delete.
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
