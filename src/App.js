<<<<<<< HEAD
import React from 'react';
import CalendarMonth from './calendar/CalendarMonth';
import CalendarWeek from './calendar/CalendarWeek';
import CalendarDay from './calendar/CalendarDay';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register"
=======
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
>>>>>>> dev

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
<<<<<<< HEAD
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/weeks" component={CalendarWeek} />
          <Route path="/day" component={CalendarDay} />
        
          <Route exact path="/home" component={CalendarMonth} />
  
        
        
        </Switch>
=======
      <div className="App wrapper">
        <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
>>>>>>> dev
      </div>
    </Router>
  );
};

export default App;
