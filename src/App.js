import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
    <div className="App">
      <h3>Hello world!</h3>
      <Switch>
      <Route path="/" exact component={Login}/>
      </Switch>
    </div>
    </Router>
  );
}