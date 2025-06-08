import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">MERN1 Forum</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {username && (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username}</span>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Logout</Link>
                </li>
              </>
            )}
            {!username && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
