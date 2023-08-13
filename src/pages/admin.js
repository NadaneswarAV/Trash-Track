
import './admin.css'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupAdmin = () => {
  // States for registration
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [viewForm, setViewForm] = useState(true);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the locality change
  const handleLocality = (e) => {
    setLocality(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the phone change
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    setViewForm(false)
    e.preventDefault();
    if (name === '' || locality === '' || password === '' || phone === '') {
      setError(true);
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/registerA', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            locality,
            password,
            phone,
          }),
        });

        if (response.ok) {
          setSubmitted(true);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <label className="label">Registration Completed</label>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>Admin Registration</h1>
      </div>

      {/* Calling the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      {viewForm && (
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Locality</label>
        <input
          onChange={handleLocality}
          className="input"
          value={locality}
          type="text"
        />

        <label className="label">Phone no</label>
        <input
          onChange={handlePhone}
          className="input"
          value={phone}
          type="tel"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
      )}
    </div>
  );
};

const LoginAdmin = () => {
  // States for login
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/loginA', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
          }),
        });

        if (response.ok) {
          setSubmitted(true);
          setError(false);
          navigate('/submission'); // Redirect to the submission page after successful login
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>Admin {name} logged in</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>Admin Login</h1>
      </div>

      {/* Calling the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const Admin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="container">
      <div className="toggle-btn-container"> {/* Add a container for buttons */}
        <button className="toggle-btn" onClick={handleSignupClick}>Sign Up</button>
        <button className="toggle-btn" onClick={handleLoginClick}>Login</button>
      </div>
      <div className="form-container">
        {showSignup && <SignupAdmin />}
        {showLogin && <LoginAdmin />}
      </div>
    </div>
  );
};


export default Admin;
