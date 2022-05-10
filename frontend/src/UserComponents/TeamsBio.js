import {React,useState,useRef} from 'react';
import '../css/Boxmodel.css';
import axios from 'axios';
function PlayersBio() {
  
  const [players,setplayers]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isfetched,setfetched]=useState(false);
  const [pages,setPages] = useState('');
  const dropid=useRef([]);
  const boxElement=useRef([]);
  const arrowProp=useRef([]);
  const buttonStyle={
    backgroundColor:"rgb(253,191,23,255)",
    color:"black",
    fontSize:"24px",
    border:"0px",
    width:"5%",
    margin:"1%"
  };
  //-------------------------fetch teams function-------------------
  const fetch=()=>{
        axios({
          method: 'GET',
          url: 'http://localhost:3000/user/teams/display',
          withCredentials: true,
          credentials: "include",
        }).then((response) => {
          if(response.status===200)
              {
                setplayers(response.data.teamsArray);
                setPages(Math.ceil(response.data.teamsArray.length / 16));
              }
        }, (error) => {
            if(error.response.status===400){
              setplayers('');
            }
            else{
              setplayers('');
            }
      });
      setfetched(true);
    }
  
  //--------------------------------next/prev page functions------------------------------------------------
  //next page
  const nextPage=()=>{
    setCurrentPage((page) => page + 1);
  }

  //previous page
  const prevPage=()=>{
    setCurrentPage((page) => page - 1);
  }

  
  //get specific page data
  const getPageData = () => {
    
    const startIndex = currentPage * 16 - 16;
    const endIndex = startIndex + 16;
    return players.slice(startIndex, endIndex);
  };

  //change to specific page
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  //group page numbers
  const getPageGroup = () => {
    let pageArray=[];
    let start = Math.floor((currentPage - 1) / 4) * 4; 
    let count=0;
    for(var i = start+1;i<=pages;i++){
        if(count===2){
          break;
        }  
        else {
          pageArray.push(i);
        }
        count++;
    }
    return pageArray;
  };

  //--------------------------------css manipulation dropdown function--------------------------------------
  const dropDown=(idx)=>{
    if(dropid.current[idx].style.display==="none"){
      dropid.current[idx].style.display="block";
      boxElement.current[idx].style.borderWidth="4px";
      boxElement.current[idx].style.boxShadow="rgba(208,189,141) 0px 15px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 9px 18px -18px inset";
      arrowProp.current[idx].style.transform="rotate(-135deg)";
      arrowProp.current[idx].style.webkitTransform="rotate(-135deg)";
      arrowProp.current[idx].style.marginTop="9%";
    }
    else{
      dropid.current[idx].style.display="none";
      boxElement.current[idx].style.borderWidth="3px";
      boxElement.current[idx].style.boxShadow="0px 0px 0px 0px";
      arrowProp.current[idx].style.transform="rotate(45deg)";
      arrowProp.current[idx].style.webkitTransform="rotate(45deg)";
      arrowProp.current[idx].style.marginTop="6%";
    }
  }
  if(isfetched===false){
    fetch();
  }

  return (
    <div className="Box">
      <div className="row">
          <center><div className="title">APAC Teams Biography</div></center>
          <div className="col-md-12"  style={{"justifyContent": "center"}}>
            {players!==''? getPageData().map((data,idx)=>{return(
              <>
                <label ref={(el) => (boxElement.current[idx] = el)} key={idx} className="listBox" >{data.name} &nbsp;
                    <span ref={(el=>{arrowProp.current[idx]=el})} onClick={()=>dropDown(idx)} className="arrow"></span><br></br>
                    <label key={idx}  ref={(el) => (dropid.current[idx] = el)} style={{"paddingLeft":"1%"}} className="dropdown-box">{data.description}</label>
                </label>
                
              </>
            )}):''}
          </div>
          <div className="col-md-12" style={{"position": "relative","marginTop":"2%"}}>
              <center>
                <button onClick={prevPage} className={`button ${currentPage === 1 ? 'disabled' : ''}`}>Prev</button>
                {players!==''?getPageGroup().map((item, index) => (
                  <button
                    style={buttonStyle}
                    key={index}
                    onClick={changePage}
                    className={`${currentPage === item ? 'active' : null}`}
                  >
                    <span>{item}</span>
                  </button>
                )):''}
                <button onClick={nextPage} className={`button ${currentPage === pages ? 'disabled' : ''}`}>Next</button>
              </center>
          </div>
      </div>
    </div>
  );
}

export default PlayersBio;
