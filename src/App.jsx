import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Admin/login';

import Register from './components/Admin/register';
//import Dash from './components/Admin/dashboard';
//import Landing from './components/Admin/landing';
import MapComponent from './components/Admin/map';

function App() {
  return (<Router>
  <div className="App">
  <nav className="navbar navbar-expand-lg navbar-light fixed-top">
  <div className="container">
  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
        
              </li>
        <li className="nav-item">
        <Link className="nav-link" to={"/register"}>Signup</Link>
        </li>
        
            
              <li className="nav-item">
                <Link className="nav-link" to={"/map"}>Map</Link>
        
              </li>
              </ul>
          </div>
        </div>
      </nav>

    <Routes>
              <Route exact path='/' element={<Login/>} />
            <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/map" element={<MapComponent/>} />

      </Routes>
   
    </div> </Router>

  );
   
}
export default App;












