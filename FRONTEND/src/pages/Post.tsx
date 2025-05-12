import { FormEvent, useState, ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '@/UserContext';

const Post = () => {
    const { userInfo } = useContext(UserContext);
    interface FormData {
        title: string;
        content: string;
        summary: string;
        author: string;
        image: File | null; // Make the image property optional
    }

    const [reDirect, setReDirect] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        summary: '',
        author: userInfo.name, // Set author to 'aakash'
        image: null, // Initialize image to null
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content: string) => {
        setFormData({ ...formData, content });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('summary', formData.summary);
            formDataToSend.append('author', formData.author);
            if (formData.image !== null) {
                formDataToSend.append('image', formData.image);
            }

            const response = await axios.post('https://hb-blogs.onrender.com/post', formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            if (response.status === 201) {
                window.alert("Post Created Success")
                setReDirect(true);
                console.log('Post created successfully');
            } else {
                window.alert("Failed to create post")
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (reDirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <aside className="w-1/3 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Create New Post</h2>
                    <p className="text-gray-600">Share your thoughts with the world!</p>
                </div>
            </aside>
            <aside className="w-1/3 px-4">
                <div className="bg-white px-8 pt-8 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4 text-center">New Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Enter Title"
                                className="w-full border rounded px-3 py-2"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="summary"
                                placeholder="Enter Summary"
                                className="w-full border rounded px-3 py-2"
                                value={formData.summary}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <ReactQuill
                                value={formData.content}
                                onChange={handleContentChange}
                                placeholder="Enter Content"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                type="submit"
                                className="bg-black hover:bg-slate-700-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Post
                            </Button>
                        </div>
                    </form>
                </div>
            </aside>
        </div>
    );
};

export default Post;
