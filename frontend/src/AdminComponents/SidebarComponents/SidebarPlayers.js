import React, { useState, useRef } from "react";
import "../../css/Fonts.css";
import "../../css/Container.css";
import { BiUserPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "../Alert";
//import Loadingspinner from '../Loadingspinner';
export default function SidebarPlayers() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inputerror, setinputerror] = useState("");
  const [newteam, setnewteam] = useState("");
  const [tn, settn] = useState("");
  const [td, settd] = useState("");
  //let teamdet=[{},{},{},{}];
  const [teamdet, setteamdet] = useState([{}, {}, {}, {}]);
  const [newid, setid] = useState({});
  const [teams, setteams] = useState("");
  const searchl = useRef(0);
  const [isfetched, setfetched] = useState(false);
  const flag = useRef(0);
  const handleChange = (pid, pname, pdesc, key) => {
    if (pid !== null && pname !== null) {
      teamdet[key - 1] = {
        pid: pid,
        pname: pname,
        pdesc: teamdet[key - 1]["pdesc"],
      };
    } else if (pid !== null && pdesc !== null) {
      teamdet[key - 1] = {
        pid: pid,
        pname: teamdet[key - 1]["pname"],
        pdesc: pdesc,
      };
    } else if (pname !== null) {
      teamdet[key - 1] = { pname: pname, pdesc: teamdet[key - 1]["pdesc"] };
    } else {
      teamdet[key - 1] = { pname: teamdet[key - 1]["pname"], pdesc: pdesc };
    }
    flag.current = 1;
  };

  const Search = (e) => {
    if (e.length === 0) {
      fetch();
    } else {
      console.log(e.length);
      const searchplayer = (e) => {
        if (searchl.current !== e.length) {
          searchl.current = e.length;
          axios({
            method: "GET",
            url: "https://esports-1ne.vercel.app/admin/players/" + e,
            withCredentials: true,
          }).then(
            (response) => {
              if (response.status === 200) {
                setteams(response.data.teamsArray);
              }
            },
            (error) => {
              if (error.response.status === 400) {
                setinputerror("No data found");
              } else {
                setinputerror(error.response.message);
              }
            }
          );
        }
      };
      setInterval(searchplayer(e), 3000);
    }
  };

  const fetch = () => {
    axios({
      method: "GET",
      url: "https://esports-1ne.vercel.app/admin/players/all",
      withCredentials: true,
      credentials: "include",
    }).then(
      (response) => {
        if (response.status === 200) {
          setteams(response.data.teamsArray);
        }
      },
      (error) => {
        if (error.response.status === 400) {
          setteams("");
        } else {
          setinputerror(error.response.message);
        }
      }
    );
    setfetched(true);
  };

  const submitValue = (e) => {
    e.preventDefault();

    if (newteam === "") {
      console.log(teamdet);
      axios({
        method: "POST",
        url: "https://esports-1ne.vercel.app/admin/addplayer",
        data: {
          name: tn,
          desc: td,
          details: teamdet,
        },
        withCredentials: true,
        credentials: "include",
      }).then(
        (response) => {
          if (response.status === 200) handleClose();
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
    } else {
      if (flag.current === 1) {
        setnewteam((newteam) => [newteam, { tname: tn, tdesc: td }]);

        axios({
          method: "POST",
          url: "https://esports-1ne.vercel.app/admin/updateplayer",
          data: {
            team: newteam,
            players: teamdet,
          },
          withCredentials: true,
          credentials: "include",
        }).then(
          (response) => {
            if (response.status === 200) {
              setnewteam("");
              handleClose();
            }
          },
          (error) => {
            if (error.response !== undefined) {
              if (error.response.status === 400) {
                setinputerror("Login!");
              }
            }
          }
        );
      }
    }
  };
  const handleShow = (id, name, desc, value) => {
    if (id && name && desc) {
      setnewteam({ tid: id, tname: name, tdesc: desc });
      Object.keys(teams).forEach((key) => {
        if (teams[key].id === id) {
          setteamdet(teams[key].players);
        }
      });
      setShow(true);
    } else if (id) {
      setid({ id: id, val: value });
      setShow2(true);
    } else {
      setShow(true);
    }
  };
  const handleClose = (ack) => {
    if (ack === 1) {
      setShow2(false);
      setShow(false);
    } else {
      setShow(false);
      setnewteam("");
      setteamdet([{}, {}, {}, {}]);
    }
    setfetched(false);
  };
  const Confirm = (e) => {
    e.preventDefault();
    axios({
      method: "DELETE",
      url: "http://localhost:3000/admin/delplayer",
      data: {
        id: newid.id,
        value: newid.val,
      },
      withCredentials: true,
      credentials: "include",
    }).then(
      (response) => {
        if (response.status === 200) handleClose(1);
        else if (response.status === 400) {
          setinputerror("not found");
        } else {
          setinputerror(response);
        }
      },
      (error) => {
        setinputerror(error);
      }
    );
  };
  if (isfetched === false) {
    fetch();
  }
  return (
    //-------------------------------------Displaying list of teams with edit and delete function-------------------------------------
    <div className="inline">
      <div className="Container" style={{ width: "100%", marginTop: "3%" }}>
        <div
          className="input-group pl-2 mt-4 "
          style={{ fontSize: "22px", paddingLeft: "15%" }}
        >
          <input
            placeholder="Search..."
            id="search1"
            type="text"
            onChange={(e) => Search(e.target.value)}
          />
          <span
            className="btn"
            style={{
              backgroundColor: "#343a40",
              color: "white",
              marginLeft: "36%",
              width: "4%",
            }}
            onClick={() => handleShow(null, null, null, null)}
          >
            <BiUserPlus />
          </span>
        </div>

        <div
          className="pl-2 mt-4 ml-2"
          style={{ width: "62%", marginLeft: "14.9%" }}
        >
          <ul className="list-group" style={{ fontSize: "24px" }}>
            {teams
              ? teams.map((data, index) => {
                  return (
                    <li
                      className="list-group-item list-group-item-action white"
                      key={index}
                    >
                      {" "}
                      {data === null || data === undefined
                        ? "No data"
                        : data.name}
                      <span style={{ marginLeft: "81%", float: "right" }}>
                        <i
                          className="btn  p-2"
                          style={{ backgroundColor: "#343a40", color: "white" }}
                          onClick={() =>
                            handleShow(data.id, data.name, data.desc, null)
                          }
                        >
                          <FaUserEdit />
                        </i>{" "}
                        &nbsp;
                        <i
                          className="btn  p-2"
                          style={{ backgroundColor: "#343a40", color: "white" }}
                          onClick={() => handleShow(data.id, null, null, 1)}
                        >
                          <MdDelete />
                        </i>{" "}
                      </span>
                    </li>
                  );
                })
              : "No data found"}
          </ul>
        </div>
      </div>
      {/*-----------------------------------Add Or Edit Team and Players Details Modal-------------------------------------------------- */}
      <>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={submitValue}>
            <Modal.Header closeButton>
              <Modal.Title>{"Add/Edit Team"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "black", fontSize: "22px" }}>
              <h1 className="display-7" style={{ color: "white" }}>
                1<span style={{ color: "yellow" }}>N</span>E Esports
              </h1>
              <br />
              <label style={{ color: "white", fontSize: "24px" }}>Team</label>
              <br />
              <input
                style={{ fontSize: "22px" }}
                className="form-control shadow p-2 bg-body rounded"
                defaultValue={newteam === "" ? "" : newteam.tname}
                id="name"
                placeholder="Team Name"
                onChange={(e) => settn(e.target.value)}
                type="text"
              />
              <br />
              <div className="input-group mb-3">
                <textarea
                  style={{ fontSize: "22px" }}
                  className="form-control shadow p-2 bg-body rounded"
                  id="desc"
                  defaultValue={newteam === "" ? "" : newteam.tdesc}
                  onChange={(e) => settd(e.target.value)}
                  placeholder="Team Description"
                />
                <br />
                <span className="">Max 300 words...</span>
              </div>

              <br />
              {teamdet.map((data, index) => {
                return (
                  //------Displaying editable or empty fields for players and team with list.map() function-------------------------------------------------
                  <li key={index} type="none">
                    <label style={{ color: "white", fontSize: "24px" }}>
                      Player {index + 1}
                    </label>{" "}
                    {newteam === "" ? (
                      ""
                    ) : (
                      <span>
                        <i
                          className="btn  p-2"
                          style={{
                            backgroundColor: "#343a40",
                            color: "white",
                            marginBottom: "1%",
                            height: "60%",
                          }}
                          onClick={() =>
                            handleShow(
                              newteam !== "" ? data.pid : null,
                              null,
                              null,
                              null
                            )
                          }
                        >
                          <MdDelete />
                        </i>{" "}
                      </span>
                    )}
                    <input
                      style={{ fontSize: "22px" }}
                      className="form-control shadow p-2 bg-body rounded"
                      id="name"
                      defaultValue={
                        newteam !== ""
                          ? data.pname !== ""
                            ? data.pname
                            : ""
                          : ""
                      }
                      placeholder="Player Name"
                      name="name"
                      onChange={(e) =>
                        handleChange(
                          newteam !== "" ? data.pid : null,
                          e.target.value,
                          null,
                          index + 1
                        )
                      }
                      type="text"
                    />
                    <br />
                    <div className="input-group mb-3">
                      <textarea
                        style={{ fontSize: "22px" }}
                        className="form-control shadow p-2 bg-body rounded"
                        id="desc"
                        name="desc"
                        defaultValue={
                          newteam !== ""
                            ? data.pdesc !== ""
                              ? data.pdesc
                              : ""
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(
                            newteam !== "" ? data.pid : null,
                            null,
                            e.target.value,
                            index + 1
                          )
                        }
                        placeholder="Player Description"
                      />
                      <br />
                    </div>{" "}
                    <span style={{ color: "white" }}>Max 300 words...</span>
                    <br /> <br />
                  </li>
                );
              })}
              {inputerror === "" ? null : (
                <Alert message={inputerror} type="danger" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <center>
                <button
                  tag="input"
                  type="submit"
                  className="btn btn-primary fs-4 w-auto h-auto"
                >
                  Submit
                </button>
              </center>
              <br />
            </Modal.Footer>
          </form>
        </Modal>
      </>
      {/*-----------------------Delete player/team confirmation Modal------------------------------------------------------- */}
      <>
        <Modal show={show2} onHide={() => handleClose(1)}>
          <form onSubmit={Confirm}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Team/Player</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "black", fontSize: "22px" }}>
              <h1 className="display-7" style={{ color: "white" }}>
                1<span style={{ color: "yellow" }}>N</span>E Esports
              </h1>
              <br />
              <span style={{ fontSize: "18px", color: "white" }}>
                Are you sure you want to delete the{" "}
                {newid.value === 1 ? "team" : "player"}?
              </span>
              {inputerror === "" ? null : (
                <Alert message={inputerror} type="danger" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Confirm"
              >
                Confirm
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    </div>
  );
}
