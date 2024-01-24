import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    setUser(null);
    // Remove the token from local storage
    localStorage.removeItem("ctdtoken");

    navigate("/login");
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
