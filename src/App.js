// Dependencies
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login/Login";
import CreateParty from "./pages/CreateParty/CreateParty";
import PlayOrCreate from "./pages/PlayOrCreate/PlayOrCreate";
import PlayGame from "./pages/PlayGame/PlayGame";
import CreateCard from "./pages/CreateCard/CreateCard";
import CardShow from "./pages/CardShow/CardShow";

// Components
import Navbar from "./components/Navbar/Navbar";

// CSS
import "./App.css";

function App() {
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    partyName: "",
    cards: [],
  })

  const handleUserInfo = (userId, firstName, partyName) => {
    fetch("http://localhost:4000/card")
    .then(response => response.json())
    .then(jsonData => {
      const allCards = jsonData.allCards;
      let filteredCards = [];
      allCards.forEach(card => {
        if(card.partyId === userId && card.author === firstName) {
          filteredCards.push(card);
        }
      })
      setUser({
        userId,
        firstName,
        partyName,
        cards: filteredCards,
      })
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Switch>
          <Route exact path="/">
            <Login handleUserInfo={handleUserInfo}></Login>
          </Route>
          <Route path="/createparty">
            <CreateParty></CreateParty>
          </Route>
          <Route path="/playorcreate/play">
            <PlayGame></PlayGame>
          </Route>
          <Route path="/playorcreate/create/:id">
            <CardShow></CardShow>
          </Route>
          <Route path="/playorcreate/create">
            <CreateCard userId={user.userId} firstName={user.firstName} partyName={user.partyName} cards={user.cards}></CreateCard>
          </Route>
          <Route path="/playorcreate">
            <PlayOrCreate firstName={user.firstName} partyName={user.partyName}></PlayOrCreate>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
