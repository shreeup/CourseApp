import React, { useState, useEffect, useContext } from "react";

import { Button, Form } from "react-bootstrap";
import Courses from "./Courses";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function UserEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  let hist = useNavigate();
  const { id } = useParams();
  const { token, loading, user, setUser, setToken } = useContext(AuthContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/users/${id}`, {
      crossdomain: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.user.name);
        setEmail(data.user.email);
        setIsadmin(data.user.isadmin);
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
        name,
        email,
        isadmin,
      }),
    };

    fetch(
      `${process.env.REACT_APP_NODEAPP_URL}/api/v1/users/${id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {})
      .catch((error) => console.error(error));
    hist("/users");
  };
  return (
    <div>
      <Form className="d-grid gap-2 " style={{ margin: "15em" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Check type={"checkbox"}>
            <Form.Check.Input
              type={"checkbox"}
              defaultChecked={isadmin}
              checked={isadmin}
              onClick={(e) => {
                setIsadmin(e.target.checked);
              }}
            />
            <Form.Check.Label>Admin</Form.Check.Label>
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

export default UserEdit;
