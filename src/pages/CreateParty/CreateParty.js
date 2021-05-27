// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./CreateParty.css");

function CreateParty() {
  const [newParty, setNewParty] = useState({
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
    fetch("https://pacific-mesa-89997.herokuapp.com/party", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPartyCreated),
    })
    .then(() => alert("New Party Created"))
    .then(() => setRedirect(redirect = "/"))
    .catch(err => console.log(err))
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
      fetch("https://pacific-mesa-89997.herokuapp.com/party")
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
        <h3>Create a New Deck</h3>
        <p>Once you've created a deck, you'll be able to have anyone you provide the login info to add custom cards they've created.</p>
      </header>
      <form className="new-wrapper" onSubmit={handleSubmit}>
        <h4>What's Your Deck Name?</h4>
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
        <div className="login-section">
          <label htmlFor="confirmation">Confirm Password</label>
          <input 
            type="password"
            id="confirmation"
            name="confirmation"
            onChange={handleChange}
          />
        </div>
        <button className="new-btn" type="submit">Create New Deck</button>
      </form>
    </div>
  )
}

export default CreateParty;