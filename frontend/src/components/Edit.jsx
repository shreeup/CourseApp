import React, { useState, useEffect, useContext } from "react";

import { Button, Form } from "react-bootstrap";
import Courses from "./Courses";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Edit() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  let hist = useNavigate();
  const { id } = useParams();
  const { token, loading, user, setUser, setToken } = useContext(AuthContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/courses/${id}`, {
      crossdomain: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.course.title);
        setPrice(data.course.price);
        setDescription(data.course.description);
        console.log(data.course.published);
        setPublished(data.course.published);
      })
      .catch((error) => console.error(error));
  }, [token]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //call edit
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        published: published,
      }),
    };

    fetch(
      `${process.env.REACT_APP_NODEAPP_URL}/api/v1/courses/${id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setTitle(data.course.title);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Check type={"checkbox"}>
            <Form.Check.Input
              type={"checkbox"}
              defaultChecked={published}
              checked={published}
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

export default Edit;
