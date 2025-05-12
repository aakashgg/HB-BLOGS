import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CardData {
    _id: string;
    image: string;
    title: string;
    summary: string;
    author: string;
    authorName: string;
    createdAt: string;
}

interface MyCardProps extends CardData {
    onDelete: (id: string) => void;
}

const MyCard: React.FC<MyCardProps> = ({ _id, image, title, summary, authorName, createdAt, onDelete }) => {
    const formatDate = (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
            <div className="flex">
                <div className="w-1/3">
                    <div className="image-container" style={{ maxHeight: '200px', overflow: 'hidden' }}>
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-2/3 p-4">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-700 font-medium mt-6">{summary}</p>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-600 font-semibold mt-6">{authorName}</p>
                        <p className="text-gray-600 font-semibold mt-6">{formatDate(createdAt)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => onDelete(_id)}
                            className="text-red-600 font-semibold hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MyPosts: React.FC = () => {
    const [posts, setPosts] = useState<CardData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:4000/myposts?page=${page}`, {
                withCredentials: true,
            });

            if (Array.isArray(response.data.posts)) {
                setPosts(response.data.posts);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            } else {
                setError('Failed to fetch posts.');
            }
        } catch (error) {
            setError('Error fetching posts.');
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:4000/delete/${id}`, {
                withCredentials: true,
            });
            setPosts(prev => prev.filter(post => post._id !== id));
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Error deleting post");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="justify-center overflow-x-hidden px-4 mx-10">
            {posts.length > 0 ? (
                posts.map((item) => (
                    <MyCard
                        key={item._id}
                        {...item}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <p>No posts found.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded ${currentPage === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-500 hover:bg-blue-50'
                        }`}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 border rounded ${pageNum === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-blue-500 hover:bg-blue-50'
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded ${currentPage === totalPages
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-500 hover:bg-blue-50'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyPosts;
