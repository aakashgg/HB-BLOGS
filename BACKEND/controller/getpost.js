import newPost from '../models/newPost.js';

const getpost = async (req, res) => {
    try {

        const posts = await newPost.find();
        res.send(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export default getpost;
