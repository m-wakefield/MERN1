import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // reuse styling

const categories = ['React', 'JavaScript', 'CSS', 'HTML'];

function Dashboard() {
  const { username } = useParams();
  const [selected, setSelected] = useState('');
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      axios.get(`http://localhost:5000/questions/${selected}`)
        .then(res => setQuestions(res.data))
        .catch(err => console.error(err));
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/questions', {
      category: selected,
      question: form.question,
      answer: form.answer
    });
    setForm({ question: '', answer: '' });
    const res = await axios.get(`http://localhost:5000/questions/${selected}`);
    setQuestions(res.data);
  };

  return (
    <div className="login-container">
      <div className="login-card text-start">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Welcome, {username}</h4>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>Logout</button>
        </div>

        <h5>Select a Category</h5>
        <div className="mb-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`btn me-2 mb-2 ${selected === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {selected && (
          <>
            <h6 className="mt-3">Questions in {selected}</h6>
            {questions.length === 0 && <p>No questions yet.</p>}
            {questions.map((q, idx) => (
              <div key={idx} className="border p-2 mb-2 rounded">
                <strong>Q:</strong> {q.question}<br />
                <strong>A:</strong> {q.answer}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group">
                <input
                  className="form-control mb-2"
                  placeholder="Your question..."
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control mb-2"
                  placeholder="Your answer..."
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                />
              </div>
              <button className="btn btn-success w-100">Post Question</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
