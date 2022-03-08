import React,{useState} from "react";
import Alert from "../../Alert"

export default function AddPlayerModal() {
    const [playername,setplayername]=useState('john');
    const [playerdesc,setplayerdesc]=useState('');
    const [inputerror,setinputerror]=useState('');
    const submitValue=()=>{
        
    }
  return (
    <div >
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
        <div className="modal-dialog modal-fullscreen-sm-down" >
            <div className="modal-content" style={{'backgroundColor':'black','border':'3px solid white'}}>
                <div className="modal-header" style={{'backgroundColor':'black','color':'white'}}>
                        <h5 className="modal-title" id="staticBackdropLabel" style={{'color':'white','fontSize':'33px'}}>Add Player</h5>
                    </div>
                    <div className="modal-body">
                        <h1 className='display-7' style={{'color':'white'}}>1<span style={{'color':'yellow'}}>N</span>E Esports</h1>
                        <br/>
                        <form onSubmit={submitValue}>
                            <input className='form-control shadow p-2 bg-body rounded' placeholder='Player Name' id='playername' type='text' onChange={e => setplayername(e.target.value)}/><br/>
                            <div className="input-group mb-3">
                                <textarea className='form-control shadow p-2 bg-body rounded' placeholder='Player Description' id='playerdesc' onChange={e => setplayerdesc(e.target.value)} required/>
                            </div>
                            <br/>
                            {inputerror === ''?null:<Alert message={inputerror} type='danger'/>}
                            <br/>
                            <center>
                                <button tag='input' type='submit' className='btn btn-primary fs-4 w-auto h-auto'>&nbsp;&nbsp;&nbsp;Add&nbsp;&nbsp;&nbsp;</button>
                            </center>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
            </div>
  </div>
  )
}
