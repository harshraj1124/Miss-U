import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/api/message`)
      .then(res => res.json())
      .then(data => setMessage(data.text));
  }, []);

  return (
    <div className="container">
      <h1>Hi ISHANI 👋</h1>
      <p className="message">{message}</p>
      <p className="footer">– from someone who misses you</p>
    </div>
  );
}

export default App;
