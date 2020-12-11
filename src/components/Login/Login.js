import React, { useState, useContext } from "react";
<<<<<<< HEAD
import "./Login.css";
import Button from "@material-ui/core/Button";
import { withRouter, Redirect } from "react-router-dom";
import { ProfileContext } from "../../ProfileContext";
const axios = require('axios').default;




function Login(props) {
  const { dispatch } = useContext(ProfileContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userActivities, setUserActivities] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [registered, setRegistered] = useState(false);

   //Login State:
   const [loginUserName, setLoginUserName] = useState("");
   const [loginPassword, setLoginPassword] = useState("");

   const [data, setData] = useState(null)

  if (registered) {
    return (
      <Redirect to='/flick'></Redirect>
    );
  }

  const handleOnClick = (e) => {
    e.preventDefault();

    let action = {
      name: userName,
      age: userAge,
      picture: userPicture,
      activities: userActivities,
      type: 'ADD_USER'
    };
    dispatch(action);
    setRegistered(true);
  };

    //routes:
    const register = () =>{
    axios({
      method: "POST",
      data: {
        username: loginUserName,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then
      ((res) => console.log(res));
  }

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: userName,
        password: password
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then
      ((res) => console.log(res));
  }

  const getUser = () => {
    axios({
      method: "GET",
      data: {
        username: userName,
        password: password
      },
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then
      ((res) => setData(res.data));
  }


  return (
    <div>
      <h1 className="loginH1">SoleMate</h1>

      <br />
=======
import Button from "@material-ui/core/Button";
import { withRouter, Redirect } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from 'axios';


function Login() {
    //Registration State:
      function Login(props) {
      const { dispatch } = useContext(ProfileContext);
      const [userName, setUserName] = useState("");
      const [userAge, setUserAge] = useState("");
      const [userActivities, setUserActivities] = useState("");
      const [userPicture, setUserPicture] = useState("");
      const [registered, setRegistered] = useState(false);
    
      if (registered) {
        return (
          <Redirect to='/flick'></Redirect>
        );
      }
    
      const handleOnClick = (e) => {
        e.preventDefault();
    
        let action = {
          name: userName,
          age: userAge,
          picture: userPicture,
          activities: userActivities,
          type: 'ADD_USER'
        };
        dispatch(action);
        setRegistered(true);
      };

    const [data, setData] = useState(null)

    

    //routes:
    const register = () =>{
      axios({
        method: "POST",
        data: {
          username: loginUserName,
          password: loginPassword,
        },
        withCredentials: true,
        url: "http://localhost:4000/register",
      }).then
        ((res) => console.log(res));
    }

    const login = () => {
      axios({
        method: "POST",
        data: {
          username: registerUserName,
          password: registerPassword
        },
        withCredentials: true,
        url: "http://localhost:4000/login",
      }).then
        ((res) => console.log(res));
    }

    const getUser = () => {
      axios({
        method: "GET",
        data: {
          username: registerUserName,
          password: registerPassword
        },
        withCredentials: true,
        url: "http://localhost:4000/user",
      }).then
        ((res) => setData(res.data));
    }
>>>>>>> main

      <form className="loginForm" noValidate autoComplete="off">
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
           onChange=  {(event) => setUserPicture(event.target.value)}
          />
        </div>

<<<<<<< HEAD
=======
​


>>>>>>> main
        <div className="submitButton">
          <Button
            onClick={handleOnClick}
            className="btn"
            type="text"
            variant="contained"
            color="primary"
          >
            Enter
          </Button>
        </div>
      </form>
  );
}

export default withRouter(Login);
