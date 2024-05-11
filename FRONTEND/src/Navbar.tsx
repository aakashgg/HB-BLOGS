import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { IoMenu } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserContext } from './UserContext';


interface UserInfo {
    id: string;
    name: string;
}

const Drawer: React.FC<{ handleLogout: () => void; }> = ({ handleLogout }) => {
    const { userInfo } = useContext(UserContext);

    return (
        <div className='ml-auto'>
            <DropdownMenu>
                <DropdownMenuTrigger><IoMenu style={{ fontSize: "2rem" }} /></DropdownMenuTrigger>
                {userInfo?.id ? (
                    <DropdownMenuContent>
                        <Link to={"/post"}><DropdownMenuLabel>Post</DropdownMenuLabel></Link>
                        <Link to={"/profile"}><DropdownMenuLabel>{userInfo.name}</DropdownMenuLabel></Link>
                        <a href="#" onClick={handleLogout}><DropdownMenuItem>Logout</DropdownMenuItem></a>
                        <a href="https://www.linkedin.com/in/aakashgupta46/" target='_blank' rel='noopener noreferrer'><DropdownMenuItem> Contact Me</DropdownMenuItem></a>
                    </DropdownMenuContent>
                ) : (
                    <DropdownMenuContent>
                        <Link to={"/signup"}><DropdownMenuItem>Signup</DropdownMenuItem></Link>
                        <Link to={"/login"}><DropdownMenuItem>Login</DropdownMenuItem></Link>
                        <a href="https://www.linkedin.com/in/aakashgupta46/" target='_blank' rel='noopener noreferrer'><DropdownMenuItem> Contact Me</DropdownMenuItem></a>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </div>
    );
}

const Navbar: React.FC = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response: AxiosResponse<UserInfo> = await axios.get('https://hb-blogs-backend.vercel.app/profile', {
                    withCredentials: true
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        fetchProfile();
    }, [userInfo]);

    const [searchTerm, changeTerm] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeTerm(event.target.value);
    }

    const handleLogout = async () => {
        try {
            await axios.post('https://hb-blogs-backend.vercel.app/logout', {}, {
                withCredentials: true
            });
            setUserInfo({ id: "", name: "" });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex px-4 py-2 bg-gray-800 text-white">
            <input
                className="text-gray-900 w-1/3 h-10 px-3 py-2 mr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
            <h1 className="text-lg font-bold ml-44"><Link to="/">HB BLOGS</Link></h1>
            <Drawer handleLogout={handleLogout} />
        </div>
    );
}

export default Navbar;
