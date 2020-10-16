import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Invitation from "./components/Invitation";

export default function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/invites" component={Invitation}/>
        </Switch>
      </div>
    </Router>
  );
}
