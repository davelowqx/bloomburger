import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ADR from "./pages/Adr";
import Comps from "./pages/Comps";
import Home from "./pages/Home";
import Sentiment from "./pages/Lists/Sentiment";
import Sectors from "./pages/Lists/Sectors";
import Currencies from "./pages/Lists/Currencies";
import Commodities from "./pages/Lists/Commodities";
import Crypto from "./pages/Lists/Crypto";
// import Personal from "./pages/Lists/Personal";
import Indices from "./pages/Lists/Indices";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/indices" exact component={Indices} />
        <Route path="/comps" exact component={Comps} />
        <Route path="/sectors" exact component={Sectors} />
        <Route path="/currencies" exact component={Currencies} />
        <Route path="/commodities" exact component={Commodities} />
        <Route path="/crypto" exact component={Crypto} />
        <Route path="/adr" exact component={ADR} />
        <Route path="/sentiment" exact component={Sentiment} />
        {/* <Route path="/personal" exact component={Personal} /> */}
      </Switch>
    </Router>
  );
}

export default App;
