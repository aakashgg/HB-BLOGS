import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Footer from "./Footer.tsx";
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Profile from './pages/Profile.tsx';
import SinglePost from './pages/SinglePost.tsx'; // Import SinglePostPage component
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import Post from './pages/Post.tsx';

const App = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {userInfo.id ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postId" element={<SinglePost />} /> {/* Route for single post page */}
          {userInfo.id ? (
            <Route path="/post" element={<Post />} />
          ) : (
            <Route path="/post" element={<Navigate to="/login" />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
