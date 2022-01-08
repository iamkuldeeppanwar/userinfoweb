import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import User from "./Users/User";
import Logout from "./Logout/Logout";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/users" element={<User />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
