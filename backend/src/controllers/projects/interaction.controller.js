const prisma = require('../../prismaClient');

// Vote/Like a project
exports.voteProject = async (req, res) => {
    try {
        const { id } = req.params;
        // Increment both viewCount and voteCount
        await prisma.project.update({
            where: { id },
            data: {
                viewCount: { increment: 1 },
                voteCount: { increment: 1 }
            }
        });
        res.json({ message: 'Voted successfully' });
    } catch (error) {
        console.error('Vote project error:', error);
        res.status(500).json({ error: 'Failed to vote project' });
    }
};
