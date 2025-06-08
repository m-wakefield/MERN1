import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // reuse shared layout styling

function App() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Caregiving Forum & Resource Hub</h2>
         <p>Connect, ask questions, and share knowledge with other caregivers and professionals.</p>
        <div className="d-grid gap-2">
          <Link to="/login">
            <button className="btn btn-primary mb-2">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-outline-primary">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
