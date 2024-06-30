import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
