import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PostData {
    image: string;
    title: string;
    content: string; // Use content instead of summary
    author: string;
    createdAt: string;
}

const SinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<PostData | null>(null);
    const formatDate = (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toISOString().split('T')[0]; // Extracting only the date part
    };
    useEffect(() => {
        // Fetch post from backend
        axios.get(`http://localhost:4100/getpost/${postId}`)
            .then(response => {
                // Update state with fetched post
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-3xl mx-auto">
                <img src={`http://localhost:4100/${post.image}`} alt={post.title} className="w-full h-auto" />
                <h1 className="text-3xl font-bold my-4">{post.title}</h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                <div className="text-gray-600 mb-4">
                    <p className="font-semibold">{post.author}</p>
                    <p>{formatDate(post.createdAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
