import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyForm from './components/form/MyForm';
import User from './components/users/User';
import './app.css'

function App() {
  const [showUsers, setShowUsers] = useState(true);

  return (
    <Router>
    <div className="app">
      <nav>
        <button className="nav-button" onClick={() => setShowUsers(true)}>Show Users</button>
        <button className="nav-button" onClick={() => setShowUsers(false)}>Add User</button>
      </nav>
      <Routes>
        <Route path="/" element={showUsers ? <User /> : <MyForm />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
