import React, { createContext, useState, useEffect, useNavigate } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("ctdtoken");
    setToken(storedToken);
    if (storedToken) {
      fetch(`${process.env.REACT_APP_NODEAPP_URL}/api/v1/auth/me`, {
        crossdomain: true,
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => console.error(error));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
