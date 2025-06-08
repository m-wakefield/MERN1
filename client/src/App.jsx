import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to MERN1 Forum</h1>
      <p>Please choose an option:</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}

export default App;

