// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./Login.css");

function Login(props) {
  const [loginUser, setLoginUser] = useState({
    firstName: "",
    partyName: "",
    password: "",
  })

  let [redirect, setRedirect] = useState(null);

  const handleChange = (event) => {
    if(event.target.id === "first-name") {
      setLoginUser(prevLoginUser => {
        return {
          ...prevLoginUser,
          firstName: event.target.value,
        }
      })
    }
    if(event.target.id === "party-name") {
      setLoginUser(prevLoginUser => {
        return {
          ...prevLoginUser,
          partyName: event.target.value,
        }
      })
    }
    if(event.target.id === "password") {
      setLoginUser(prevLoginUser => {
        return {
          ...prevLoginUser,
          password: event.target.value,
        }
      })
    }
  }

  const handleUserCheck = (currentPartyName, currentPassword, userId) => {
    if(currentPartyName === loginUser.partyName && currentPassword === loginUser.password) {
      setRedirect(redirect = "/playorcreate" );
      props.handleUserInfo(userId, loginUser.firstName, loginUser.partyName);
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://pacific-mesa-89997.herokuapp.com/party")
    .then(response => response.json())
    .then(jsonData => {
      const allParties = jsonData.allParties;
      if(allParties.length > 0) {
        let loggedIn = false;
        for(let i = 0; i < allParties.length && !loggedIn; i++) {
          const currentPartyName = allParties[i].partyName;
          const currentPassword = allParties[i].password;
          const userId = allParties[i]._id;
          loggedIn = handleUserCheck(currentPartyName, currentPassword, userId);
        }
        if(loggedIn) {
          alert("Welcome to Cards With Corgis")
        }
        if(!loggedIn) {
          alert("Incorrect Login Information")
        }
      } else {
        alert("Create a Party")
      }
    })
    .catch(err => console.log(err))
  }


  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="login-container">

      <header>
        <h3>Cards With Corgis</h3>
        <p>
          Login to play with your deck.<br/>
          To create a new deck, click the button below.<br/>
          Your first name is how the deck finds your cards. Be sure to type it correctly.
        </p>
      </header>

      <form className="login-wrapper shadow" onSubmit={handleSubmit}>
        <h4>Login</h4>
        <div className="login-section">
          <label htmlFor="first-name">Enter Your First Name</label>
          <input 
            type="text"
            id="first-name"
            name="first-name"
            onChange={handleChange}
          />
        </div>
        <div className="login-section">
          <label htmlFor="party-name">Deck Name</label>
          <input 
            type="text"
            id="party-name"
            name="party-name"
            onChange={handleChange}
          />
        </div>
        <div className="login-section">
          <label htmlFor="password">Deck Password</label>
          <input 
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="login-btn" type="submit">Login</button>
        <div className="login-section">
          <h4>- Or -</h4>
          <button 
            className="login-create-party-btn" 
            onClick={() => setRedirect(redirect = "/createparty")}>
            Create New Deck
          </button>
        </div>
      </form>

    </div>
  )
}

export default Login;