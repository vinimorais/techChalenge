"use client"; 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from '../../components/Home'; 
import MainPage from '../../components/MainPage'; 
import Layout from '../../components/Layout'; 

const Main: React.FC = () => {
  return (
  <MainPage></MainPage>
  );
};

export default Main;
