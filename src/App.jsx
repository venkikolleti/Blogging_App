import Navibar from './components/Navibar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Signup from './components/Signup';
import BlogState from './contexts/blogs/BlogState';
import Blogpost from './components/Blogpost';
import React, { useState } from 'react';


function App() {

  return (
    <>
    <BlogState>
    <Router>

    <Navibar/>  
            
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/blogpost/:id" element={<Blogpost />} /> 
          </Routes>
            
        </Router>
    </BlogState>
    </>
  )
}

export default App
