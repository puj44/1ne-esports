import React from 'react';
import { useState } from "react";
import axios from 'axios';
import { AiOutlineMenu } from "react-icons/ai";
import { FaJedi, FaHeadset } from "react-icons/fa";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import {RiCommunityLine} from "react-icons/ri"
import {MdLogout} from "react-icons/md"
import {Link} from 'react-router-dom';
import '../../css/sidebar.css';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
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
      margin: "5%",
    },
    menuitem:{
      fontSize: "125%",
      marginLeft: "2%",
      marginTop: "4%",
      fontcolor: "white",
      fill : "yellow"
    },
    sidebartitle:{
      fontSize:'200%',
      fontFamily:'bourgeois',
      marginLeft: '2%',
      marginBottom: '4%',
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  const Logout=()=>{
    axios({
      method: 'GET',
      url: "http://localhost:3000/auth/signout",
      withCredentials: true,
      credentials:"include"
    }).then((response) => {
       if(response.status===200)
          window.location='https://localhost:3001/admin';
    });
  }
  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader className="sideheader" style={{'marginTop':'5%'}}>
          {collapsed 
          ?
          <div className="menu" style={{'marginLeft':'35%','marginBottom':'15%'}} onClick={onClickMenuIcon}>
          <AiOutlineMenu id="outlineMenu" style={{'color':'white','height':'25px','width':'20px','marginTop':'2%','align':'center'}}/>
          </div>
          :
          <div className="inline">
            <span style={styles.sidebartitle}><span style={{'color':'white'}}>1</span><span style={{'color':'#F6BE00'}}>N</span><span style={{'color':'white'}}>E ESPORTS</span> </span>
            <div className="menu" style={styles.menuIcon} onClick={onClickMenuIcon}>
              <AiOutlineMenu id="outlineMenu" style={{'color':'white','height':'25px','width':'20px','marginTop':'2%'}}/>
            </div>
          </div>
          }
      </SidebarHeader>
      <Menu iconShape="square" className="menu1">
        <MenuItem style={styles.menuitem} icon={<BsFillCalendar2CheckFill  style={{'color':'white','height':'25px','width':'20px'}} />}>
          <Link to='events'>
            <span style={{'color':'white'}}>Events</span>
            </Link>
        </MenuItem>
        <MenuItem style={styles.menuitem} icon={<FaJedi style={{'color':'white','height':'25px','width':'20px'}} />}> 
          <Link to='rankings'>
            <span style={{'color':'white'}}>Rankings</span>
          </Link>
        </MenuItem>
        <MenuItem style={styles.menuitem} icon={<FaHeadset  style={{'color':'white','height':'25px','width':'20px'}}/>}>
          <Link to='players'> 
            <span style={{'color':'white'}}>Players</span>
          </Link>
        </MenuItem>
        <MenuItem style={styles.menuitem} icon={<RiCommunityLine  style={{'color':'white','height':'25px','width':'20px'}}/>}> 
          <Link to='game-night'> 
            <span style={{'color':'white'}}>Community Game Night</span>
          </Link>
        </MenuItem>
      </Menu>
      <SidebarFooter style={{'marginTop':'60%'}}>
        <Menu iconShape="square">
          <MenuItem style={styles.menuitem} icon={<MdLogout  style={{'color':'white','height':'25px','width':'20px'}}/>}>
            <span style={{'color':'white'}} onClick={Logout}>Logout</span>  
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
export default SideNavigation;