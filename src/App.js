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
  })

  const handleUserInfo = (userId, firstName, partyName) => {
    setUser({
      userId,
      firstName,
      partyName,
    })
  }

  const handleSignOut = () => {
    setUser({
      userId: "",
      firstName: "",
      partyName: "",
    })
    alert("You have signed out")
  }

  return (
    <div>
      <Navbar userId={user.userId} handleSignOut={handleSignOut}></Navbar>
      <div>
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
            <CreateCard userId={user.userId} firstName={user.firstName} partyName={user.partyName}></CreateCard>
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
