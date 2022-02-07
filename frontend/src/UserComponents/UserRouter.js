import React from 'react';
// eslint-disable-next-line no-unused-vars
import {Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Events from './Events';
import PlayersBio from './PlayersBio';
import TeamsBio from './TeamsBio';
import Rankings from './Rankings';
import Community from './Community';
import About from './About';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
function UserRouter() {
  return (
        <div>
          <Routes>
          
            <Route path="/" exact element={<Homepage/>}/>
            <Route path="/admin" exact element={<AdminLogin/>}/>
            <Route path="/dashboard/" exact element={<AdminDashboard/>}/>

            <Route path="/events" element={<Events/>}/>
            <Route path="/playersbio" element={<PlayersBio/>}/>
            <Route path="/teamsbio" element={<TeamsBio/>}/>
            <Route path="/rankings" element={<Rankings/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>);
}

export default UserRouter;

