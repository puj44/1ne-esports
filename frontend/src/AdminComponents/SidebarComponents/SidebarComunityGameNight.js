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
import Loadingspinner from "../Loadingspinner.js";

export default function SidebarComunityGameNight() {
  const [inputerror, setinputerror] = useState("");
  const [show, setShow] = useState(false);
  const [allCGN, setallCGN] = useState("");
  const [isfetched, setfetched] = useState(false);
  const [newCGN, setnewCGN] = useState("");
  const [highlight, sethighlight] = useState("");
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePopUpClose = () => sethighlight(false);
  const handleAddCGEvent = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3000/admin/add/CG",
      data: {
        title: newCGN.title,
        date: newCGN.date,
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
    <Loadingspinner />;
    axios({
      method: "get",
      url: "http://localhost:3000/admin/CG/all",
      withCredentials: true,
      credentials: "include",
    }).then(
      (response) => {
        if (response.status === 200) {
          setallCGN(response.data.cgnResult);
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
    Object.keys(allCGN).forEach((element) => {
      if (allCGN[element].date === moment(date).format("DD-MM-YYYY")) {
        settitle(allCGN[element].title);
        setdate(allCGN[element].date);
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
            Add Schedule
          </button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Add Schedule for Game Night</Modal.Title>
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
                value={newCGN.title}
                onChange={(e) =>
                  setnewCGN({ ...newCGN, title: e.target.value })
                }
              />
              <br />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker
                  className="form-control shadow p-2 bg-body rounded"
                  placeholderText="Date"
                  selected={newCGN.date}
                  onChange={(date) => setnewCGN({ ...newCGN, date })}
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
            Object.keys(allCGN).map((item) => {
              return allCGN.find(
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
              Game Night "{title}"
            </p>
            <p style={{ margin: "0.9%", width: "100%", fontSize: "28px" }}>
              Date: {date}
            </p>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}
