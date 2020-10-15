import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register"

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}