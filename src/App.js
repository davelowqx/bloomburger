import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ADR from "./pages/Adr";
import Comps from "./pages/Comps";
import Home from "./pages/Home";
import Sentiment from "./pages/Sentiment";
import Sectors from "./pages/Sectors";
import Currencies from "./pages/Currencies";
import Commodities from "./pages/Commodities";
import Crypto from "./pages/Crypto";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/comps" exact component={Comps} />
        <Route path="/sectors" exact component={Sectors} />
        <Route path="/currencies" exact component={Currencies} />
        <Route path="/commodities" exact component={Commodities} />
        <Route path="/crypto" exact component={Crypto} />
        <Route path="/adr" exact component={ADR} />
        <Route path="/sentiment" exact component={Sentiment} />
      </Switch>
    </Router>
  );
}

export default App;
