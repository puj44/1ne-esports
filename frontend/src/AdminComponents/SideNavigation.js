import React from 'react';
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaJedi, FaHeadset } from "react-icons/fa";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import {RiCommunityLine} from "react-icons/ri"
import {TiGroup} from "react-icons/ti"
import {MdLogout} from "react-icons/md"
import logo from "../assets/logo.png";
import '../css/sidebar.css';
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
    },
    sidebartitle:{
      fontSize:'200%',
      fontFamily:'bourgeois',
      marginLeft: '4%',
      marginBottom: '4%',
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader className="sideheader" style={{'marginTop':'5%'}}>
        <div className="inline" style={{'marginTop':'10px','marginBottom':'5px'}}>
        {/* <img style={{'height':'40px','width':'40px','marginBottom':'5px'}} src={logo} alt="error"></img> */}
        {collapsed 
        ?
        undefined
        :
        <span style={styles.sidebartitle}><span style={{'color':'white'}}>1</span><span style={{'color':'#F6BE00'}}>N</span><span style={{'color':'white'}}>E ESPORTS</span> </span>
        }
        <div className="menu center" id="menu1" style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu id="outlineMenu" style={{'color':'white','height':'25px','width':'20px','marginTop':'2%'}}/>
        </div>
        </div>
      </SidebarHeader>
      <Menu iconShape="square">
        <MenuItem style={styles.menuitem} icon={<BsFillCalendar2CheckFill  style={{'color':'white','height':'25px','width':'20px'}} />}><span style={{'color':'white'}}>Events</span></MenuItem>
        <MenuItem style={styles.menuitem} icon={<FaJedi style={{'color':'white','height':'25px','width':'20px'}} />}> <span style={{'color':'white'}}>Rankings</span></MenuItem>
        <MenuItem style={styles.menuitem} icon={<FaHeadset  style={{'color':'white','height':'25px','width':'20px'}}/>}><span style={{'color':'white'}}>Players</span>  </MenuItem>
        <MenuItem style={styles.menuitem}  icon={<TiGroup style={{'color':'white','height':'25px','width':'20px'}}/>}> <span style={{'color':'white'}}>Teams</span> </MenuItem>
        <MenuItem style={styles.menuitem} icon={<RiCommunityLine  style={{'color':'white','height':'25px','width':'20px'}}/>}> <span style={{'color':'white'}}>Communities</span>  </MenuItem>
      </Menu>
      <SidebarFooter style={{'marginTop':'60%'}}>
        <Menu iconShape="square">
          <MenuItem style={styles.menuitem} icon={<MdLogout  style={{'color':'white','height':'25px','width':'20px'}}/>}> <span style={{'color':'white'}}>Logout</span>  </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
export default SideNavigation;