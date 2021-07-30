import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

if (process.env.NODE_ENV === 'production') {
    //axios.defaults.baseURL = 'https://ffdraft-server-env.eba-tm9s2rtw.us-west-2.elasticbeanstalk.com';
    axios.defaults.baseURL = 'https://7inthebox.com';
    //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
