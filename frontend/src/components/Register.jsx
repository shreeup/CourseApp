import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./AuthContext";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { setToken, setUser } = useContext(AuthContext);
  let hist = useNavigate();
  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    try {
      const response = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      setToken(response.data.token);
      setUser(response.data.user.name);
      localStorage.setItem("ctdtoken", response.data.token);
      hist("/courses");
    } catch (error) {
      console.error("Registration failed:", error.response.msg);
      setMessage(error.response.data.msg);
    }
  };
  return (
    <>
      <h2>Register</h2>
      {message && (
        <div style={{ color: "red" }} key="errmsg">
          {message}
        </div>
      )}
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* name */}
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* submit button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
