import { FormEvent, useState, ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigate } from 'react-router-dom';
import { UserContext } from '@/UserContext';

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const [reDirect, setReDirect] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const { setUserInfo } = useContext(UserContext);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://hb-blogs-backend.vercel.app/login', formData, {
                withCredentials: true
            });

            if (response.status === 200) {
                setUserInfo(response.data);
                setReDirect(true);
                window.alert("Logged In Success");
                console.log('Login successful');

            } else {
                // Login failed
                window.alert('Invalid Credentials');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Conditional rendering of Navigate component
    if (reDirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <aside className="w-1/3 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Login to Experience</h2>
                    <p className="text-gray-600">Discover a world of great blogs and more!</p>
                </div>
            </aside>
            <aside className="w-1/3 px-4">
                <div className="bg-white px-8 pt-8 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type='email'
                                name='email'
                                placeholder='Enter Email'
                                className="w-full border rounded px-3 py-2"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                type='password'
                                name='password'
                                placeholder='Enter Password'
                                className="w-full border rounded px-3 py-2"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                type='submit'
                                className="bg-black hover:bg-slate-700-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </aside>
        </div>
    );
}

export default Login;
