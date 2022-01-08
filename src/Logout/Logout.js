import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const Navigate = useNavigate();
  useEffect(() => {
    fetch(`https://usersinfo-api-auth.herokuapp.com/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("Authorization")}`,
      },
    }).then((res) => {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("id");
      Navigate("/");
    });
  }, []);
  return <div></div>;
}

export default Logout;
