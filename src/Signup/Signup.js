import React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const Navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const toggle = () => setError(!error);
  const toggle1 = () => setError(!success);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const Signup = (e) => {
    e.preventDefault();
    fetch(`https://usersinfo-api-auth.herokuapp.com/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        address,
        phone,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError("User already exist!");
        } else {
          setSuccess("User added Successfully");
          localStorage.setItem("Authorization", res.token);
          localStorage.setItem("id", res.user._id);
          setTimeout(() => {
            Navigate("/users");
          }, 1000);
        }
      });
  };

  return (
    <div className="container">
      {success && (
        <Snackbar
          open={toggle1}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <Alert onClose={handleClose}>{success}</Alert>
        </Snackbar>
      )}
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
      <h3>SIGNUP</h3>
      <form onSubmit={Signup}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="Number"
            name="phone"
            placeholder="Phone..."
            min={1000000000}
            max={9999999999}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="address..."
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
            minLength="7"
            required
          />
        </div>
        <label>Password must be greater than 7 characters</label>
        <div>
          <input className="btn" type="submit" value="Signin" />
        </div>
        <div className="or">
          <p>Or</p>
          <Link className="redirect" to="/">
            Already have an Account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
