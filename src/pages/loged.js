import { useNavigate } from 'react-router-dom';
import Submission from '../components/sub2';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './loged.css';

const Submitted = () => {
  const [submissions, setSubmissions] = useState([]);
  const ulocation = useLocation();
  const { name } = ulocation.state || {};

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
    <div className="submitted-container">
      <h1>Submissions</h1>
      {submissions.map((submission) => (
        <Submission key={submission._id} submission={submission} name={name} />
      ))}
    </div>
  );
};

const UserForm = () => {
  const ulocation = useLocation();
  const { name } = ulocation.state || {};
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(name);
  const [done, setDone] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setLocation('0.2315, 76.4088');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`10.2315, 76.4088`);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('location', location);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('user', user);
    formData.append('done', done);

    try {
      const response = await fetch('http://localhost:3001/api/submissions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Submission successful:', data);
        // Reset the form fields
        setLocation('');
        setImage(null);
        setCategory('');
        setDescription('');
        setUser('');
        setDone(false);
        navigate('/submitted', {
          state: { data: { location, category, description, image } },
        });
      } else {
        console.error('Error submitting form:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const wasteClassifications = [
    'Plastic',
    'Paper',
    'Glass',
    'Metal',
    'Organic',
    'E-Waste',
    'Hazardous',
  ];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleLocationClick}>
              Get Location
            </button>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" onChange={handleImageChange} />
          </div>
          <div className="form-group">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select id="category" value={category} onChange={handleCategoryChange}>
              <option value="">Select a waste classification</option>
              {wasteClassifications.map((classification) => (
                <option key={classification} value={classification}>
                  {classification}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="description-textarea"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">User Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              readOnly
              className="user-input"
            />
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const Loged = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);

  const handleFormClick = () => {
    setShowForm(true);
    setShowSubmitted(false);
  };

  const handleSubmittedClick = () => {
    setShowForm(false);
    setShowSubmitted(true);
  };

  return (
    <div className="container">
      <>
        <div className="button-container">
          <button onClick={handleFormClick} className={showForm ? 'active' : ''}>
            Form
          </button>
          <button
            onClick={handleSubmittedClick}
            className={showSubmitted ? 'active' : ''}
          >
            Submitted
          </button>
        </div>
        <div className="content-container">
          {showForm && <UserForm />}
          {showSubmitted && <Submitted />}
        </div>
      </>
    </div>
  );
};

export default Loged;
