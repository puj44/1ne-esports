import React, {useState} from 'react';

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from './Alert';
import '../css/bgimg.css';
const axios = require('axios');
const eye = <FontAwesomeIcon icon={faEye} />;

export default function AdminLogin() {
    const [logusername,setlogusername]=useState('');
    const [logpassword,setlogpassword]=useState('');
    const [loginerror,setloginerror]=useState('');
    const [passwordShown, setPasswordShown] = useState(false);
          const togglePasswordVisiblity = () => {
            setPasswordShown(passwordShown ? false : true);
          };
          const submitValueLog = (e) => {
            e.preventDefault();
            axios({
                method: 'GET',
                url: 'https://esports-1ne.herokuapp.com/auth/signin/'+logusername+'/'+logpassword,
                withCredentials: true,
                credentials:"include",
              }).then((response) => {
                 if(response.status===200)
                    window.location='https://1ne-esports.netlify.app/admin/dashboard';
              }, (error) => {
                
                    if(error.response!==undefined){
                        if(error.response.status===404){
                            setloginerror('Username or password is wrong');
                        }
                        if(error.response.status===401){
                            setloginerror('Password is wrong');
                        }
                    }else{
                        setloginerror('something went wrong');
                    }
              });
        }
    return(
        <div >
            <div className="modal-dialog modal-fullscreen-sm-down" >
                <div className="modal-content" style={{'backgroundColor':'black','border':'3px solid white'}}>
                    <div className="modal-header" style={{'backgroundColor':'black','color':'white'}}>
                        <h5 className="modal-title" id="staticBackdropLabel" style={{'color':'white','fontSize':'33px'}}>Login</h5>
                    </div>
                    <div className="modal-body">
                        <h1 className='display-7' style={{'color':'white'}}>1<span style={{'color':'yellow'}}>N</span>E Esports</h1>
                        <br/>
                        <form onSubmit={submitValueLog}>
                            <input className='form-control shadow p-2 bg-body rounded' placeholder='Username' id='username' type='text' onChange={e => setlogusername(e.target.value)}/><br/>
                            <div className="input-group mb-3">
                                <input className='form-control shadow p-2 bg-body rounded' placeholder='Password' id='password' type={passwordShown ? "text" : "password"} onChange={e => setlogpassword(e.target.value)} required/>
                                <i className="btn btn-primary shadow p-2" onClick={togglePasswordVisiblity}>{eye}</i>  
                            </div>
                            <br/>
                            {loginerror === ''?null:<Alert message={loginerror} type='danger'/>}
                            <br/>
                            <center>
                                <button tag='input' type='submit' className='btn btn-primary fs-4 w-auto h-auto'>&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;</button>
                            </center>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
  </div>
  );
}
