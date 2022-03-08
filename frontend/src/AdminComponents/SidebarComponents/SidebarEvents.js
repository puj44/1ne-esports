import React,{useState} from 'react';
import '../../css/fonts1.css';
import '../../css/Container.css';
import {ImSearch} from 'react-icons/im';
import {BiUserPlus} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {FaUserEdit} from 'react-icons/fa';
import AddPlayerModal from './DashboardComponents/AddPlayerModal';
export default function SidebarEvents() {
  const [searchvalue,setsearchvalue]=useState('');
  const [playername,setplayername]=useState('john');
  const [playerdesc,setplayerdesc]=useState('');
  const  clickSearch=() => {
    
  }
  const Edit=()=>{

  }
  const Delete=()=>{

  }
  return (
    <div className="inline">
      <div className="Container" style={{"width":"100%","marginTop":"3%"}}>
          <div className="input-group pl-2 mt-4 " style={{"fontSize":"22px","paddingLeft":"15%"}}>
            <input placeholder='Search...' type="text" onChange={e => setsearchvalue(e.target.value)}/>
            <i className="btn shadow p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={clickSearch} ><ImSearch/></i> 
            <i className="btn" style={{"backgroundColor":"#343a40","color":"white","marginLeft":"36%","width":"4%"}}> <BiUserPlus /></i>
          </div> 
          <div className="pl-2 mt-4 ml-2" style={{"width":"62%","marginLeft":"14.9%"}}>
            <ul className="list-group" style={{"fontSize":"24px"}}>
              <li className="list-group-item list-group-item-action">{playername}
              <span style={{"marginLeft":"81%","float":"right"}}><i className="btn  p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={Edit} ><FaUserEdit/></i> &nbsp;
              <i className="btn  p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={Delete} ><MdDelete/></i> </span>
              </li>
              
            </ul>
          </div>
      </div>
     
    </div>
  )
}
