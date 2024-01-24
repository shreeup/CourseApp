import React, { useEffect, useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Users() {
  const { token, loading, user, setUser, setToken } = useContext(AuthContext);
  let hist = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user) {
      fetchusers();
    }
  }, [user, token]);

  const fetchusers = () => {
    fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/users`, {
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.error(error));
  };

  const handleDeactivate = (id) => {
    if (window.confirm("Are you sure you want to delete this user ?")) {
      fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/users/${id}`, {
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          fetchusers();
        })
        .catch((error) => console.error(error));
    }
  };

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <h3>Users</h3>
      <Link to="/">
        <Button type="button">Home</Button>
      </Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>IsAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => {
            return (
              <tr key={`${e._id}}`}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.isadmin.toString()}</td>
                <td>
                  <Link to={`/useredit/${e._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={() => handleDeactivate(e._id)}>
                    Deactivate
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default Users;
