import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sub2.css'
const Submission = ({ submission, name }) => {
  const { _id, location, category, description, image, done, user } = submission;
  const imagePath = '../uploads/' + image;
  const navigate = useNavigate();


  const handleMarkAsDone = async () => {
    try {
      await axios.post('http://localhost:3001/api/markDone', { submissionId: _id });
      navigate('/submission');
    } catch (error) {
      console.error('Error marking submission as done:', error);
    }
  };

  if (user === name) {
    return (
      <div className="submission">
        <h2 >Location: {location}</h2>
        <p>Category: {category}</p>
        <p>Description: {description}</p>
        {image && (
          <div>
            <h3>Image:</h3>
            <img src={imagePath} alt="Submission" />
          </div>
        )}
        {done && <label className="done-label">Done</label>}
        {!done && (
          <button className="mark-done" >Not Done
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Submission;
