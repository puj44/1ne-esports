import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Loadingspinner from "./Loadingspinner";
export default function PrivateRoute() {
  const [user, setUser] = useState(false);
  const [isFetched, setisFetched] = useState(false);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/auth/getstatus",
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => {
        setUser(true);
        setisFetched(true);
      })
      .catch((error) => {
        alert("Login first!");
        setUser(false);
        setisFetched(true);
      });
  }, []);

  if (isFetched === false) {
    return <Loadingspinner />;
  }
  if (user === true && isFetched === true) {
    return <Outlet />;
  } else if (user === false && isFetched === true) {
    return <Navigate to="/admin" />;
  }
}
