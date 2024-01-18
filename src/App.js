import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import ChartComponent from './components/GraphComponent';

import CreateEntryForm from './components/CreateEntryForm';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ChoosePage from './components/ChoosePage';
import { useState,useEffect } from 'react';
import EntryService from './services/EntryService';
import DataTable from './components/DataTable';
import PrivateRoute from './PrivateRoute.jsx';


function App() {
  return (
    <Router>
      <div>
      <HeaderComponent />
        <Routes>
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route path="/" element={<ChoosePage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/logIn" element={<LoginPage />} />
            <Route element={<PrivateRoute/>}>
                <Route path="/home" element={<HomePage />} />
            </Route>

          </Routes>
        </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <div>
        <CreateEntryForm />
      </div>
      <div className='table'>
          <DataTable />
      </div>
    </div>
  );
}


export default App;
