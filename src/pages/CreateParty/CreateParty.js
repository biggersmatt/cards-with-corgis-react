// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./CreateParty.css");

function CreateParty() {
  const [newParty, setNewParty] =useState({
    partyName: "",
    password: "",
    confirmation: "",
  })

  let [redirect, setRedirect] = useState(null);

  const handleChange = (event) => {
    if(event.target.id === "party-name") {
      setNewParty(prevNewParty => {
        return {
          ...prevNewParty,
          partyName: event.target.value,
        }
      })
    }
    if(event.target.id === "password") {
      setNewParty(prevNewParty => {
        return {
          ...prevNewParty,
          password: event.target.value,
        }
      })
    }
    if(event.target.id === "confirmation") {
      setNewParty(prevNewParty => {
        return {
          ...prevNewParty,
          confirmation: event.target.value,
        }
      })
    }
  }

  const handleCreateParty = () => {
    const newPartyCreated = {
      partyName: newParty.partyName,
      password: newParty.password,
    }
    console.log(newPartyCreated)
    fetch("http://localhost:4000/party", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPartyCreated),
    })
    .then(() => alert("New Party Created"))
    .then(() => setRedirect(redirect = "/"))
    .then(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(newParty.partyName.length === 0 || newParty.password === 0) {
      alert("Please fill out Party Name & Password fields");
    } else if(newParty.partyName.length === 0) {
      alert("Please fill out Party Name field");
    } else if(newParty.password.length === 0) {
      alert("Please fill out Password field");
    } else if(newParty.password !== newParty.confirmation) {
      alert("Passwords do not match");
    } else if(newParty.password === newParty.confirmation) {
      fetch("http://localhost:4000/party")
      .then((response) => response.json())
      .then((jsonData) => {
        const parties = jsonData.allParties;
        for(let i = 0; i < parties.length; i++) {
          if(parties[i].partyName === newParty.partyName) {
            return alert("That party name is already taken")
          }
        }
        handleCreateParty();
      })
      .catch((err) => console.log(err));
    }

  }

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="create-party-container">
      <header>
        <h3>Create a New Party</h3>
        <p>Once you've created a Party, you'll be able to have anyone attending add custom cards they've created to the deck.</p>
      </header>
      <form className="login-wrapper" onSubmit={handleSubmit}>
        <h4>What's Your Party Name?</h4>
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
        <div className="login-section">
          <label htmlFor="confirmation">Confirm Password</label>
          <input 
            type="password"
            id="confirmation"
            name="confirmation"
            onChange={handleChange}
          />
        </div>
        <button className="login-btn" type="submit">Create New Party</button>
      </form>

    </div>
  )
}

export default CreateParty;