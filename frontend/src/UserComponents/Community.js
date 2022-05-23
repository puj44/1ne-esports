import React, { useState } from "react";
import "../css/Boxmodel.css";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";

export default function Community(){
  const [inputerror, setinputerror] = useState("");
  const [allCGN, setallCGN] = useState("");
  const [isfetched, setfetched] = useState(false);
  const [highlight, sethighlight] = useState("");
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const handlePopUpClose = () => sethighlight(false);

  const fetch = () => {
    axios({
      method: "get",
      url: "https://esports-1ne.vercel.app/admin/CG/all",
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
    <center>
    <div className="Box-Calendar">
      <center><div className="title-Calendar">Game Night</div></center>
      <div className="Calendar">
        <Calendar className="cal"
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
              Community Event "{title}" <br />
              Date: {date}
            </p>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
    </center>
  );
}