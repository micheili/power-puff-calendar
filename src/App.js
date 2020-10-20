import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";

export default function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    (async () => {
      const result = await (await fetch("/api/login")).json();
      if (!result.error) {
        setLoggedInUser(result);
      } else {
        setLoggedInUser({});
      }
    })();
  }, [loggedInUser]);

  async function logout() {
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    const result = await res.json();
    console.log(result);
  }

  return (
    <Router>
      <div className="App wrapper">
        <Sidebar
          toggle={toggleSidebar}
          isOpen={sidebarIsOpen}
          loggedInUser={loggedInUser}
        />
        <Content
          toggleSidebar={toggleSidebar}
          sidebarIsOpen={sidebarIsOpen}
          logout={logout}
        />
      </div>
    </Router>
  );
}
