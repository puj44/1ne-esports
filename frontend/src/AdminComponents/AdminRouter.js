import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard'
import AdminLogin from './AdminLogin';
import PrivateRoute from './PrivateRoute';
export default function AdminRouter() {
  return (
  <div>
    <Routes>
      <Route path="/" exact element={<AdminLogin/>}/>
      <Route  path='/dashboard/*' exact element={<PrivateRoute/>}>
        <Route  path='/dashboard/*' exact element={<AdminDashboard/>}/>
      </Route>
      
    </Routes>
  </div>
  );
}
