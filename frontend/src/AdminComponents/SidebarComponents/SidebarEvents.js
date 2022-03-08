import React,{useState} from 'react';
import '../../css/fonts1.css';
import '../../css/Container.css';
import {ImSearch} from 'react-icons/im';
import {BiUserPlus} from 'react-icons/bi'
export default function SidebarEvents() {
  const [searchvalue,setsearchvalue]=useState('');
  const [playername,setplayername]=useState('');
  const [playerdesc,setplayerdesc]=useState('');
  const  clickSearch=() => {
    
  }
  const Add=()=>{

  }
  return (
    <div>
      <div className="Container" style={{"width":"100%"}}>
          <div className="input-group pl-2 mt-4 " style={{"fontSize":"22px","paddingLeft":"4%"}}>
            <input placeholder='Search...' type="text" onChange={e => setsearchvalue(e.target.value)}/>
            <i className="btn shadow p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={clickSearch} ><ImSearch/></i> 
            <i className="btn" style={{"backgroundColor":"#343a40","color":"white","marginLeft":"30%","width":"4%"}} onClick={Add}><BiUserPlus /></i>
          </div> 
          
          
      </div>
      
    </div>
  )
}
