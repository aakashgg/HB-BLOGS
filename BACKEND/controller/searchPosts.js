import newPost from "../models/newPost.js";

const searchPosts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Query parameter is required" });

        const posts = await newPost.find({
            authorName: { $regex: query, $options: "i" }
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error searching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default searchPosts;
