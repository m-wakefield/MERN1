import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';

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
    <div className="container">
      <Navbar username={username} />
      <h2 className="mb-4">Select a Category</h2>
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
          <h4 className="mt-4">Questions in {selected}</h4>
          {questions.length === 0 && <p>No questions yet.</p>}
          {questions.map((q, idx) => (
            <div key={idx} className="border p-3 mb-3">
              <p><strong>Q:</strong> {q.question}</p>
              <p><strong>A:</strong> {q.answer}</p>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="mt-4">
            <h5>Add a Question</h5>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Question"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Answer"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
              />
            </div>
            <button className="btn btn-success">Post</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Dashboard;
