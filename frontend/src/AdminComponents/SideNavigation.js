import React from 'react';
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart } from "react-icons/fa";
import { BsFillCalendar2Fill } from "react-icons/bs";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  // added styles 
  const styles = {
    sideBarHeight: {
      height: "100vh",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader>
        <div className="inline">
        <span><img src="../assets/logo.png"></img></span>
        <span style={{'fontSize':'30px','fontFamily':'bourgeois'}}>Dashboard</span>
        <div className="menu" style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
        </div>
      </SidebarHeader>
      <Menu iconShape="round">
        <MenuItem icon={<BsFillCalendar2Fill />}>Events</MenuItem>
        <MenuItem icon={<FaGem />}>Rankings</MenuItem>
        <MenuItem icon={<FaGem />}>Players</MenuItem>
        <MenuItem icon={<FaGem />}>Community</MenuItem>
      </Menu>
    </ProSidebar>
  );
}
export default SideNavigation;