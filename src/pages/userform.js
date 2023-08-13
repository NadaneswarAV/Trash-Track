

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  //const [userName, setUserName] = useState('');


  
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
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

  // Access the logged-in user's information
  // const handleUserChange = (e) => {
  //   setUser(name);
  // };
  


  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleLocationClick}>
          Get Location
        </button>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ width: '200px' }} />
        )}
        <br />
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select a waste classification</option>
            {wasteClassifications.map((classification) => (
              <option key={classification} value={classification}>
                {classification}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <label>User Name</label>
          <input
            type="text"
            value={name} 
            readOnly// Populate the input field with the user's name
            //readOnly // Make the input field read-only
          />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
