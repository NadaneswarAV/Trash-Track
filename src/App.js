import './App.css';                           //real
import React, { useEffect, useState } from 'react';
import  Home   from './pages/Home';
import User from './pages/user';
import Admin from './pages/admin';
import Loged from './pages/loged';
import UserForm from './pages/userform';
import Submission from './pages/submission';
import SubmittedPage from './pages/submittedpage';
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
//import '../node_modules/bootstrap/dist/js/bootstrap'
import './bootstrap-dark.min.css'
import './bootstrap.bundle'
import './bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
function App() {

  return (
    <Router>
     <div className="rootStyles">
       <Routes>
         <Route exact path="/" element={<Home />}/>
         <Route path="/user" element={<User/>} />
        <Route path="/admin" element={<Admin/>} /> 
        <Route exact path="/user/" element={<User />}/>
        <Route path="/form/" element={<UserForm/>}/>
        <Route path="/loged/" element={<Loged/>}/>
        <Route path="/submission/" element={<Submission/>}/>
        <Route path="/submitted/" element={<SubmittedPage/>}/>
       </Routes>
     </div>
    </Router>
  );
}

export default App;


