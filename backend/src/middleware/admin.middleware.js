const adminMiddleware = (req, res, next) => {
    const adminSecret = req.headers['x-admin-secret'];

    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: 'Forbidden: Invalid Admin Secret' });
    }

    next();
};

module.exports = adminMiddleware;
