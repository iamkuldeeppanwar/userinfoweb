import React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = React.useState("");
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

  const Login = (e) => {
    e.preventDefault();
    fetch(`https://usersinfo-api-auth.herokuapp.com/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.user) {
          return setError("Unable to login!");
        } else {
          setSuccess("User Login successfully");
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
      <h3>LOGIN</h3>
      <form onSubmit={Login}>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            minLength={7}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input className="btn" type="submit" value="Login" />
        </div>
        <div className="or">
          <p>Or</p>
          <Link className="redirect" to="/signup">
            Create an Account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
