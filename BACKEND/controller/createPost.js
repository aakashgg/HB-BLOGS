import newPost from '../models/newPost.js';
import jwt from 'jsonwebtoken';

const secret = 'hjvbshdvshuvdyus'; // You should move this to an environment variable!

const createPost = async (req, res) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        // Verify the token and extract user info
        const decoded = jwt.verify(token, secret);

        // Destructure fields from the request body
        const { title, summary, content } = req.body;

        // Get the uploaded image from Cloudinary (handled by Multer)
        const imageUrl = req.file?.path || null;      // Cloudinary URL
        const imagePublicId = req.file?.filename || null; // Cloudinary public_id (optional)

        // Create and save the post
        const post = new newPost({
            title,
            summary,
            content,
            author: decoded.id,          // ObjectId
            authorName: decoded.name,    // String
            image: imageUrl,             // Cloudinary URL
            imageId: imagePublicId       // optional: if you want to delete later
        });

        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default createPost;
