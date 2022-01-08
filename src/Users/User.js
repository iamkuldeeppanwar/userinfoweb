import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { Alert, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

function User() {
  const Navigate = useNavigate();
  const [user, setUser] = React.useState([]);
  const [error, setError] = React.useState();

  const toggle = () => setError(!error);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      Navigate("/");
    } else {
      getUser();
    }
  }, []);

  function getUser() {
    fetch(`https://usersinfo-api-auth.herokuapp.com/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return (
            setError("Session is expired Signin again"),
            localStorage.removeItem("Authorization"),
            localStorage.removeItem("id"),
            setTimeout(() => {
              Navigate("/signup");
            }, 1000)
          );
        } else {
          setUser(res);
        }
      });
  }

  function deleteUser(id) {
    const confirm = window.confirm(
      "If you delete the user session will expire!"
    );
    if (confirm === true) {
      fetch(`https://usersinfo-api-auth.herokuapp.com/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${localStorage.getItem("Authorization")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setError("Session is expired Signin again");
          setTimeout(() => {
            getUser();
          }, 1000);
        });
    }
  }

  return (
    <div>
      {error && (
        <Snackbar
          open={toggle}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <div className="logoutbtn">
        <Button onClick={() => Navigate("/logout")} endIcon={<LogoutIcon />}>
          Logout
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.address}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                {localStorage.getItem("id") === user._id && (
                  <TableCell onClick={() => deleteUser(user._id)}>
                    <DeleteIcon></DeleteIcon>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default User;
