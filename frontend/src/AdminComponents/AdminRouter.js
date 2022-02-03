import React from 'react';
import {Routes, Route, Router } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import Privaterouteadmin from './Privaterouteadmin';
export default function AdminRouter() {
  return (<div>
        <Routes>
            <Route path="/" exact element={<AdminLogin/>}/>
            
              <Route path="/dashboard/" exact element={<Privaterouteadmin/>}/>
            
        </Routes>
  </div>);
}
