import React, { useEffect, useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Courses() {
  const { token, loading, user, setUser, setToken } = useContext(AuthContext);
  const [isadmin, setisadmin] = useState();
  let hist = useNavigate();
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    if (user) {
      fetchallcourses();
    }
  }, [user, token]);

  function fetchallcourses() {
    if (user && user.isadmin) {
      setisadmin(true);
    } else {
      setisadmin(false);
      fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/purchasedcourses`, {
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPurchasedCourses(data);
        })
        .catch((error) => console.error(error));
    }
    fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/courses`, {
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = (id) => {
    let activecourse = courses.find((e) => e.id == id);
    fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/courses/${id}`, {
      crossdomain: true,
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("deleted successfully");
        fetchallcourses();
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (id) => {
    let activecourse = courses.find((e) => e.id == id);
    hist(`/edit/${id}`);
  };

  const handlePurchase = (id) => {
    if (window.confirm("Are you sure you want to purchase ?")) {
      fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/purchase/${id}`, {
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          fetchallcourses();
        })
        .catch((error) => console.error(error));
    } else {
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
      <h3>Courses</h3>
      <Link to="/">
        <Button type="button">Home</Button>
      </Link>
      {isadmin && (
        <Link to="/create">
          <Button type="button">Add Course</Button>
        </Link>
      )}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((e) => {
            let alreadypurchased =
              purchasedCourses &&
              purchasedCourses.find((arr1Obj) => arr1Obj._id == e._id);
            return (
              <tr key={`${e._id}}`}>
                <td>{e.title}</td>
                <td>{e.description}</td>
                <td>{e.price}</td>
                <td>
                  {isadmin && (
                    <>
                      <Link to={`/edit/${e._id}`}>
                        <Button onClick={() => handleEdit(e._id)}>Edit</Button>
                      </Link>

                      <Button onClick={() => handleDelete(e._id)}>
                        Delete
                      </Button>
                    </>
                  )}
                  {!isadmin && !alreadypurchased && (
                    <>
                      <Button onClick={() => handlePurchase(e._id)}>
                        Purchase
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {user && !isadmin && (
        <>
          <h3>Purchased Courses</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {purchasedCourses.map((e) => {
                return (
                  <tr key={`${e.id}}`}>
                    <td>{e.title}</td>
                    <td>{e.description}</td>
                    <td>{e.price}</td>
                    <></>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
export default Courses;
