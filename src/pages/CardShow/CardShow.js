// React
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// CSS
require("./CardShow.css");

function CardShow() {
  const [card, setCard] = useState({});
  const { id } = useParams();

  const handleFetchThisCard = () => {
    fetch(`http://localhost:4000/card/${id}`)
    .then(response => response.json())
    .then(jsonData => {
      const thisCard = jsonData.foundCard;
      setCard(thisCard);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    handleFetchThisCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="card-show-container">
      <header>
        <h3>Edit Your Cards</h3>
        <p>You can edit/update this card.</p>
      </header>
      <div className="card-show-wrapper">
        <h3>Update This Card</h3>
        <textarea 
          name="prompt" 
          id="prompt" 
          cols="30" 
          rows="10"
          placeholder={`${card.prompt}`}
          >
          </textarea>
        <button>Update Card</button>
      </div>
    </div>
  )
}

export default CardShow;