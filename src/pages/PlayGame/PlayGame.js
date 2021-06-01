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
      const shuffledCards = shuffle(filteredCards);
      fetch("https://dog.ceo/api/breed/corgi/images")
      .then(response => response.json())
      .then(jsonData => {
        const corgis = jsonData.message;
        let randomCorgis = [];
        shuffledCards.forEach(card => {
          randomCorgis.push(corgis[Math.floor(Math.random() * corgis.length)])
        })
        randomCorgis.pop();
        // randomCorgis.push("https://images.unsplash.com/photo-1575844261401-d69721eb5044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80")
        // eslint-disable-next-line no-useless-escape
        randomCorgis.push("../../images/jeremysbirthday.png");
        const shuffledCorgis = shuffle(randomCorgis);
        setCards({
          index: cards.index,
          activeCard: shuffledCards[cards.index],
          deck: shuffledCards,
          corgis: shuffledCorgis,
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

  const imageURL = cards.corgis[cards.index];

  const divStyle = {
    backgroundImage: "url(" + imageURL + ")",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const active = true;

  return (
    <div className="playgame-container shadow">
      <div className="playgame-wrapper" style={divStyle}>
        <h1 className="playgame-deck-name">{props.partyName} Deck</h1>
        <div className={`playgame-wildcard ${active ? "wildcard-active" : null}`}>
          <div className="playgame-prompt-bg">
            <h4 className={`playgame-prompt ${active ? "hidden" : null}`}>
              {cards.activeCard ? cards.activeCard.prompt : "No cards have been created for this deck yet."}
            </h4>
            <h6 className={`playgame-author ${active ? "hidden" : null}`}>
              {cards.activeCard ? `Created by: ${cards.activeCard.author}` : null}
            </h6>
            <h4 className={`wildcard-rule-header ${!active ? "hidden" : null}`}>
              Make a Permenant Rule!
            </h4>
            <h6 className={`wildcard-rule-footer ${!active ? "hidden" : null}`}>
              A Majority of Players Have to Agree That The Rule is Fun and Fair
            </h6>
          </div>
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