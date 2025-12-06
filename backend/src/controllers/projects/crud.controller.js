const prisma = require('../../prismaClient');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { title, description, techStack, images, isPublished, repoUrl, liveUrl, documentUrl } = req.body;
        const userId = req.user.userId;

        // Lowercase tech stack
        const lowercasedTechStack = techStack ? techStack.map(t => t.toLowerCase()) : [];

        const project = await prisma.project.create({
            data: {
                title,
                description,
                techStack: lowercasedTechStack,
                images: images || [],
                repoUrl,
                liveUrl,
                documentUrl,
                isPublished: isPublished || false,
                userId,
            },
        });

        res.status(201).json(project);
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        // Increment view count
        const project = await prisma.project.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
            include: {
                user: {
                    select: { id: true, name: true, avatarUrl: true, bio: true },
                },
                collabRequests: {
                    where: { status: 'approved' },
                    include: {
                        sender: { select: { id: true, name: true, avatarUrl: true } }
                    }
                }
            },
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, techStack, images, isPublished, repoUrl, liveUrl, documentUrl } = req.body;
        const userId = req.user.userId;

        // Verify ownership
        const existingProject = await prisma.project.findUnique({ where: { id } });
        if (!existingProject) return res.status(404).json({ error: 'Project not found' });
        if (existingProject.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

        // Lowercase tech stack
        const lowercasedTechStack = techStack ? techStack.map(t => t.toLowerCase()) : undefined;

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                techStack: lowercasedTechStack,
                images,
                repoUrl,
                liveUrl,
                documentUrl,
                isPublished,
            },
        });

        res.json(project);
    } catch (error) {
        console.error('Update project error:', error);
        // Return the actual error message for debugging
        res.status(500).json({ error: 'Failed to update project', details: error.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Verify ownership
        const existingProject = await prisma.project.findUnique({ where: { id } });
        if (!existingProject) return res.status(404).json({ error: 'Project not found' });
        if (existingProject.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

        await prisma.project.delete({ where: { id } });

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};
