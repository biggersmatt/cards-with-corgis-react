// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./PlayOrCreate.css");

function PlayOrCreate(props) {
  let [redirect, setRedirect] = useState(null);

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="play-or-create-container">
      <header>
        <h3>Welcome to {props.partyName}!</h3>
        <p>Play Cards With Corgis with the cards that have been added to this party's deck.</p>
        <p>Click Cards to create, edit or delete cards that you have created.</p>
      </header>

      <div className="play-or-create-wrapper">
        <button 
          className="play-or-create-btn"
          onClick={() => setRedirect(redirect = "/playorcreate/play")}
        >
          Play
        </button>
        <button 
          className="play-or-create-btn"
          onClick={() => setRedirect(redirect = "/playorcreate/create")}
        >
          Cards
        </button>
      </div>

    </div>
  )
}

export default PlayOrCreate;