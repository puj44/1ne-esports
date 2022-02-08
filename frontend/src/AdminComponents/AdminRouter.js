import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

export default function AdminRouter() {
  return (<div>
        <Routes>
            <Route path="/" exact element={<AdminLogin/>}/>
            
<<<<<<< HEAD
              <Route path="/dashboard"  element={<AdminDashboard/>}/>
=======
              <Route path="/dashboard/" element={<AdminDashboard/>}/>
>>>>>>> 03d2449a61d5593416cdac8581b7fa146f581cf9
            
        </Routes>
  </div>);
}
