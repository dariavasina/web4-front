import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListEntryComponent from './components/ListEntryComponent';
import HeaderComponent from './components/HeaderComponent';
import ChartComponent from './components/GraphComponent';
// import CreateEntryComponent from './components/CreateEntryComponent';
import CreateEntryForm from './components/CreateEntryForm';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ChoosePage from './components/ChoosePage';
import { useState,useEffect } from 'react';
import EntryService from './services/EntryService';
import DataTable from './components/DataTable';


function App() {
  return (
    <Router>
      <div>
      <HeaderComponent />
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<ChoosePage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/logIn" element={<LoginPage />} />

          </Routes>
        </div>
    </Router>
  );
}

function HomePage() {
//   //new 
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     // Fetch entries data and update state
//     EntryService.getEntries()
//       .then((res) => {
//         setEntries(res.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching entries:', error);
//       });
//   }, []); // Empty dependency array ensures this effect runs only once on mount
//   // end new

  return (
    <div>
      <div className="container">
        <ChartComponent />
        <CreateEntryForm />
      </div>
      <div className='table'>
          <DataTable />
          {/* <ListEntryComponent /> */}
        
          {/* <ListEntryComponent entries={entries} /> */}
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
