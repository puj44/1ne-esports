import React from 'react';
import axios from 'axios';

export default function DeletePlayer(props) {
    const id=props.id;
    const close = () => {
        const cl1 = document.getElementById('close1');
        cl1.click();
  };
  const Confirm=()=>{
    axios({
            method: 'DELETE',
            url: 'https://esports-1ne.herokuapp.com/admin/delplayer',
            data: {
                'id' : id,
            },
            withCredentials: true,
            credentials: "include",
        }).then((response) => {
                close();
        }, (error) => {
                if(error.response!==undefined){
                
                }
        });
  }
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
    <div className="modal-dialog modal-fullscreen-sm-down" >
        <div className="modal-content" style={{'backgroundColor':'black','border':'3px solid white'}}>
            <div className="modal-header" style={{'backgroundColor':'black','color':'white'}}>
                    <h5 className="modal-title" id="staticBackdropLabel" style={{'color':'white','fontSize':'33px'}}>Delete Player</h5>
                    <button type="button" className="btn-close" id="close1" data-bs-dismiss="modal"  aria-label="Close"></button>
                    
                </div>
        </div>
        <div className="modal-body">
            <center><button type="button" className="btn-close" onClick={Confirm} data-bs-dismiss="modal"  aria-label="Confirm"></button></center>
        </div>
    </div>
    </div>
  )
}


