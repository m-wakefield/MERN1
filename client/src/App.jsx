// App.jsx (Landing Page)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import './Login.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={darkMode ? 'bg-dark text-white min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome to the Caregiving Support Forum</h2>
          <p>Connect, ask questions, and share knowledge with other caregivers and professionals.</p>
          <div className="d-grid gap-2">
            <Link to="/login">
              <button className="btn btn-success mb-2">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-outline-success">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;