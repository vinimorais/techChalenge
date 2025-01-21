"use client"; 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from '../components/Home';  
import Main from '../components/MainPage'; 
import Layout from '../components/Layout'; 

const Pages: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
};

export default Pages;


