import { UserContext } from '@/UserContext';
import React, { useContext } from 'react';

const Profile = () => {
    const { userInfo } = useContext(UserContext);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to HB Blogs</h1>
            <h4 className="text-xl">{userInfo.name}</h4>
        </div>
    );
};

export default Profile;
