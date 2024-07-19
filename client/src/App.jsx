import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import Models from './pages/Models';
import CreateAModel from './pages/CreateAModel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/notes' element={<NotesPage/>}/>
          <Route path='/models' element={<Models/>}/>
          <Route path='/create-model' element={<CreateAModel/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
