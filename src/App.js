import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import infobox from './components/InfoBox';
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";
import Infobox from "./components/InfoBox";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      <div className="App wrapper">
        <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
      <Route path="/infobox" component={Infobox}></Route>
    </Router>
  );
};

export default App;
