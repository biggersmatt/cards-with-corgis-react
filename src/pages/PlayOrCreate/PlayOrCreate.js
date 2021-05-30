// React
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./PlayOrCreate.css");

function PlayOrCreate(props) {
  let [total, setTotal] = useState("")
  let [redirect, setRedirect] = useState(null);

  useEffect(() => {
    handleAllCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleAllCards = () => {
    let filteredTotal = "";
    fetch("https://pacific-mesa-89997.herokuapp.com/card")
    .then(response => response.json())
    .then(jsonData => {
      const allCards = jsonData.allCards;
      let filteredCards = [];
      allCards.forEach(card => {
        if(card.partyId === props.userId) {
          filteredCards.push(card);
        }
      })
      filteredTotal = filteredCards.length;
    })
    .then(() => setTotal(filteredTotal))
    .catch(err => console.log(err));
  }

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="play-or-create-container">
      <div className="play-or-create-shader">
        <header className="play-or-create-header">
          <h3>Deck: {props.partyName} ({total})</h3>
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