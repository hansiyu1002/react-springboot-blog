import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewBlog from './pages/NewBlog';
import MyBlogs from './pages/MyBlogs';
import MyBlog from './pages/MyBlog';
import Navigation from './components/Navigation';
import Footer from './components/Footer'
import EditBlog from "./pages/EditBlog";
import PublicBlog from "./pages/PublicBlog";


function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/public_blog/:id" element={<PublicBlog />} />
                <Route path="/new_blog" element={<NewBlog />} />
                <Route path="/my_blogs" element={<MyBlogs />} />
                <Route path="/my_blog/:id" element={<MyBlog />} />
                <Route path="/edit_blog/:id" element={<EditBlog />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App