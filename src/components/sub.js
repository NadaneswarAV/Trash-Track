
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sub.css'
const Submission = ({ submission }) => {
  const { _id, location, category, description, image, done } = submission;
  const imagePath = '../uploads/' + image;
  const navigate = useNavigate();

  const handleLocationClick = () => {
    const encodedLocation = encodeURIComponent(location);
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
    window.open(mapUrl, '_blank');
  };

  const handleMarkAsDone = async () => {
    try {
      await axios.post('http://localhost:3001/api/markDone', { submissionId: _id });
      navigate('/submission');
    } catch (error) {
      console.error('Error marking submission as done:', error);
    }
  };

  return (
    <div className="submission">
      <h2 onClick={handleLocationClick}>Location: {location}</h2>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
      {image && (
        <div>
          <h3>Image:</h3>
          <img src={imagePath} alt="Submission" />
        </div>
      )}
      {!done && (
        <button className="mark-done" onClick={handleMarkAsDone}>
          Mark as Done
        </button>
      )}
    </div>
  );
};

export default Submission;
