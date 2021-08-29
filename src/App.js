import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ADR from "./pages/adr";
import Comps from "./pages/comps";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/comps" exact component={Comps} />
        <Route path="/ADR" exact component={ADR} />
      </Switch>
    </Router>
  );
}

export default App;
