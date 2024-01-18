import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import AuthenticationService from '../services/AuthenticationService';
import {logInUser} from '../services/AuthenticationService';
        

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const LoginPage = () => {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  
  const onSubmit = async (data) => {
    try {
      const res = await AuthenticationService.logInUser(data);

      console.log(res.data);

      console.log('just logged in user');
      const username = data.username;
      console.log(username);
      console.log(res)

      localStorage.setItem('username', username);
      navigate('/home');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null)
    onSubmit(userData);
  };

  return (
    <div className='login-container'>
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

          {error && <div style={{ color: 'red' }}>{error}</div>}
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
