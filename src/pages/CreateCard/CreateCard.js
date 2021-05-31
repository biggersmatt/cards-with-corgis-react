// React
import React, { useState, useEffect } from "react";

// Components
import ExistingCard from "../../components/ExistingCard/ExistingCard";

// CSS
require("./CreateCard.css");


function CreateCard(props) {
  let [cardPage, setCardPage] = useState({
    prompt: "",
    existingCards: [],
  })

  useEffect(() => {
    handleExistingCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  let stringSimilarity = require("string-similarity");

  const handleExistingCards = () => {
    let filteredCards = [];
    fetch("https://pacific-mesa-89997.herokuapp.com/card")
    .then(response => response.json())
    .then(jsonData => {
      const allCards = jsonData.allCards;
      allCards.forEach(card => {
        if(card.partyId === props.userId && card.author === props.firstName) {
          filteredCards.push(card);
        }
      })
      filteredCards.reverse();
    })
    .then(() => setCardPage({
      existingCards: filteredCards,
      prompt: "",
    }))
    .catch(err => console.log(err));
  }

  const handleSimilarityCheck = (filteredCards) => {
    for(let i = 0; i < filteredCards.length; i++) {
      let similarity = stringSimilarity.compareTwoStrings(filteredCards[i].prompt, cardPage.prompt);
      if(similarity >= 0.8) {
        console.log("Over 80% similarity between your card and another card in the deck")
        return true;
      }
    }
    return false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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
      const similar = handleSimilarityCheck(filteredCards);
      if(cardPage.prompt && !similar) {
        const newCard = {
          prompt: cardPage.prompt,
          author: props.firstName,
          discard: false,
          partyId: props.userId,
        }
        fetch("https://pacific-mesa-89997.herokuapp.com/card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        })
        .then(() => alert("New Card Created"))
        .then(() => props.addedNewCard())
        .then(() => handleExistingCards())
        .catch(err => console.log(err))
      } else if(similar) {
        alert("This card is too similar to one already in the deck. Be more unique!")
      } else {
        alert("Cannot Create a Card Without Text.")
      }
    })
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

  return (
    <div className="create-card-container">
      <div className="create-card-shader">
        <header className="create-card-header">
          <h3>Welcome {props.firstName}</h3>
          <p>Create new cards for your deck, {props.partyName}</p>
        </header>
        <form className="create-card-wrapper" onSubmit={handleSubmit}>
          <h3>Create a New Card</h3>
          <textarea 
            name="prompt" 
            id="prompt" 
            value={cardPage.prompt}
            cols="30" 
            rows="4"
            onChange={handleChange}
            >
            </textarea>
          <button type="submit">Create Card</button>
        </form>
        <div className="manage-cards-wrapper">
          <h3>{props.firstName}'s Created Cards</h3>
          <p>Total: {cardPage.existingCards.length}</p>
          <div className="manage-cards">
            {cardPage.existingCards.map(card => {
              return <ExistingCard 
                        key={card._id}
                        cardId={card._id}
                        prompt={card.prompt}
                        handleExistingCards={handleExistingCards}
                        deleteCard={props.deleteCard}
                      />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCard;