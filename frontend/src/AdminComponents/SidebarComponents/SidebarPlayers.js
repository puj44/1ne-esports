import React,{useState,useEffect,useMemo} from 'react';
import '../../css/fonts1.css';
import '../../css/Container.css';
import {ImSearch} from 'react-icons/im';
import {BiUserPlus} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {FaUserEdit} from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Alert from '../Alert';
export default function SidebarPlayers() {
  const [show, setShow] = useState(false);
  
  
  const [show2, setShow2] = useState(false);
  
  const [searchvalue,setsearchvalue]=useState('');
  
  const [newname,setnewname]=useState(null);
  const [newdesc,setnewdesc]=useState(null);
  const [newid,setnewid]=useState(null);
  const [inputerror,setinputerror]=useState('');
  let playerdetails=useMemo(() => [], []);
  const handleShow = (id,name,desc) => {
    if(id!==null && name !==null && desc!==null){
      setShow(true);
      setnewid(id);
      setnewname(name);
      setnewdesc(desc);
    }
    else if(id!==null){
      setShow2(true);
      setnewid(id);
    }
    else{
      setShow(true);
    }
      
  }
  const handleClose = () => 
  {
    setnewid(null);
    setnewname(null);
    setnewdesc(null);
    setShow(false);
    setShow2(false);
  }
  const  Search=() => {
    // console.log(searchvalue);
  }
  useEffect(()=>{
   
    axios({
        method: 'GET',
        url: 'http://localhost:3000/admin/players/all',
        withCredentials: true,
        credentials: "include",
      }).then((response) => {
        if(response.status===200)
            {
              for(var i=0;i<response.data.length;i++){
                playerdetails.push(response.data[i]);
              }
              
            }
      }, (error) => {
        
          if(error.response.status===400){
            setinputerror('Could not load');
          }
          else{
            setinputerror(error.response.message);
          }
        
    });
  
    
  },[playerdetails]);
  const submitValue=(e)=>{
    e.preventDefault();
    if(show===true && newid===null)
    {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/admin/addplayer',
            data: {
                'name' : newname,
                'desc' : newdesc,
            },
            withCredentials: true,
            credentials: "include",
        }).then((response) => {
            if(response.status===200)
            handleClose();
        }, (error) => {
                if(error.response!==undefined){
                    if(error.response.status===403){
                        setinputerror('Could not add!');
                    }
                    if(error.response.status===400){
                        setinputerror('Login!');
                    }
                    if(error.response.status===402){
                        setinputerror('Length Exceeded!');
                    }
        }
        });
    }
    else{
      
        axios({
            method: 'POST',
            url: 'http://localhost:3000/admin/updateplayer',
            data: {
                '_id'  : newid,
                'name' : newname,
                'desc' : newdesc,
            },
            withCredentials: true,
            credentials: "include",
        }).then((response) => {
            if(response.status===200){
              handleClose();
            }
           
        }, (error) => {
                if(error.response!==undefined){
                    if(error.response.status===400){
                        setinputerror('Login!');
                    }
          }
        });
   
  } 
}

  const Confirm=()=>{
    
    axios({
            method: 'DELETE',
            url: 'http://localhost:3000/admin/delplayer',
            data: {
                'id' : newid,
            },
            withCredentials: true,
            credentials: "include",
        }).then((response) => {
                handleClose();
        }, (error) => {
                if(error.response!==undefined){
                  
                }
        });
      
  }
  
  
  
    
    return (
      
        <div className="inline" >
          <div className="Container" style={{"width":"100%","marginTop":"3%"}}>
              <div className="input-group pl-2 mt-4 " style={{"fontSize":"22px","paddingLeft":"15%"}}>
                <input placeholder='Search...' type="text" onChange={e => setsearchvalue(e.target.value)}/>
                <i className="btn shadow p-2 grey" style={{"backgroundColor":"#343a40","color":"white"}} onClick={Search} ><ImSearch/></i> 
                <span  className="btn" style={{"backgroundColor":"#343a40","color":"white","marginLeft":"36%","width":"4%"}} onClick={()=>handleShow(null,null,null)}><BiUserPlus  /></span>
              </div> 
              <div className="pl-2 mt-4 ml-2" style={{"width":"62%","marginLeft":"14.9%"}}>
              
                <ul className="list-group" style={{"fontSize":"24px"}}>
                {  playerdetails.map((data) => (
                    <li className="list-group-item list-group-item-action white" key={data.name}> {data.name===null || data.name===undefined?"No data":data.name}
                      <span style={{"marginLeft":"81%","float":"right"}}><i className="btn  p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={()=>handleShow(data._id,data.name,data.description)}><FaUserEdit/></i> &nbsp;
                      <i className="btn  p-2" style={{"backgroundColor":"#343a40","color":"white"}} onClick={()=>handleShow(data._id,null,null)} ><MdDelete/></i> </span>
                    </li>
                      ))}
                </ul>
              
              </div>  
          </div>
                  <>
       
        <Modal show={show} onHide={handleClose} >
          <form onSubmit={submitValue}>
              <Modal.Header closeButton>
                <Modal.Title >{newid===null?"Add Player":"Edit Player"}</Modal.Title>
              </Modal.Header>
                    <Modal.Body style={{"backgroundColor":"black","fontSize":"22px"}}>
                    <h1 className='display-7' style={{'color':'white'}}>1<span style={{'color':'yellow'}}>N</span>E Esports</h1>
                                        <br/>
                                        
                                  
                          <input style={{"fontSize":"22px"}} className='form-control shadow p-2 bg-body rounded' placeholder='Player Name' value={newname=== null? "Player Name":newname} id='playername' type='text' onChange={e => setnewname(e.target.value)}/><br/>
                          <div className="input-group mb-3">
                          <textarea style={{"fontSize":"22px"}} className='form-control shadow p-2 bg-body rounded' value={newdesc===null?"Player Description":newdesc} placeholder='Player Description' id='playerdesc' onChange={e => setnewdesc(e.target.value)} required/>
                                      <span className="">Max 300 words...</span>
                                  </div>
                                  <br/>
                                  {inputerror === ''?null:<Alert message={inputerror} type='danger'/>}
                                
                    </Modal.Body>  
        
              <Modal.Footer>
                      {newid===null ?
                                      <> 
                                          <center>
                                              <button tag='input' type='submit' className='btn btn-primary fs-4 w-auto h-auto'>Add</button>
                                          </center>
                                          <br/>
                                      </>
                                      :
                                      <>
                                          <center>
                                              <button tag='input' type='submit' className='btn btn-primary fs-4 w-auto h-auto'>Save</button>
                                          </center>
                                      </>
                                  }
            </Modal.Footer>
          </form>
        </Modal>
        </>
        <>
        <Modal show={show2} onHide={handleClose} >
          
          <Modal.Header closeButton >
            <Modal.Title >Delete Player</Modal.Title>
          </Modal.Header>
            <Modal.Body style={{"backgroundColor":"black","fontSize":"22px"}}>
              <h1 className='display-7' style={{'color':'white'}}>1<span style={{'color':'yellow'}}>N</span>E Esports</h1>
                              <br/>
                    <span style={{'fontSize':'18px','color':'white'}}>Are you sure you want to delete the player?</span>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn-close" onClick={()=>Confirm} data-bs-dismiss="modal"  aria-label="Confirm"></button>
            </Modal.Footer>
          </Modal>
          </>
      </div>
    )
  }

