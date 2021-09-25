import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ADR from "./pages/Adr";
import Comps from "./pages/Comps";
import Home from "./pages/Home";
import Sentiment from "./pages/Sentiment";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/comps" exact component={Comps} />
        <Route path="/adr" exact component={ADR} />
        <Route path="/sentiment" exact component={Sentiment} />
      </Switch>
    </Router>
  );
}

export default App;
