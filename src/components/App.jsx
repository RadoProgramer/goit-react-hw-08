//import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Contacts from '../components/Contacts/Contacts';
import Home from '../components/Home/Home';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Header from '../components/Header/Header'; // Importowanie Headera

function App() {
  return (
    <Router>
      <Header /> {/* Dodaj nagłówek tutaj */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
