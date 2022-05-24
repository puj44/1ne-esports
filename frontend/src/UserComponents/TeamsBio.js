import {React,useState,useRef} from 'react';
import '../css/Boxmodel.css';
import axios from 'axios';
import Loadingspinner from './Loadingspinner';
function PlayersBio() {
  const buttonStyle={
    backgroundColor:"rgb(253,191,23,255)",
    color:"black",
    fontSize:"24px",
    border:"0px",
    width:"5%",
    margin:"1%"
  };
  const arrowDropDown={
    transform:"rotate(-135deg)",
    webkitTransform:"rotate(-135deg)",
    marginTop:"9%"
  };
  const arrowUp={
    transform:"rotate(45deg)",
    webkitTransform:"rotate(45deg)",
    marginTop:"6%"
  }
  const [players,setplayers]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isfetched,setfetched]=useState(false);
  const [pages,setPages] = useState('');
  const dropid=useRef([]);
  const boxElement=useRef([]);
  const arrowProp=useRef([]);
  let listPrev=[];
  //-------------------------fetch teams function-------------------
  const fetch=()=>{
        axios({
          method: 'GET',
          url: 'https://esports-1ne.herokuapp.com/user/teams/display',
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
  function arrowChange(val,idx){
    let arrowValue=arrowDropDown;
    if(val===0){
      arrowValue=arrowUp;
    }
    arrowProp.current[idx].style.transform=arrowValue.transform;
    arrowProp.current[idx].style.webkitTransform=arrowValue.webkitTransform;
    arrowProp.current[idx].style.marginTop=arrowValue.marginTop;
  }
  //---------------box drop down
  function boxChange(val,idx){
    if(val===1){
      dropid.current[idx].style.display="block";
      boxElement.current[idx].style.borderWidth="4px";
      boxElement.current[idx].style.boxShadow="rgba(208,189,141) 0px 15px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 9px 18px -18px inset";
    }
    else if(val===0){
      dropid.current[idx].style.display="none";
      boxElement.current[idx].style.borderWidth="3px";
      boxElement.current[idx].style.boxShadow="0px 0px 0px 0px";
    }
  }
  
  //--------------------------------css manipulation dropdown function--------------------------------------
  const dropDown=(idx)=>{
    if(dropid.current[idx].style.display==="none"){
      if(listPrev.length>0){
        boxChange(0,listPrev[0].prevIdx);
        arrowChange(0,listPrev[0].prevIdx);
        listPrev=[];
      }
      boxChange(1,idx);
      arrowChange(1,idx);
      listPrev.push({prevIdx:idx});
    }
    else if(dropid.current[idx].style.display==="block"){
      if(listPrev.length>0){
        boxChange(0,listPrev[0].prevIdx);
        arrowChange(0,listPrev[0].prevIdx);
        listPrev=[];
      }
      boxChange(0,idx);
      arrowChange(0,idx);
    }
  }
  if(isfetched===false){
    fetch();
  }

  return (
    <div className="Box">
      <div className="row">
      <center>{players===''?<Loadingspinner/>:<div className="title">APAC Teams Biography</div>}</center>
          <div className="col-md-12"  style={{"justifyContent": "center"}}>
            {players!==''? getPageData().map((data,idx)=>{return(
              <>
                <label ref={(el) => (boxElement.current[idx] = el)} key={data.id} className="listBox" >{data.name} &nbsp;
                    <span ref={(el=>{arrowProp.current[idx]=el})} onClick={()=>dropDown(idx)} className="arrow"></span><br></br>
                    <label key={idx}  ref={(el) => (dropid.current[idx] = el)} style={{"paddingLeft":"1%","display":"none"}} className="dropdown-box">{data.description}</label>
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
