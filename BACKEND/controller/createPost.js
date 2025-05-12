import newPost from '../models/newPost.js';
import jwt from 'jsonwebtoken';

const secret = 'hjvbshdvshuvdyus';  // your JWT secret

const createPost = async (req, res) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;

        // Verify the token and extract user info
        const decoded = jwt.verify(token, secret);

        // Grab the uploaded image file
        const image = req.file;

        // Destructure from request body
        const { title, summary, content } = req.body;



        // Save both id and name
        const post = new newPost({
            title,
            summary,
            content,
            author: decoded.id,         // ObjectId
            authorName: decoded.name,   // String
            image: image?.path || null,
        });


        // Save to database
        await post.save();

        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default createPost;
