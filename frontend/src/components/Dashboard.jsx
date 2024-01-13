import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  let hist = useNavigate();
  const { token, loading, user, setUser, setToken } = useContext(AuthContext);
  const [logIn, setLogin] = useState((user && user.name) || "");
  useEffect(() => {
    if (user && user.name) setLogin(user.name);
  }, [user]);
  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    // Remove the token from local storage
    localStorage.removeItem("ctdtoken");

    hist("/login");
  };
  return (
    <div>
      <h1>Dashboard </h1>
      <h3>Hi, {logIn}</h3>
      <h3>You are {user && user.isadmin ? "an" : "not an"} admin</h3>
      {user && user.isadmin && (
        <>
          <h3>
            <Link to="/users">Users</Link>
          </h3>
        </>
      )}
      <h3>
        <Link to="/courses">Courses</Link>
      </h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
