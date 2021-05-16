import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import CreateParty from "./pages/CreateParty/CreateParty";
import PlayOrCreate from "./pages/PlayOrCreate/PlayOrCreate";

import "./App.css";

function App() {
  return (
    <div>
      <h1>Cards With Corgis</h1>
      <div>
        <Switch>
          <Route exact path="/">
            <Login></Login>
          </Route>
          <Route path="/createparty">
            <CreateParty></CreateParty>
          </Route>
          <Route path="/playorcreate">
            <PlayOrCreate></PlayOrCreate>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
