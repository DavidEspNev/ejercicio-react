import React, { useInsertionEffect } from "react";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Dashboard from "./Dashboard";
const Login = () => {
  const { login } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
    //var session = sessionStorage.getItem("auth");
    if (sessionStorage.getItem("auth")) {
      console.log(sessionStorage.getItem("auth"));
      setSuccess(true);
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === "admin@gmail.com" && pwd === "admin") {
      setSuccess(true);
      login(user);
      setUser("");
      setPwd("");
      sessionStorage.setItem("auth", user);
      console.log(sessionStorage.getItem("auth"));
    } else {
      setErrMsg("Invalid user or password");
      userRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <Dashboard />
          <button
            type="button"
            className="btn btn-logOut"
            onClick={() => {
              setSuccess(false);
              logout(user);
            }}
          >
            Logout
          </button>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            style={{ color: "red" }}
            className={errMsg ? "errMsj" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">Email</label>
            <input
              type="text"
              id="user"
              ref={userRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              id="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button>Login</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
