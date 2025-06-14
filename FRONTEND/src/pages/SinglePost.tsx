import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PostData {
    image: string;
    title: string;
    content: string; // Use content instead of summary
    author: string;
    authorName: string
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
        axios.get(`https://hb-blogs.onrender.com/getpost/${postId}`, { withCredentials: true, })
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
                <img src={post.image} alt={post.title} className="w-full h-auto" />
                <h1 className="text-3xl font-bold my-4">{post.title}</h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                <div className="text-gray-600 mb-4">
                    <p className="font-semibold">{post.authorName}</p>
                    <p>{formatDate(post.createdAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
