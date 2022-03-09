import React,{useState} from 'react';
import '../../css/fonts1.css';
import '../../css/Container.css';
import {ImSearch} from 'react-icons/im';
import {BiUserPlus} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {FaUserEdit} from 'react-icons/fa';
import axios from 'axios';
import AddPlayerModal from './DashboardComponents/AddPlayerModal';
import DeletePlayer from './DashboardComponents/DeletePlayer';
export default function SidebarPlayers() {
  
  const [searchvalue,setsearchvalue]=useState('');
  const [playername,setplayername]=useState('');
  const [playerdesc,setplayerdesc]=useState('');
  const [objectid,setobjectid]=useState('');
  let playerdetails=[] ;
  const  Search=() => {
    
  }

  // const Add=()=>{
    
    
  // }
  // const Update=(_id,pname,pdesc)=>{
  //    return <AddPlayerModal tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id={_id} name={pname} desc={pdesc}/>
  // }
   
  
 
  const Fetch=()=>{
    axios({
        method: 'GET',
        url: 'https://esports-1ne.herokuapp.com/admin/players/all',
        withCredentials: true,
        credentials: "include",
      }).then((response) => {
        if(response.status===200)
            {
              setplayername(response.result['name']);
              setplayerdesc(response.result['desc']);
              setobjectid(response.result['_id']);
              playerdetails = [objectid,playername,playerdesc];
            }
      }, (error) => {
          if(error.response!==undefined){
            setplayername('Could not load');
          }
        
    });
  }
  Fetch();
  return (
    <div className="inline" id="element">
      <div className="Container" style={{"width":"100%","marginTop":"3%"}}>
          <div className="input-group pl-2 mt-4 " style={{"fontSize":"22px","paddingLeft":"15%"}}>
            <input placeholder='Search...' type="text" onChange={e => setsearchvalue(e.target.value)}/>
            <i className="btn shadow p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={Search} ><ImSearch/></i> 
            <span  className="btn" style={{"backgroundColor":"#343a40","color":"white","marginLeft":"36%","width":"4%"}} aria-hidden="true" onClick={<AddPlayerModal id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  id1={null} name={null} desc={null}/>}> <BiUserPlus  /></span>
          </div> 
          <div className="pl-2 mt-4 ml-2" style={{"width":"62%","marginLeft":"14.9%"}}>
          
            <ul className="list-group" style={{"fontSize":"24px"}}>
              {  playerdetails.map(({_id,pname,pdesc}) => (
              
              <li className="list-group-item list-group-item-action"> {pname}
              <span style={{"marginLeft":"81%","float":"right"}}><i className="btn  p-2" style={{"backgroundColor":"#343a40","color":"white"}} ><FaUserEdit/></i> &nbsp;
              <i className="btn  p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={<DeletePlayer id={_id}/>} ><MdDelete/></i> </span>
              </li>
              ))}
              
            </ul>
          </div>
      </div>
     
    </div>
  )
}
