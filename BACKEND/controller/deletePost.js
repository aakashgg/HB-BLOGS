import newPost from '../models/newPost.js';
import { v2 as cloudinary } from 'cloudinary';

export default async function DeletePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id; // Ensure your auth middleware sets this

        const post = await newPost.findById(postId);

        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author.toString() !== userId) return res.status(403).json({ message: 'Unauthorized' });

        // Delete image from Cloudinary (if exists)
        if (post.imageId) {
            await cloudinary.uploader.destroy(post.imageId);
        }

        // Delete post from MongoDB
        await newPost.findByIdAndDelete(postId);

        res.json({ message: 'Post and image deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
