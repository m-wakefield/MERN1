import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

// Render backend URL
const BASE_URL = 'https://mern1-i8rw.onrender.com';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== repeat) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/register`, { username, password });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Your Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group text-start">
            <label>Your email</label>
            <input
              className="form-control"
              placeholder="e.g. elon@tesla.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group text-start">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group text-start">
            <label>Repeat Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Repeat your password"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            />
          </div>

          {success && <div className="alert alert-success mt-2">{success}</div>}
          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <button type="submit" className="btn btn-success w-100 mt-3">Sign up</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
