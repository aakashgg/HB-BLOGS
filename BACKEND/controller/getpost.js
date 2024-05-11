import newPost from '../models/newPost.js';

const getpost = async (req, res) => {

    try {
        // Check if ID is provided in the request params
        if (req.params.id) {

            const post = await newPost.findById(req.params.id);
            if (!post) {
                // If no post found with the provided ID, return a 404 error
                return res.status(404).json({ message: 'Post not found' });
            }
            // If post found, return it as JSON response
            return res.json(post);
        } else {
            // If no ID provided, fetch all posts
            const posts = await newPost.find();
            res.json(posts);
        }
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default getpost;
