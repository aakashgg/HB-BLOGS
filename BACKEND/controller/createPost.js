import newPost from '../models/newPost.js';


const createPost = async (req, res) => {
    try {

        const image = req.file;
        const { title, summary, content, author } = req.body;


        const post = new newPost({
            title,
            summary,
            content,
            author,
            image: image?.path,
        });

        // Save the post to the database
        await post.save();

        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default createPost;
