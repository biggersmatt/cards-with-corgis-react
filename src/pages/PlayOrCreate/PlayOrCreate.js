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
      <div className="play-or-create-shader">
        <header className="play-or-create-header">
          <div className="deck-name-total">
            <h3 className="deck-name">Deck: {props.partyName}</h3>
            <p className="deck-total">Total: {props.total}</p>
          </div>
          <p>You and your friends add prompts to a deck that are meant to cause someone to take a drink!</p>
          <p>"Play" shuffles all the cards in this deck so you can play Cards With Corgis!</p>
          <p>"Cards" allows you to create new cards for this deck or edit/remove cards that you have already created.</p>
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
    </div>
  )
}

export default PlayOrCreate;