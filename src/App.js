import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";

// create and export the context
export const Context = createContext();

export default function App() {
  const [contextVal, setContext] = useState({ user: false });

  const updateContext = (updates) =>
    setContext({
      ...contextVal,
      ...updates,
    });

  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  //const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    (async () => {
      let result = await (await fetch("/api/login")).json();
      if (result.error) {
        updateContext({ user: false });
        return;
      }
      // add the user data to the context variable
      updateContext({ user: result });
      console.log(contextVal.user);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function logout() {
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    updateContext({ user: false });
    const result = await res.json();
    console.log(result);
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <Router>
        <div className="App wrapper">
          <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
          <Content
            toggleSidebar={toggleSidebar}
            sidebarIsOpen={sidebarIsOpen}
            logout={logout}
            
          />
          
        </div>
        
      </Router>
    </Context.Provider>
  );
}
