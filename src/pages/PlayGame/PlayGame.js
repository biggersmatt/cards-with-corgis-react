// React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// CSS
require("./PlayGame.css")

function PlayGame(props) {
  let [cards, setCards] = useState({
    index: 0,
    activeCard: {},
    deck: [],
    corgis: [],
  })
  let [redirect, setRedirect] = useState(null);

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
      fetch("https://dog.ceo/api/breed/corgi/images")
      .then(response => response.json())
      .then(jsonData => {
        const corgis = jsonData.message;
        setCards({
          index: cards.index,
          activeCard: shuffledCards[cards.index],
          deck: shuffledCards,
          corgis: corgis,
        })
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
        corgis: cards.corgis,
      })
    } else {
      alert("Out of Cards");
      setRedirect(redirect = "/playorcreate")
    }
  }

  if(redirect) {
    return <Redirect to={redirect} />
  }

  const imageURL = cards.corgis[Math.floor(Math.random() * cards.corgis.length)];

  const divStyle = {
    backgroundImage: "url(" + imageURL + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  };

  return (
    <div className="playgame-container">
      <h1>{props.partyName}</h1>
      <div className="playgame-wrapper" style={divStyle}>
        <div className="playgame-prompt-bg">
          <h4>{cards.activeCard ? cards.activeCard.prompt : "No cards have been created for this deck yet."}</h4>
          <h5>{cards.activeCard ? `Created by: ${cards.activeCard.author}` : null}</h5>
        </div>
      </div>
      {cards.activeCard ? 
        <button className="playgame-next-btn" onClick={handleNextCard}>Next</button>
        : <button className="playgame-next-btn" onClick={() => setRedirect(redirect = "/playorcreate/create")}>Create Cards</button>
      }
    </div>
  )
}

export default PlayGame;