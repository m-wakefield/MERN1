import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
        .catch(err => console.log(err));
    }
  }, [selected]);

  const handleSubmit = async () => {
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
    <div>
      <h2>Welcome, {username}</h2>
      <button onClick={() => navigate('/')}>Logout</button>

      <h3>Select Category:</h3>
      {categories.map(cat => (
        <button key={cat} onClick={() => setSelected(cat)}>{cat}</button>
      ))}

      {selected && (
        <div>
          <h4>Questions in {selected}:</h4>
          {questions.map((q, idx) => (
            <div key={idx}>
              <p><strong>Q:</strong> {q.question}</p>
              <p><strong>A:</strong> {q.answer}</p>
              <hr />
            </div>
          ))}

          <h4>Add a Question:</h4>
          <input placeholder="Question" value={form.question} onChange={e => setForm({...form, question: e.target.value})} />
          <input placeholder="Answer" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} />
          <button onClick={handleSubmit}>Post</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
