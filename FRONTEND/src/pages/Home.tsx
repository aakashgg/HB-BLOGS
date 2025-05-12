import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CardData {
    _id: string;
    image: string;
    title: string;
    summary: string;
    author: string;
    authorName: string;
    createdAt: string;
}

interface HomeProps {
    searchTerm: string;
}

const MyCard: React.FC<CardData> = ({ _id, image, title, summary, authorName, createdAt }) => {
    const formatDate = (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toISOString().split('T')[0];
    };

    return (
        <Link to={`/post/${_id}`} className="block">
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
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Home: React.FC<HomeProps> = ({ searchTerm }) => {
    const [posts, setPosts] = useState<CardData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page: number, author = '') => {
        try {
<<<<<<< HEAD
            const response = await axios.get(`https:/hb-blogs.onrender.com/getpost?page=${page}&author=${author}`, {
=======
            const response = await axios.get(`https://hb-blogs.onrender.com/getpost?page=${page}&author=${author}`, {
>>>>>>> 28eff538858b0f5064789fd5e4606066cba70e0e
                withCredentials: true,
            });

            setPosts(response.data.posts);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        setCurrentPage(1); // Reset to first page on new search
    }, [searchTerm]);

    useEffect(() => {
        fetchPosts(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="justify-center overflow-x-hidden px-4 mx-10">
            {posts.map((item) => (
                <MyCard key={item._id} {...item} />
            ))}

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

export default Home;
