import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // reuse same styling

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeat) {
      return setError('Passwords do not match');
    }
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      navigate('/login');
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
              type="text"
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
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <button type="submit" className="btn btn-success mt-3">Sign up</button>
        </form>
        <div className="login-links mt-3">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
