import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

export default function AdminRouter() {
  return (<div>
        <Routes>
            <Route path="/admin" exact element={<AdminLogin/>}/>
            
              <Route path="/dashboard/" exact element={<AdminDashboard/>}/>
            
        </Routes>
  </div>);
}
