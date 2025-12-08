const prisma = require('../prismaClient');

exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if already subscribed
        const existing = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        await prisma.subscriber.create({
            data: { email }
        });

        res.status(201).json({ message: 'Successfully subscribed to newsletter' });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
