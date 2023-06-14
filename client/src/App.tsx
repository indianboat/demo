import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Header from './components/Header';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Homepage />}>
        </Route>
        <Route path="/about" element={<About />}>
        </Route>
        <Route path="/signup" element={<Signup />}>
        </Route>
        <Route path="/signin" element={<Signin />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
