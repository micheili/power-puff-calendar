import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";

// create and export the context
export const Context = createContext();

export default function App() {
  const [contextVal, setContext] = useState({
    currentUser: {},
  });

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
      const result = await (await fetch("/api/login")).json();
      if (!result.error) {
        updateContext({ currentUser: result });
      } else {
        updateContext({ currentUser: {} });
        return;
      }
    })();
  }, [contextVal]);

  async function logout() {
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    const result = await res.json();
    console.log(result);
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <Router>
        <div className="App wrapper">
          <Sidebar
            toggle={toggleSidebar}
            isOpen={sidebarIsOpen}
            //loggedInUser={loggedInUser}
          />
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
