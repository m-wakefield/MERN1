import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      navigate(`/dashboard/${res.data.username}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Good to see you again</h2>
        <form onSubmit={handleLogin}>
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
            <label>Your password</label>
            <input
              type="password"
              className="form-control"
              placeholder="e.g. ilovemangools123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <button type="submit" className="btn btn-success mt-3">Sign in</button>
        </form>
        <div className="login-links mt-3">
          <Link to="/register">Don't have an account?</Link>
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
