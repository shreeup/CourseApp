import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken, setUser } = useContext(AuthContext);
  let hist = useNavigate();
  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODEAPP_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      setToken(response.data.token);
      setUser(response.data.user.name);
      localStorage.setItem("ctdtoken", response.data.token);

      hist("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      setUser(null);
      localStorage.removeItem("ctdtoken");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Set the error message if present in the error response
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <h2>Login</h2>
      {errorMessage && (
        <div style={{ color: "red" }} key="errmsg">
          {errorMessage}
        </div>
      )}
      <Form key="form" onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Form>
    </>
  );
}
