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
    wildcardIndexArray: [],
    hasWilds: true,
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
    let activeCard = {};
    let deck = [];
    let corgis = [];
    let wildcardIndexArray = [];
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
      deck = shuffle(filteredCards);
      activeCard = deck[cards.index];
      fetch("https://dog.ceo/api/breed/corgi/images")
      .then(response => response.json())
      .then(jsonData => {
        const corgiAPI = jsonData.message;
        let randomCorgis = [];
        deck.forEach(card => {
          randomCorgis.push(corgiAPI[Math.floor(Math.random() * corgiAPI.length)])
        })
        randomCorgis.pop();
        // randomCorgis.push("https://images.unsplash.com/photo-1575844261401-d69721eb5044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80")
        // eslint-disable-next-line no-useless-escape
        randomCorgis.push("../../images/jeremysbirthday.png");
        corgis = shuffle(randomCorgis);

      })
      .then(() => {
        setCards({
          index: cards.index,
          activeCard,
          deck,
          corgis,
          hasWilds: false,
        })
      })
      .catch(err => console.log(err));
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
        wildcardIndexArray: cards.wildcardIndexArray,
        hasWilds: true,
      })
    } else {
      alert("Out of Cards");
      setRedirect(redirect = "/playorcreate")
    }
  }

  
  const handleWildCardGenerator = () => {
    const cardsInDeckMinimum = 4;
    const wildcardIndexArray = [];
    const numberOfWildcards = Math.floor(cards.deck.length / cardsInDeckMinimum);
    for(let i = 0; i < numberOfWildcards; i++) {
      const randomIndex = Math.floor(Math.random() * (cards.deck.length - 0) + 0);
      wildcardIndexArray.push(randomIndex);
    }
    setCards({
      index: cards.index,
      activeCard: cards.activeCard,
      deck: cards.deck,
      corgis: cards.corgis,
      wildcardIndexArray,
      hasWilds: true,
    })
  }
  
  if(cards.deck.length !== 0 && !cards.hasWilds) {
    handleWildCardGenerator();
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
  
  const active = false;

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
              !!! WILD CARD !!! <br/> Make a Permanent Rule!
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