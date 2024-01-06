import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { createStore, applyMiddleware } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import thunk from "redux-thunk"
import { Provider } from 'react-redux';
import entryReducer from './slices/EntrySlice';



const root = ReactDOM.createRoot(document.getElementById('root'));

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// root.use(cors(corsOptions));

const defaultState = {
  x: null,
  y: null, 
  r: null,
}

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_X":
      return {...state, x: action.payload}
    case "SET_Y":
      return {...state, y: action.payload}
    case "SET_R":
      return {...state, r: action.payload}
    default:
      return state
  }
}


const rootReducer = {
  main: mainReducer,
  entry: entryReducer,
};

// const store = configureStore({
//   reducer: rootReducer,
// })


const store = configureStore({
  reducer: {
    entry: entryReducer,
  }
});

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
