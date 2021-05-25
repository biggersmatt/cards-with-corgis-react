// React
import { useState, useEffect } from "react";

// CSS
require("./PlayGame.css")

function PlayGame(props) {
  let [cards, setCards] = useState({
    index: 0,
    activeCard: {},
    deck: [],
    discard: [],
  })

  useEffect(() => {
    handleAllCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const handleAllCards = () => {
    fetch("http://localhost:4000/card")
    .then(response => response.json())
    .then(jsonData => {
      const allCards = jsonData.allCards;
      let filteredCards = [];
      allCards.forEach(card => {
        if(card.partyId === props.userId) {
          filteredCards.push(card);
        }
      })
      const shuffledCards = shuffle(filteredCards);
      setCards({
        index: cards.index,
        activeCard: shuffledCards[cards.index],
        deck: shuffledCards,
      })
    })
    .catch(err => console.log(err));
  }

  const handleNextCard = () => {
    if(cards.deck.length - 1 > cards.index) {
      let newIndex = cards.index + 1;
      setCards({
        index: newIndex,
        activeCard: cards.deck[newIndex],
        deck: cards.deck,
      })
    } else {
      alert("Out of Cards");
    }
  }

  return (
    <div className="playgame-container">
      <h1>"Party Name"</h1>
      <div className="playgame-wrapper">
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, qui?</h4>
        <h5 className="playgame-author">Created By: "firstName"</h5>
      </div>
      <button className="playgame-next-btn" onClick={handleNextCard}>Next</button>
    </div>
  )
}

export default PlayGame;