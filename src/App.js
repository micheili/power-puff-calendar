import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Calendar from './components/Calendar.js';
import Infobox from './components/Infobox.js';

export default function App() {

  return (
    <Router>
     
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path='/calendar' exact component={Calendar}/>
          <Route path='/infobox' exact component={Infobox}/>
        </Switch>
        </div>
    </Router>
  );
}
