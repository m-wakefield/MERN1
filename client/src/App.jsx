import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // reuse shared layout styling

function App() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Caregiving Forum & Resource Hub</h2>
        <p>Support for caregivers, by caregivers — join the conversation.</p>
        <p className="mb-4">Please log in or create an account to get started.</p>
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
