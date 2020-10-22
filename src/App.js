import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";
import Infobox from "./components/InfoBox";

// create and export the context
export const Context = createContext();

export default function App() {
  const [contextVal, setContext] = useState({});

  const updateContext = (updates) =>
    setContext({
      ...contextVal,
      ...updates,
    });

  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  //const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    updateContext({ waiting: true });
    (async () => {
      let result = await (await fetch("/api/login")).json();
      updateContext({ waiting: false });
      if (result.error) {
        return;
      }
      // add the user data to the context variable
      updateContext({ user: result });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   (async () => {
  //     const result = await (await fetch("/api/login")).json();
  //     if (!result.error) {
  //       updateContext({ currentUser: result });
  //       console.log(contextVal.currentUser);
  //     } else {
  //       updateContext({ currentUser: {} });
  //       return;
  //     }
  //   })();
  // }, [contextVal]);

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
          <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
          <Content
            toggleSidebar={toggleSidebar}
            sidebarIsOpen={sidebarIsOpen}
            logout={logout}
          />
        </div>
        <Route path="/infobox" component={Infobox}></Route>
      </Router>
    </Context.Provider>
  );
}
