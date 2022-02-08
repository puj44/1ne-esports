import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

export default function AdminRouter() {
  return (<div>
        <Routes>
            <Route path="/" exact element={<AdminLogin/>}/>
            
              <Route path="/dashboard/" element={<AdminDashboard/>}/>
            
        </Routes>
  </div>);
}
