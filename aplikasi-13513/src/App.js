import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux'; 
import store from './store'; 
import FormMobil from './FormMobil';
import Home from './Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <Link className="navbar-brand animated-logo" to="/">Jual Mobil Bekas</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/form">Add/Edit Mobil</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-5">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/form" element={
              <div className="card shadow p-4 mb-4 bg-white rounded">
                <h2 className="card-title text-center mb-4">Data Mobil</h2>
                <FormMobil />
              </div>
            } />
          </Routes>
        </div>

        <footer className="bg-light text-center text-lg-start mt-5">
          <div className="text-center p-3 bg-dark text-light">
            Created by Moch Adhysa Nugroho - A11.2021.13513
          </div>
        </footer>
      </Router>
    </Provider>
  );
}

export default App;
