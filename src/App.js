import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register"

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      <div className="App wrapper">
        <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />     
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path='/infobox' exact component={Infobox}/>
        </Switch>
        </div>
    </Router>
  );
};

export default App;
