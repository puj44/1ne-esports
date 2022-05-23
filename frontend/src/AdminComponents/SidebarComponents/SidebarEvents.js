import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import Alert from "../Alert";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../css/Events-GameNight.css";

export default function SidebarEvents() {
  const [inputerror, setinputerror] = useState("");
  const [show, setShow] = useState(false);
  const [allEvents, setallEvents] = useState("");
  const [isfetched, setfetched] = useState(false);
  const [newEvent, setnewEvent] = useState("");
  const [highlight, sethighlight] = useState("");
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePopUpClose = () => sethighlight(false);
  const handleAddCGEvent = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://esports-1ne.vercel.app/admin/add/event",
      data: {
        title: newEvent.title,
        date: newEvent.date,
      },
      withCredentials: true,
      credentials: "include",
    }).then(
      (response) => {
        if (response.status === 200) {
          handleClose();
          fetch();
        }
      },
      (error) => {
        if (error.response !== undefined) {
          if (error.response.status === 403) {
            setinputerror("Could not add!");
          }
          if (error.response.status === 400) {
            setinputerror("Login!");
          }
          if (error.response.status === 402) {
            setinputerror("Length Exceeded!");
          }
        }
      }
    );
  };
  const fetch = () => {
    axios({
      method: "GET",
      url: "https://esports-1ne.vercel.app/admin/event/all",
      withCredentials: true,
      credentials: "include",
    }).then(
      (response) => {
        if (response.status === 200) {
          setallEvents(response.data.eventResult);
        }
      },
      (error) => {
        if (error.response.status === 400) {
          setinputerror("Could not load");
        } else {
          setinputerror(error.response.message);
        }
      }
    );
    setfetched(true);
  };

  const popup = (date) => {
    Object.keys(allEvents).forEach((element) => {
      if (allEvents[element].date === moment(date).format("DD-MM-YYYY")) {
        settitle(allEvents[element].title);
        setdate(allEvents[element].date);
        settime(allEvents[element].time);
        sethighlight(true);
      }
    });
  };

  if (isfetched === false) {
    fetch();
  }
  return (
    <div className="flex-container gameElement desktopElement">
      <div className="CG">
        <div style={{ marginLeft: "50%" }}>
          <button
            className="btn"
            style={{
              backgroundColor: "#343a40",
              color: "white",
              marginTop: "3%",
              width: "40%",
            }}
            onClick={() => handleShow()}
          >
            Add Event
          </button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Community Events</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "black", fontSize: "22px" }}>
              <h1 className="display-7" style={{ color: "white" }}>
                1<span style={{ color: "yellow" }}>N</span>E Esports
              </h1>
              <br />
              <input
                style={{ fontSize: "22px" }}
                className="form-control shadow p-2 bg-body rounded"
                placeholder="Event Name"
                id="eventName"
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setnewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <br />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker
                  className="form-control shadow p-2 bg-body rounded"
                  placeholderText="Date"
                  selected={newEvent.date}
                  dateFormat="MM/dd/yyyy  EE hh:mm aa"
                  showTimeSelect
                  onChange={(date) => setnewEvent({ ...newEvent, date })}
                />
              </div>
              {inputerror === "" ? null : (
                <Alert message={inputerror} type="danger" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <center>
                <button
                  tag="input"
                  className="btn btn-primary fs-4 w-auto h-auto"
                  onClick={(e) => handleAddCGEvent(e)}
                >
                  Add
                </button>
              </center>
            </Modal.Footer>
          </form>
        </Modal>
      </div>

      <div className="Calendar" style={{ marginTop: "2%", marginLeft: "15%" }}>
        <Calendar
          style={{ height: "50%" }}
          onClickDay={(date) => popup(date)}
          tileClassName={({ date, view }) =>
            Object.keys(allEvents).map((item) => {
              return allEvents.find(
                (x) => x.date === moment(date).format("DD-MM-YYYY")
              )
                ? "highlight"
                : "";
            })
          }
          defaultView="month"
        />
      </div>
      <Modal className="popup" show={highlight} onHide={handlePopUpClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p style={{ margin: "0.9%", width: "100%", fontSize: "28px" }}>
              Community Event "{title}" <br />
              Date: {date} &nbsp; Time: {time}
            </p>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}
