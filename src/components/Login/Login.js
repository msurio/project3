//Marc's Code with Passport Authentication:
import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import { withRouter, Redirect } from "react-router-dom";
import { ProfileContext } from "../../ProfileContext";
import "./Login.css";
import axios from "axios";

//Registration State:
function Login(props) {
  const { dispatch } = useContext(ProfileContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userActivities, setUserActivities] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [registered, setRegistered] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  if (registered) {
    return <Redirect to="/flick"></Redirect>;
  }
  if (authenticated) {
    return <Redirect to="/flick"></Redirect>;
  }

  //routes:
  const login = () => {
    console.log(loginUserName, loginPassword);
    axios({
      method: "POST",
      data: {
        username: userName,
        password: password,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => console.log(res));
    setAuthenticated(true);
    dispatch(login);

  };

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: userName,
        password: password,
        age: userAge,
        picture: userPicture,
        activities: userActivities,
        type: "ADD_USER",
      },

      withCredentials: true,
      url: "/register",
    }).then((res) => console.log(res));
  };

  return (
    <div className="app">
      <h1 className="title">SoleMate</h1>

      <div className="register">
        <form className="loginForm" noValidate autoComplete="off">
        <h2 className="hTag">Registration:</h2>
          <div className="inputField">
            <input
              className="input"
              type="text"
              id="fullName"
              label="Full Name"
              placeholder="Full Name"
              variant="outlined"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="inputField">
            <input
              className="input"
              type="password"
              id="password"
              label="password"
              placeholder="Password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="inputField">
            <input
              className="input"
              type="text"
              id="age"
              label="Age"
              placeholder="Age"
              variant="outlined"
              onChange={(event) => setUserAge(event.target.value)}
            />
          </div>
          <div className="inputField">
            <input
              className="input"
              type="text"
              id="activites"
              label="Activities"
              placeholder="Activities"
              variant="outlined"
              onChange={(event) => setUserActivities(event.target.value)}
            />
          </div>
          <div className="inputField">
            <input
              className="input"
              type="input"
              id="picture"
              label="Picture"
              placeholder="Picture URL"
              variant="outlined"
              onChange={(event) => setUserPicture(event.target.value)}
            />
          </div>

          <div className="submitButton">
            <Button
              onClick={register}
              className="btn"
              type="text"
              variant="contained"
              color="primary"
            >
              Enter
            </Button>
          </div>
        </form>
      </div>

      <div className="signin">
        <form className="loginForm" noValidate autoComplete="off">
        <h2 className="hTag">Sign In:</h2>
          <div className="inputField">
            <input
              className="input"
              type="text"
              id="loginFullName"
              label="Full Name"
              placeholder="Full Name"
              variant="outlined"
              onChange={(event) => setLoginUserName(event.target.value)}
            />
          </div>

          <div className="inputField">
            <input
              className="input"
              type="password"
              id="loginPassword"
              label="password"
              placeholder="Password"
              variant="outlined"
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </div>

          <div className="submitButton">
            <Button
              onClick={login}
              className="btn"
              type="text"
              variant="contained"
              color="primary"
            >
              Enter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
