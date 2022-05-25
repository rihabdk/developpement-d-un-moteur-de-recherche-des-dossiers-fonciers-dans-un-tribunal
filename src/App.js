import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Admin/login';
import  DenseTable from './components/Admin/table';
import Map from './map/MapAdmin';
import MapA from './map/MapAvocat';
import MapJ from './map/Mapjuge';

import Register from './components/Admin/register';
//import Dash from './components/Admin/dashboard';
//import Landing from './components/Admin/landing';


import DenseTablee from './components/Admin/DataTable';
import FilterTableComponent from './map/Searchh'

function App() {
  return (<Router>
  <div className="App">
  <nav className="navbar navbar-expand-lg navbar-light fixed-top">
  <div className="container">
  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" >
                <Link className="nav-link" to={"/login"}>Se connecter</Link>
        
              </li>
        <li className="nav-item">
        <Link className="nav-link" to={"/register"}>Inscription</Link>
        </li>
        
            
             
              
              
              </ul>
          </div>
        </div>
      </nav>

    <Routes>
    <Route exact path='/' element={<Login/>} />
          <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/QR" element={<DenseTablee/>} />
<Route path='/search' element={<FilterTableComponent/>}/>
      <Route path="/table" element={<DenseTable/>} />
      <Route path="/Map" element={<Map/>}></Route>
      <Route path="/MapA" element={<MapA/>}></Route>
      <Route path="/MapJ" element={<MapJ/>}></Route>
      


      </Routes>
   
    </div> </Router>
  

  );
   
}
export default App;













