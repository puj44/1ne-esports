import React, { useState } from "react";
import "../css/Boxmodel.css";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";

export default function Events(){
  const [inputerror, setinputerror] = useState("");
  const [allEvents, setallEvents] = useState("");
  const [isfetched, setfetched] = useState(false);
  const [highlight, sethighlight] = useState(false);
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const handlePopUpClose = () => sethighlight(false);

  const fetch = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/user/events/display",
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
    <center>
    <div className="Box-Calendar">
      <center><div className="title-Calendar">Events</div></center>
      <div className="Calendar">
        <Calendar className="cal"
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
    </center>
  );
}