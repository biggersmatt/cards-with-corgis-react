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
    total: "",
  })

  const addedNewCard = () => {
    console.log("addedNewCard RAN")
    let updatedTotal = user.total + 1;
    setUser({
      userId: user.userId,
      firstName: user.firstName,
      partyName: user.partyName,
      total: updatedTotal,
    })
  }

  const deleteCard = () => {
    console.log("deleteCard RAN")
    let updatedTotal = user.total - 1;
    setUser({
      userId: user.userId,
      firstName: user.firstName,
      partyName: user.partyName,
      total: updatedTotal,
    })
  }

  const handleUserInfo = (userId, firstName, partyName) => {
    let filteredTotal = "";
    fetch("https://pacific-mesa-89997.herokuapp.com/card")
    .then(response => response.json())
    .then(jsonData => {
      const allCards = jsonData.allCards;
      let filteredCards = [];
      allCards.forEach(card => {
        if(card.partyId === userId) {
          filteredCards.push(card);
        }
      })
      filteredTotal = filteredCards.length;
    })
    .then(() => {
      setUser({
        userId,
        firstName,
        partyName,
        total: filteredTotal,
      })
    })
    .catch(err => console.log(err));
  }

  const handleSignOut = () => {
    setUser({
      userId: "",
      firstName: "",
      partyName: "",
      total: "",
    })
    alert("You have signed out")
  }

  return (
    <div className="wrapper">
      <Navbar userId={user.userId} handleSignOut={handleSignOut}></Navbar>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Login handleUserInfo={handleUserInfo}></Login>
          </Route>
          <Route path="/createparty">
            <CreateParty></CreateParty>
          </Route>
          <Route path="/playorcreate/play">
            <PlayGame userId={user.userId} partyName={user.partyName}></PlayGame>
          </Route>
          <Route path="/playorcreate/create/:id">
            <CardShow></CardShow>
          </Route>
          <Route path="/playorcreate/create">
            <CreateCard  deleteCard={deleteCard} addedNewCard={addedNewCard} userId={user.userId} firstName={user.firstName} partyName={user.partyName}></CreateCard>
          </Route>
          <Route path="/playorcreate">
            <PlayOrCreate userId={user.userId} firstName={user.firstName} partyName={user.partyName} total={user.total}></PlayOrCreate>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
