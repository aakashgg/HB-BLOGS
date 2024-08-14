import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormData {
    name: string;
    email: string;
    password: string;
    gender: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        gender: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/signup', formData);

            if (response.status === 201) {
                // Signup successful
                console.log('Signup successful');
                window.alert('Signup successful!  Please Login');
            } else if (response.status === 202) {

                console.log('Account Already Exist',);
                window.alert('Account Already Exist!  Please Login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <aside className="w-1/3 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Sign Up for an Account</h2>
                    <p className="text-gray-600">Join us to explore great blogs and more!</p>
                </div>
            </aside>
            <aside className="w-1/3 px-4">
                <div className="bg-white px-8 pt-8 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type='text'
                                name='name'
                                placeholder='Enter Name'
                                className="w-full border rounded px-3 py-2"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
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
                        <div>
                            <select
                                name="gender"
                                className="w-full border rounded px-3 py-2"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <Button
                                type='submit'
                                className="bg-black hover:bg-slate-700-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </aside>
        </div>
    );
}

export default Signup;
