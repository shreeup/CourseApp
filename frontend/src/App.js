import logo from "./logo.svg";
import "./App.css";
import Courses from "./components/Courses";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import UserEdit from "./components/UserEdit";
import { Container, Col, Row } from "react-bootstrap";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />{" "}
            <Route path="/courses" element={<Courses />} />
            <Route path="/create" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/users" element={<Users />} />
            <Route path="/useredit/:id" element={<UserEdit />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
