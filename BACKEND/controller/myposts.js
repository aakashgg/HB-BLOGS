import jwt from 'jsonwebtoken';
import newPost from '../models/newPost.js';

const secret = 'hjvbshdvshuvdyus'; // Secret key for JWT

const getMyPosts = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const userId = decoded.id;

        const page = parseInt(req.query.page) || 1;
        const limit = 3; // Number of posts per page
        const skip = (page - 1) * limit;

        const totalPosts = await newPost.countDocuments({ author: userId });
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await newPost.find({ author: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages,
        });
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export default getMyPosts;
