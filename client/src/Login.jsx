const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5000/login', { username, password });
    navigate(`/dashboard/${res.data.username}`);
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};
