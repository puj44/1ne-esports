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
    
    <div className="Container" style={{"width":"100%"}}>
        <div className="input-group pl-2 mt-4 " style={{"fontSize":"22px","paddingLeft":"4%"}}>
          <input placeholder='Search...' type="text" onChange={e => setsearchvalue(e.target.value)}/>
          <i className="btn btn-primary shadow p-2" onClick={clickSearch} ><ImSearch/></i>  &nbsp; &nbsp; &nbsp;
          <span style={{"backgroundColor":"black","width":"5%","color":"white"}} onClick={Add}><BiUserPlus style={{"width":"100%","height":"10%"}}/></span>
        </div>
    </div>
  )
}
