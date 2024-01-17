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
      <div className="container">
        {/* <ChartComponent /> */}
        <CreateEntryForm />
      </div>
      <div className='table'>
          <DataTable />
      </div>
    </div>
  );
}





  // const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //   // Fetch entries data and update state
  //   EntryService.getEntries()
  //     .then((res) => {
  //       setEntries(res.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching entries:', error);
  //     });
  // }, []);

// function App() {
//   return (
//     <div>
//       <HeaderComponent />
//         <div className="container">
//             <GraphComponent />
//             <CreateEntryForm />
//         </div>
//         <div className='table'>
//           <ListEntryComponent />
//         </div>
        
//     </div>
//   );
// }


export default App;
