import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ADR from "./pages/adr";
import Financials from "./pages/financials";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/financials" exact component={Financials} />
        <Route path="/ADR" exact component={ADR} />
      </Switch>
    </Router>
  );
}

export default App;
