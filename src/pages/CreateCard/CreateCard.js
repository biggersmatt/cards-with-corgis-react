// React
import React, { useState } from "react";
// import { Redirect } from "react-router-dom";

// Components
import ExistingCard from "../../components/ExistingCard/ExistingCard";

// CSS
require("./CreateCard.css");

function CreateCard(props) {
  let [cardPage, setCardPage] = useState({
    prompt: "",
    existingCards: props.cards,
  })

  // let [redirect, setRedirect] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      prompt: cardPage.prompt,
      author: props.firstName,
      discard: false,
      partyId: props.userId,
    }
    fetch("http://localhost:4000/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
    .then(() => alert("New Card Created"))
    .then(() => {
      const addedCard = cardPage.existingCards;
      addedCard.push(newCard);
      setCardPage({
        prompt: "",
        existingCards: addedCard,
      })
    })
    .catch(err => console.log(err))
  }

  const handleChange = (event) => {
    if(event.target.id === "prompt") {
      setCardPage(prevCardPage => {
        return {
          ...prevCardPage,
          prompt: event.target.value,
        }
      })
    }
  }

  // if(redirect) {
  //   return <Redirect to={redirect} />
  // }

  return (
    <div className="create-card-container">
      <header>
        <h3>Welcome {props.firstName}</h3>
        <p>Create new cards for {props.partyName}</p>
        <p>Manage cards that you have already created.</p>
      </header>


      <form className="create-card-wrapper" onSubmit={handleSubmit}>
        <h3>Create a New Card</h3>
        <textarea 
          name="prompt" 
          id="prompt" 
          value={cardPage.prompt}
          cols="30" 
          rows="10"
          onChange={handleChange}
          >
          </textarea>
        <button type="submit">Create Card</button>
      </form>

      <div className="manage-cards-wrapper">
      <h3>{props.firstName}'s Cards</h3>
        <div className="manage-cards">
          {cardPage.existingCards.map(card => {
            return <ExistingCard 
                      key={card._id}
                      prompt={card.prompt}
                  />
            // return (
            //   <div className="manage-this-card" key={card._id}>
            //     <p>{card.prompt}</p>
            //     <button>Edit</button>
            //     <button>Delete</button>
            //   </div>
            // )
          })}
        </div>
      </div>
    </div>
  )
}

export default CreateCard;