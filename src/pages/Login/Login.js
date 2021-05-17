// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./Login.css");

function Login() {
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

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="login-container">
      <header>
        <h3>Cards With Corgis</h3>
        <p>Log into your party to play with your deck.</p>
        <p>To create a new party, click the button below.</p>
      </header>
      <form className="login-wrapper">
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
          <label htmlFor="party-name">Party Name</label>
          <input 
            type="text"
            id="party-name"
            name="party-name"
            onChange={handleChange}
          />
        </div>
        <div className="login-section">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="login-btn" type="submit">Login</button>
      </form>
      <div className="login-create-party">
        <h3>- Or -</h3>
        <button className="login-create-party-btn">Create New Party</button>
      </div>
    </div>
  )
}

export default Login;