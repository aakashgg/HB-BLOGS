import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Change type to String
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const newPost = mongoose.model("Post", postSchema);

export default newPost;
