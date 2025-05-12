import jwt from 'jsonwebtoken';

const secret = 'hjvbshdvshuvdyus'; // Same secret used for signing JWT

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // You can access `req.user.id` etc. in routes
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default auth;
