import {React,useEffect,useState,useRef} from 'react';
import boxCss from '../css/Boxmodel.css';
import axios from 'axios';
function PlayersBio() {
  const [teams,setteams]= useState('');
  const [players,setplayers]=useState('');
  const dropid=useRef();
  
  const boxElement=useRef();
  useEffect(()=>{
        axios({
          method: 'GET',
          url: 'http://localhost:3000/user/players/display',
          withCredentials: true,
          credentials: "include",
        }).then((response) => {
          if(response.status===200)
              {
                setplayers(response.data.playersArray);
              }
        }, (error) => {
            if(error.response.status===400){
              setplayers('');
            }
            else{
              setplayers('');
            }
      });
  },[players]);
  const dropDown=()=>{
    if(dropid.current.style.display==="none"){
      dropid.current.style.display="block";
      boxElement.current.style.borderWidth="6px";

    }
    else{
      dropid.current.style.display="none";
      boxElement.current.style.borderWidth="3px";
      
    }
  }
  
  return (
    <div className="Box">
      <div className="row">
          <center><div className="title">APAC Players Biography</div></center>
          <div className="col-md-12"  style={{"justifyContent": "center"}}>
              <label ref={boxElement}  className="listBox" >1NE &nbsp;
                  <span onClick={dropDown} className="arrow"></span><br></br>
                  
              </label>
              <label ref={dropid} className="dropdown-box">Asdasdasd   dasdsd     asdasdasdasd       asdasdsa dsadsadsad     sadasdasdasd   dassdd dsadsad sadasd sadasd asd</label>
            
          </div>
          <div className="col-md-12 jus" style={{"position": "relative","marginTop":"2%"}}>
              <center><button className="button">Prev</button><button className="button">Next</button></center>
          </div>
      </div>
    </div>
  );
}

export default PlayersBio;
