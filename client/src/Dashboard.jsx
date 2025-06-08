import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const categories = [
  'Daily Tasks',
  'Medication',
  'Mobility & Safety',
  'Emotional Support',
  'Memory Care',
  'Nutrition',
  'Behavior Management'
];

function Dashboard() {
  const { username } = useParams();
  const [selected, setSelected] = useState('');
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/questions/${selected}`)
        .then(res => setQuestions(res.data))
        .catch(err => console.error(err));
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) return;

    await axios.post('http://localhost:5000/questions', {
      category: selected,
      question: form.question,
      answer: form.answer
    });

    setForm({ question: '', answer: '' });

    const res = await axios.get(`http://localhost:5000/questions/${selected}`);
    setQuestions(res.data);
  };

  const filteredQuestions = selected
    ? questions.filter(q =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="login-container">
      <div className="login-card text-start">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Welcome, {username}</h4>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>
            Logout
          </button>
        </div>

        <h5>Select a Caregiving Topic</h5>
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
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Search caregiving questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <h6 className="mt-3">Questions in {selected}</h6>

            {filteredQuestions.length === 0 ? (
              <p>No matching questions. Try asking a new one below.</p>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div key={idx} className="border p-2 mb-2 rounded">
                  <strong>Q:</strong> {q.question}<br />
                  <strong>A:</strong> {q.answer}
                </div>
              ))
            )}

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  placeholder="Ask a caregiving question..."
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  placeholder="Provide a helpful answer..."
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
