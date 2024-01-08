import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useDispatch } from 'react-redux';
import AuthenticationService from '../services/AuthenticationService';
        

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
      username: '',
      password: '',
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    };

    const performSignUp = async () => {
      try {
        await onSubmit(userData);
        navigate("/home");
      } catch (error) {
          console.log('Error submitting form: ' + error.message);
      }
    };  
  

    const onSubmit = async (data) => {
      AuthenticationService.createUser(data).then(res => {
        console.log('new user here');
        const username = data.username;
        console.log(username);
        // console.log(res.data)
        // const token = res.data;

        // console.log(token);
        //dispatch(addToken(token));
        localStorage.setItem('username', username);
      })
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      performSignUp();
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
      <Button type="submit">Create account</Button>
      </form>
    </div>

    
  );
};

export default SignUpPage;
