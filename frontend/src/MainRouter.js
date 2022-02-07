import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminRouter from './AdminComponents/AdminRouter';
import UserRouter from './UserComponents/UserRouter';
export default function MainRouter() {
  return (
    <div>
        <Routes>
            <Route path="/user" element={<UserRouter/>}/>
            <Route path="/admin" exact element={<AdminRouter/>}/>
        </Routes>
    </div>
  );
}
