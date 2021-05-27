// React
import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

// CSS
require("./CardShow.css");

function CardShow() {
  const [card, setCard] = useState({});
  let [redirect, setRedirect] = useState(null);
  const { id } = useParams();

  const handleFetchThisCard = () => {
    fetch(`https://pacific-mesa-89997.herokuapp.com/card/${id}`)
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
    fetch(`https://pacific-mesa-89997.herokuapp.com/card/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card)
    })
    .then(() => alert("This card has been updated"))
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
      <div className="card-show-shader">
        <header>
          <h3>Edit This Card</h3>
          <p>
            Here you can edit/update this card and it will be added back to the 
            deck with it's update.
          </p>
        </header>
        <div className="card-show-wrapper">
          <h3>Update This Card</h3>
          <form className="card-show-form" onSubmit={handleSubmit}>
            <textarea 
              name="prompt" 
              id="prompt" 
              cols="30" 
              rows="6"
              value={`${card.prompt}`}
              onChange={handleChange}
              >
              </textarea>
            <div className="card-show-form-btns">
              <button 
                className="card-show-form-btn"
                onClick={() => setRedirect(redirect = "/playorcreate/create")}
              >
                Cancel
              </button>
              <button className="card-show-form-btn" type="submit">Update Card</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CardShow;