
// Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">Caregiving Forum</span>
        <div className="d-flex align-items-center ms-auto">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>Home</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;