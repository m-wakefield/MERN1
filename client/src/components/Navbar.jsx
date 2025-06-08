// Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ username, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} mb-3`}>
      <div className="container-fluid">
        <span className="navbar-brand">Caregiving Forum</span>
        <div className="d-flex align-items-center ms-auto">
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/')}>Home</button>
          <button className="btn btn-outline-info" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;