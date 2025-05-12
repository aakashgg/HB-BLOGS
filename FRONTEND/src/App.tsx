import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Footer from "./Footer.tsx";
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import SinglePost from './pages/SinglePost.tsx';
import MyPosts from './pages/Myposts.tsx';
import { UserContext } from './UserContext';
import Post from './pages/Post.tsx';

const App = () => {
  const { userInfo } = useContext(UserContext);

  // 🔧 Shared search term state
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>


      <Router>
        {/* ✅ Navbar receives setSearchTerm */}
        <Navbar setSearchTerm={setSearchTerm} />

        <Routes>
          {/* ✅ Pass searchTerm to Home and MyPosts */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          {userInfo.id ? (
            <Route path="/myposts" element={<MyPosts />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postId" element={<SinglePost />} />
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
