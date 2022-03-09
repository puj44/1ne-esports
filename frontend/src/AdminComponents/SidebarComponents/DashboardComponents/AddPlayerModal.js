import React,{useState} from "react";
import Alert from "../../Alert"
import axios from 'axios';
export default function AddPlayerModal(props) {
    const [objectid,setobjectid]=useState('');
    const [playername,setplayername]=useState('');
    const [playerdesc,setplayerdesc]=useState('');
    const [inputerror,setinputerror]=useState('');
    
    setobjectid(props.id1);
    setplayername(props.name);
    setplayerdesc(props.desc);
    const close = () => {
        const cl1 = document.getElementById('close1');
        cl1.click();
  };
   
    const submitValue=(e)=>{
        e.preventDefault();
        if(props===null)
        {
            axios({
                method: 'POST',
                url: 'https://esports-1ne.herokuapp.com/admin/addplayer',
                data: {
                    'name' : playername,
                    'desc' : playerdesc,
                },
                withCredentials: true,
                credentials: "include",
            }).then((response) => {
                    close();
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
                url: 'https://esports-1ne.herokuapp.com/admin/updateplayer',
                data: {
                    '_id'  : objectid,
                    'name' : playername,
                    'desc' : playerdesc,
                },
                withCredentials: true,
                credentials: "include",
            }).then((response) => {
                    close();
            }, (error) => {
                    if(error.response!==undefined){
                        if(error.response.status===400){
                            setinputerror('Login!');
                        }
            }
            });
        }
    }
    
    
  return (
    <div >
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog modal-fullscreen-sm-down" >
                <div className="modal-content" style={{'backgroundColor':'black','border':'3px solid white'}}>
                    <div className="modal-header" style={{'backgroundColor':'black','color':'white'}}>
                            <h5 className="modal-title" id="staticBackdropLabel" style={{'color':'white','fontSize':'33px'}}>Add Player</h5>
                            <button type="button" className="btn-close" id="close1" data-bs-dismiss="modal"  aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h1 className='display-7' style={{'color':'white'}}>1<span style={{'color':'yellow'}}>N</span>E Esports</h1>
                            <br/>
                            <form onSubmit={submitValue}>
                                
                                <input className='form-control shadow p-2 bg-body rounded' placeholder='Player Name' value={playername} id='playername' type='text' onChange={e => setplayername(e.target.value)}/><br/>
                                <div className="input-group mb-3">
                                    <textarea className='form-control shadow p-2 bg-body rounded' value={playerdesc} placeholder='Player Description' id='playerdesc' onChange={e => setplayerdesc(e.target.value)} required/>
                                    <span className="">Max 300 words...</span>
                                </div>
                                <br/>
                                {inputerror === ''?null:<Alert message={inputerror} type='danger'/>}
                                <br/>
                                {playername===null ?
                                    <> 
                                        <center>
                                            <button tag='input' type='submit' className='btn btn-primary fs-4 w-auto h-auto'>&nbsp;&nbsp;&nbsp;Add&nbsp;&nbsp;&nbsp;</button>
                                        </center>
                                        <br/>
                                    </>
                                    :
                                    <>
                                        <center>
                                            <button tag='input' type='submit' className='btn btn-primary fs-4 w-auto h-auto'>&nbsp;&nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;</button>
                                        </center>
                                    </>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
