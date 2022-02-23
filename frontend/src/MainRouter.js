import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminRouter from './AdminComponents/AdminRouter';
import UserRouter from './UserComponents/UserRouter';
export default function MainRouter() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<UserRouter/>}/>
            <Route path="/admin/*"  element={<AdminRouter/>}/>
        </Routes>
    </div>
  );
}
