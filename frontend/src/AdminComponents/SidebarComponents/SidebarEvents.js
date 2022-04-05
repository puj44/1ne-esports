import React,{useState,useRef} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Alert from '../Alert';

const locales={
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    title : "Community Game Night",
    start: new Date(2022,2,14),
    end : new Date(2022,2,22),
  }
]
export default function SidebarEvents() {
  const [newEvent,setNewEvent]=useState({title:"",start:"",end:""})
  const [allEvents,setAllEvents]=useState(events);
  const [inputerror,setinputerror]=useState('');
  const [show,setShow]=useState(false);
  // const flag=useRef(0);
  // const handleChange=(title1,start1,end1)=>{
  //   console.log(title1,start1,end1);
  //   if(title1!==null){
  //     setNewEvent(newEvent=>[...newEvent,{title:title1}]);
  //   }
  //   else if(start1!==null){
  //     setNewEvent(newEvent=>[...newEvent,{start:start1}]);
  //   }
  //   else{
  //     setNewEvent(newEvent=>[...newEvent,{end:end1}]);
  //   }
  // }
  const handleAddEvent=(e)=>{
    e.preventDefault();
    setAllEvents([...allEvents,newEvent]);
    setShow(false);
    console.log(newEvent);
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="flex-container">

      <div className="Event" >
        <center>
          <button  className="btn"  style={{"backgroundColor":"#343a40","color":"white","marginTop":"3%","width":"10%"}} onClick={()=>handleShow()}>Add Event</button>
        </center>
        <Modal show={show} onHide={handleClose}>
          <form>
            <Modal.Header closeButton >
              <Modal.Title >Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{"backgroundColor":"black","fontSize":"22px"}}>
              <h1 className='display-7' style={{'color':'white'}}>1<span style={{'color':'yellow'}}>N</span>E Esports</h1>
              <br/>
              <input 
                style={{"fontSize":"22px"}} 
                className='form-control shadow p-2 bg-body rounded' 
                placeholder='Event Name' 
                id='eventName' 
                type='text' 
                value={newEvent.title} 
                onChange={(e) => setNewEvent({...newEvent,title:e.target.value})}
              />
              <br/>

              <div style={{display:'flex',flexDirection:'row'}}>
                <DatePicker 
                  className="form-control shadow p-2 bg-body rounded"
                  placeholderText="Start Date" 
                  selected={newEvent.start} 
                  onChange={(start)=> setNewEvent({...newEvent,start})}
                  showTimeSelect
                  dateFormat="MM/dd/yyyy  EE hh:mm aa"
                />&nbsp;&nbsp;
                <DatePicker 
                  className="form-control shadow p-2 bg-body rounded"
                  placeholderText="End Date" 
                  selected={newEvent.end} 
                  onChange={(end)=> setNewEvent({...newEvent,end})}
                  showTimeSelect
                  dateFormat="MM/dd/yyyy  EE hh:mm aa"
                /> 
              </div>
              {inputerror === ''?null:<Alert message={inputerror} type='danger'/>}
            </Modal.Body>  
            <Modal.Footer>
            <center>
              <button tag='input'  className='btn btn-primary fs-4 w-auto h-auto' onClick={(e)=>handleAddEvent(e)}>Add</button>
            </center>   
            </Modal.Footer>
          </form>
        </Modal>
      </div>

      <div className="Calendar" style={{"marginTop":"2%","height":500,"marginRight":"1%","backgroundColor": "white"}}>
        <Calendar style={{"margin":"2%"}}
          localizer={localizer} 
          events={allEvents} 
          startAccessor="start"
          endAccessor="end"
        />
      </div>

    </div>
  )
}
