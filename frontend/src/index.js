import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'react-quill/dist/quill.snow.css'; 
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL="http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = "Bearer " + window.localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
