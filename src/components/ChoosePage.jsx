import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
        

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const ChoosePage = () => {
    const navigate = useNavigate();

    const openLogInPage = async () => {
        navigate('/logIn');
    };   
    
    const openSignUpPage = () => {
        navigate('/signUp');
    };

    return (
        <div className='choose-page'>
            <Button type="button" onClick={openLogInPage}>Login</Button>
            <Button type="button" onClick={openSignUpPage}>Sign up</Button>
        </div>
        );
};

export default ChoosePage;
