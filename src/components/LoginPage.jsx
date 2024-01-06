import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
        

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const LoginPage = () => {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const performLogin = async () => {
    // Implement your authentication logic here.
    // Example: Check credentials and perform login
    // Replace this with your actual authentication mechanism
    if (userData.username === 'example' && userData.password === 'password') {
      // If login successful, redirect to home page
      navigate('/home');
    } else {
      // Handle login failure
      alert('Invalid username or password');
    }
  };   
  
  const handleSubmit = (e) => {
    e.preventDefault();
    performLogin();
  };

  return (
    <div className='login-container'>
      {/* <h2>Login</h2> */}
      <form onSubmit={handleSubmit}>
        <div> 
          <div className='input-group'>
            <label htmlFor="username">Username:</label>
            <InputText
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              required
            />
          </div>
        <div className='input-group'>
          <label htmlFor="password">Password:</label>
          <InputText
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <Button type="submit">Login</Button>
      </form>
    </div>

    
  );
};

export default LoginPage;
