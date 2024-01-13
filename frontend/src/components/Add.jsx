import React, { useState, useContext } from "react";

import { Button, Form } from "react-bootstrap";
import Courses from "./Courses";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Add() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const { token, loading, user, setUser, setToken } = useContext(AuthContext);
  let hist = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //call add
    fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/courses`, {
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title,
        price,
        description,
        published,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Course created successfully");
      })
      .catch((error) => console.error(error));
    hist("/courses");
  };
  return (
    <div>
      <Form className="d-grid gap-2 " style={{ margin: "15em" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="number"
            placeholder="Price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Check type={"checkbox"}>
            <Form.Check.Input
              type={"checkbox"}
              defaultChecked={published}
              onClick={(e) => {
                setPublished(e.target.checked);
              }}
            />
            <Form.Check.Label>Open for Enroll</Form.Check.Label>
          </Form.Check>
        </Form.Group>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit{" "}
        </Button>
        <Link to="/">
          <Button type="button">Home</Button>
        </Link>
      </Form>
    </div>
  );
}

export default Add;
