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
            <CreateCard></CreateCard>
          </Route>
          <Route path="/playorcreate">
            <PlayOrCreate userId={user.userId} firstName={user.firstName} partyName={user.partyName}></PlayOrCreate>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
