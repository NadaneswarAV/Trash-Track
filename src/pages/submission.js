
import React, { useState, useEffect } from 'react';
import Submission from '../components/sub';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  return (
    <div>
      <h1>Submissions</h1>
      {submissions.map((submission) => (
        <Submission key={submission._id} submission={submission} />
      ))}
    </div>
  );
}

export default Submissions;
