import React from 'react';
import { useLocation } from 'react-router-dom';
import './sub.css'
const SubmittedPage = () => {
  const location = useLocation();
  const { data } = location.state;
  console.log(data.image);
  
  return (
    <div className="submitted-page">
      <h2>Submitted Content:</h2>
      <p>Location: {data.location}</p>
      <p>Category: {data.category}</p>
      <p>Description: {data.description}</p>
     
      {data.image && (
        <div>
          <h3>Image:</h3>
          <img src={URL.createObjectURL(data.image)} alt="Submitted" className="submitted-image" />
        </div>
      )}
    </div>
  );
};

export default SubmittedPage;
