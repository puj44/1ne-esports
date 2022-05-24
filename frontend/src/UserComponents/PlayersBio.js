import React,{useState,useRef} from 'react';
import '../css/Boxmodel.css';
import axios from 'axios';

function TeamBio() {
  const [teams,setTeams]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isfetched,setFetched]=useState(false);
  const [pages,setPages] = useState('');
  const dropid=useRef([]);
  const dropid2=useRef([]);
  const boxElement=useRef([]);
  const arrowProp=useRef([]);
  const arrowProp2=useRef([]);
  const childElement=useRef([]);
  let teamStack=[];
  let playerStack=[];
  const buttonStyle={
    backgroundColor:"rgb(253,191,23,255)",
    color:"black",
    fontSize:"24px",
    border:"0px",
    width:"5%",
    margin:"1%"
  };

  function fetch(){
      axios({
        method: 'GET',
        url: 'https://esports-1ne.herokuapp.com/user/players/display',
        withCredentials: true,
        credentials: "include",
      }).then((response) => {
        if(response.status===200)
            {
              setTeams(response.data.teamsArray);
              setPages(Math.ceil(response.data.teamsArray.length / 16));
            }
      }, (error) => {
          if(error.response.status===400){
            setTeams('');
          }
          else{
            setTeams('');
          }
    });
    setFetched(true);
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
    return teams.slice(startIndex, endIndex);
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

  const getPlayersData=(id)=>{
    let playersArray=[];
    Object.keys(teams).forEach((key) => {
      if (teams[key].id === id) {
        playersArray=teams[key].filtered;
      }
    });
    return playersArray;
  }
  const arrowChange=(idx,ar)=>{
    let arrow=arrowProp2.current[idx];
    if(ar===1){
        arrow=arrowProp.current[idx];
    }
    arrow.style.transform="rotate(-135deg)";
    arrow.style.webkitTransform="rotate(-135deg)";
    arrow.style.marginTop="9%";
    
  }
  const arrowReset=(idx,ar)=>{
    let arrow=arrowProp2.current[idx];
    if(ar===1){
        arrow=arrowProp.current[idx];
    }
    arrow.style.transform="rotate(45deg)";
    arrow.style.webkitTransform="rotate(45deg)";
    arrow.style.marginTop="6%";
  }
  //--------------------------------team dropdown functions-------------------------------------------------
  function teamDropDown(val,idx){
    if(val===0){
      dropid.current[idx].style.display="inline-block";
      boxElement.current[idx].style.borderWidth="4px";
      boxElement.current[idx].style.boxShadow="rgba(208,189,141) 0px 15px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 9px 18px -18px inset";
    }
    else if(val===1){
      dropid.current[idx].style.display="none";
      boxElement.current[idx].style.borderWidth="3px";
      boxElement.current[idx].style.boxShadow="0px 0px 0px 0px";
    }
  }
  //--------------------------------player dropdown function------------------------------------------------
  function playerDropDown(val,idx,idx2){
    if(val===0){
      dropid2.current[idx].style.display="inline-block";
      dropid.current[idx2].style.height="36.80%";
      childElement.current[idx].style.border="3px solid rgb(232,193,86)";
      childElement.current[idx].style.boxShadow="rgba(232,193,86,255) 0px 15px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 9px 18px -18px inset";
    }
    else if(val===1){
      dropid2.current[idx].style.display="none";
      childElement.current[idx].style.borderWidth="2px";
      childElement.current[idx].style.border="2px solid white";
      childElement.current[idx].style.boxShadow="0px 0px 0px 0px";
      dropid.current[idx2].style.height="9%";
    }
  }
  //--------------------------------css manipulation dropdown function--------------------------------------
  const dropDown=(idx)=>{
    if(dropid.current[idx].style.display==="none"){
      if(teamStack.length>0){
        console.log("tl");
        if(playerStack.length>0){
          console.log("pl");
          playerDropDown(1,playerStack[0].prevIdx,idx);
          arrowReset(playerStack[0].prevIdx,2);
          playerStack=[];
        }
        teamDropDown(1,teamStack[0].prevIdx);
        arrowReset(teamStack[0].prevIdx,1);
        teamStack=[];
      }
      teamDropDown(0,idx);
      arrowChange(idx,1);
      teamStack.push({prevIdx:idx});
    }
    else if(dropid.current[idx].style.display==="inline-block"){
      teamDropDown(1,idx);
      arrowReset(idx,1);
      teamStack=[];
    }
  }
  const secondDropDown=(idx,idx2)=>{
    
    if(dropid2.current[idx].style.display==="none"){
      if(playerStack.length>0){
        playerDropDown(1,playerStack[0].prevIdx,idx2);
        arrowReset(playerStack[0].prevIdx,2);
        playerStack=[];
      }
      playerDropDown(0,idx,idx2);
      arrowChange(idx,2);
      playerStack.push({prevIdx:idx});
    }
    else if(dropid2.current[idx].style.display==="inline-block"){
      playerDropDown(1,idx,idx2);
      arrowReset(idx,2);
      playerStack=[];
    }
  }
  if(isfetched===false){
    fetch();
  }

  return (
    <div className="Box">
      <div className="row">
        <center><div className="title">APAC Players Biography</div></center>
          <div className="col-md-12"  style={{"justifyContent": "center"}}>
            {/*TEAMS LOOP*/}
            {teams!==''? getPageData().map((data,idx)=>{return(
              <>
                <label ref={(el) => (boxElement.current[idx] = el)} key={data.id}  className="listBox" >{data.name} &nbsp;
                    <span ref={(el=>{arrowProp.current[idx]=el})} onClick={()=>dropDown(idx)} className="arrow"></span><br></br>
                    <label   ref={(el) => (dropid.current[idx] = el)} style={{"width":"70%","border":"3px solid rgb(253,191,23)","backgroundColor":"rgb(196,196,196)","display":"none"}} className="dropdown-box">
                      {/* //PLAYERS LOOP DISPLAY */}
                      <div className="row" >
                      {teams!==''? getPlayersData(data.id).map((pl)=>{return(
                        <>
                          <div key={pl.pid} ref={(el) => (childElement.current[pl.pid] = el)} style={{"border":"2px solid white","width":"14%","height":"10%","marginTop":"1%"}} className="listBox" >{pl.pname} &nbsp;
                            <span ref={(el=>{arrowProp2.current[pl.pid]=el})} onClick={()=>secondDropDown(pl.pid,idx)} className="arrow"></span><br></br>
                          </div><br></br>
                          <div ref={(el) => (dropid2.current[pl.pid] = el)} style={{"display":"none"}} className="player-box">{pl.pdesc}</div>
                        </>
                      )}):''}
                      {/*//END */}
                      </div>
                    </label>
                </label>
                
              </>
            )}):''}
            {/*TEAMS LOOP END*/}
          </div>
          <div className="col-md-12" style={{"position": "relative","marginTop":"2%"}}>
              <center>
                <button onClick={prevPage} className={`button ${currentPage === 1 ? 'disabled' : ''}`}>Prev</button>
                {teams!==''?getPageGroup().map((item, index) => (
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
  )
}

export default TeamBio;