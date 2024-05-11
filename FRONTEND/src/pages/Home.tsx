import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CardData {
    _id: string; // Add _id to identify the post
    image: string;
    title: string;
    summary: string;
    author: string;
    createdAt: string;
}

const MyCard: React.FC<CardData> = ({ _id, image, title, summary, author, createdAt }) => {
    const formatDate = (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toISOString().split('T')[0]; // Extracting only the date part
    };

    return (
        <Link to={`/post/${_id}`} className="block"> {/* Link to the single post page */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4"> {/* Container with margin bottom */}
                <div className="flex"> {/* Flex container */}
                    <div className="w-1/3 "> {/* Image container */}
                        <div className="image-container" style={{ maxHeight: '200px', overflow: 'hidden' }}>
                            <img src={`http://localhost:4100/${image}`} alt={title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="w-2/3 p-4"> {/* Content container */}
                        <div>
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="text-gray-700 font-medium mt-6">{summary}</p> {/* Display first 30 words */}
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-gray-600 font-semibold mt-6">{author}</p>
                                <p className="text-gray-600 font-semibold mt-6">{formatDate(createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Home = () => {
    const [posts, setPosts] = useState<CardData[]>([]);

    useEffect(() => {
        // Fetch posts from backend
        axios.get('http://localhost:4100/getpost')
            .then(response => {
                // Update state with fetched posts
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className="justify-center overflow-x-hidden px-4 mx-10"> {/* Padding on both sides */}
            {posts.map((item, index) =>
                <MyCard
                    key={index}
                    _id={item._id} // Pass _id to MyCard component
                    image={item.image}
                    title={item.title}
                    summary={item.summary}
                    author={item.author}
                    createdAt={item.createdAt}
                />
            )}
        </div>
    );
};

export default Home;
