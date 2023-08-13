import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupUser = () => {
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [viewForm, setViewForm] = useState(true);

  const navigate = useNavigate();

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
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
  const handleRegisterSubmit = async (e) => {
    setViewForm(false)
    e.preventDefault();
    if (name === '' || email === '' || password === '' || phone === '') {
      setError(true);
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, phone }),
        });

        if (response.ok) {
          setSubmitted(true);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
  
    return (
      <div className="success" style={{ display: submitted ? '' : 'none' }}>
        <label className="label">Registration Completed</label>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? '' : 'none' }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      {/* Calling the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      {viewForm && ( // Render the form only if formVisible is true
        <form>
          {/* Labels and inputs for form data */}
          <div className="form-field">
            <label className="label">Name</label>
            <input onChange={handleName} className="input" value={name} type="text" />
          </div>

          <div className="form-field">
            <label className="label">Email</label>
            <input onChange={handleEmail} className="input" value={email} type="email" />
          </div>

          <div className="form-field">
            <label className="label">Phone no</label>
            <input onChange={handlePhone} className="input" value={phone} type="tel" />
          </div>

          <div className="form-field">
            <label className="label">Password</label>
            <input onChange={handlePassword} className="input" value={password} type="password" />
          </div>

          <button onClick={handleRegisterSubmit} className="btn" type="submit">
            Register
          </button>
        </form>
      )}
    </div>
  );
};

const LoginUser = () => {
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
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
          setSubmitted(true);
          setError(false);
          //const user = { name }; // Create a user object

          // Pass user object as state to '/form' page
          navigate('/loged', { state: { name } });
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div className="success" style={{ display: submitted ? '' : 'none' }}>
        <h1>User {name} logged in successfully!</h1> 
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? '' : 'none' }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>User Login</h1>
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <div className="form-field">
          <label className="label">Name</label>
          <input onChange={handleName} className="input" value={name} type="text" />
        </div>

        <div className="form-field">
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input" value={password} type="password" />
        </div>

        <button onClick={handleLoginSubmit} className="btn" type="submit">
          Login
        </button>
      </form>
       {/* Calling the methods */}
       <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
};

const User = () => {
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
      <div className="button-container">
        <button className={`button ${showSignup ? 'active' : ''}`} onClick={handleSignupClick}>
          Sign Up
        </button>
        <button className={`button ${showLogin ? 'active' : ''}`} onClick={handleLoginClick}>
          Login
        </button>
      </div>
      <div className="form-container">
        {showSignup && <SignupUser />}
        {showLogin && <LoginUser />}
      </div>
    </div>
  );
};

export default User;
