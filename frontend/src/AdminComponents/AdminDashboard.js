import React from "react";
import {Routes, Route } from 'react-router-dom';
import SidebarRouter from './SidebarComponents/SidebarRouter'
import Sidebar from './SidebarComponents/Sidebar'
import PrivateRoute from './PrivateRoute';
function AdminDashboard() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };
  return (
    <div>
      <div style={styles.contentDiv}>
        <Sidebar></Sidebar>
        <div style={styles.contentMargin}>
          <Routes>
          <Route path='/' exact element={<PrivateRoute/>}>
            <Route path="/*" element={<SidebarRouter/>}/>
            </Route>
          </Routes>
          
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;