import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ADR from "./pages/adr";
import Financial from "./pages/financial";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ADR" exact component={ADR} />
        <Route path="/financial" exact component={Financial} />
      </Switch>
    </Router>
  );
}

export default App;
