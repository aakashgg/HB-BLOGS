import newPost from '../models/newPost.js'; // Keep original model name

export default async function DeletePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id; // Ensure auth middleware sets this

        const post = await newPost.findById(postId); // Use newPost here

        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author.toString() !== userId) return res.status(403).json({ message: 'Unauthorized' });

        await newPost.findByIdAndDelete(postId); // Use newPost here too
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
