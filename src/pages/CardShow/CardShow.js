// React
import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

// CSS
require("./CardShow.css");

function CardShow(props) {
  const [card, setCard] = useState({});
  let [redirect, setRedirect] = useState(null);
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

  const handleChange = (event) => {
    if(event.target.id === "prompt") {
      setCard(prevCard => {
        return {
          ...prevCard,
          prompt: event.target.value
        }
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/card/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card)
    })
    .then(() => setRedirect(redirect = "/playorcreate/create"))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    handleFetchThisCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="card-show-container">
      <header>
        <h3>Edit Your Cards</h3>
        <p>You can edit/update this card.</p>
      </header>
      <div className="card-show-wrapper">
        <h3>Update This Card</h3>
        <form onSubmit={handleSubmit}>
          <textarea 
            name="prompt" 
            id="prompt" 
            cols="30" 
            rows="10"
            value={`${card.prompt}`}
            onChange={handleChange}
            >
            </textarea>
          <button type="submit">Update Card</button>
        </form>
      </div>
    </div>
  )
}

export default CardShow;