const prisma = require('../../prismaClient');

// Get all projects (Explore Feed) with filters and pagination
exports.getProjects = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, tech, sort } = req.query;
        const skip = (page - 1) * limit;

        const where = {
            isPublished: true,
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { user: { name: { contains: search, mode: 'insensitive' } } }
                ],
            }),
        };

        // Handle multiple tech stack filters
        if (tech) {
            const techFilters = tech.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
            if (techFilters.length > 0) {
                where.techStack = {
                    hasSome: techFilters // Matches if project has ANY of the selected tags
                };
            }
        }

        let orderBy;
        switch (sort) {
            case 'oldest':
                orderBy = { createdAt: 'asc' };
                break;
            case 'most_voted':
                orderBy = { voteCount: 'desc' };
                break;
            case 'least_voted':
                orderBy = { voteCount: 'asc' };
                break;
            case 'most_viewed':
                orderBy = { viewCount: 'desc' };
                break;
            case 'least_viewed':
                orderBy = { viewCount: 'asc' };
                break;
            case 'newest':
            default:
                orderBy = { createdAt: 'desc' };
                break;
        }

        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy,
                include: {
                    user: {
                        select: { id: true, name: true, avatarUrl: true },
                    },
                },
            }),
            prisma.project.count({ where }),
        ]);

        res.json({
            projects,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

// Get user's projects (Dashboard)
exports.getMyProjects = async (req, res) => {
    try {
        const { page = 1, limit = 15, search, status } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        if (!req.user || !req.user.userId) {
            console.error('User ID missing in request');
            return res.status(401).json({ error: 'User ID missing' });
        }

        const userId = req.user.userId;
        console.log('Fetching projects for user:', userId, 'Page:', page);

        const where = {
            userId,
            ...(status === 'published' && { isPublished: true }),
            ...(status === 'draft' && { isPublished: false }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };

        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                orderBy: { updatedAt: 'desc' },
                skip: skip,
                take: parseInt(limit),
            }),
            prisma.project.count({ where })
        ]);

        res.json({
            projects,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get my projects error:', error);
        res.status(500).json({ error: 'Failed to fetch your projects' });
    }
};

// Get projects by user ID (Public Profile)
exports.getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 15 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where: {
                    userId: userId,
                    isPublished: true
                },
                orderBy: { createdAt: 'desc' },
                skip: skip,
                take: parseInt(limit),
                include: {
                    user: {
                        select: { id: true, name: true, avatarUrl: true }
                    }
                }
            }),
            prisma.project.count({
                where: {
                    userId: userId,
                    isPublished: true
                }
            })
        ]);

        res.json({
            projects,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get user projects error:', error);
        res.status(500).json({ error: 'Failed to fetch user projects' });
    }
};

// Get 2 random projects for matching
exports.getRandomProjects = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Get total count of published projects
        const count = await prisma.project.count({
            where: { isPublished: true }
        });

        if (count < 2) {
            return res.json([]);
        }

        // Get random skip
        const skip = Math.floor(Math.random() * (count - 1));

        const projects = await prisma.project.findMany({
            where: { isPublished: true },
            take: 2,
            skip: skip,
            include: {
                user: {
                    select: { id: true, name: true, avatarUrl: true }
                }
            }
        });

        res.json(projects);
    } catch (error) {
        console.error('Get random projects error:', error);
        res.status(500).json({ error: 'Failed to fetch random projects' });
    }
};

