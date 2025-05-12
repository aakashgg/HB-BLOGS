import newPost from '../models/newPost.js';

const getpost = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;
    const authorQuery = req.query.author || "";

    try {
        if (req.params.id) {

            const post = await newPost.findById(req.params.id);
            if (!post) {
                // If no post found with the provided ID, return a 404 error
                return res.status(404).json({ message: 'Post not found' });
            }
            // If post found, return it as JSON response
            return res.json(post);
        } else {
            const filter = authorQuery
                ? { authorName: { $regex: new RegExp(authorQuery, "i") } }
                : {};

            const total = await newPost.countDocuments(filter);
            const posts = await newPost.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return res.json({
                posts,
                totalPages: Math.ceil(total / limit),
                currentPage: page
            });
        }
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default getpost;

