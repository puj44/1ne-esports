import React from "react";
import {Routes, Route } from 'react-router-dom';
import SidebarRouter from './SidebarComponents/SidebarRouter'
import Sidebar from './SidebarComponents/Sidebar'

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
            
            <Route path="/*" element={<SidebarRouter/>}/>
            
          </Routes>
          
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;