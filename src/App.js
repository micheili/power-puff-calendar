import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./sass/style.scss";

// create and export the context
export const Context = createContext();

export default function App() {
  const [contextVal, setContext] = useState({
    user: false,
    myEvents: [],
    invitedEvents: [],
    allInvites: [],
    showNewEvent: false,
    declinedInvitations: [],
    allUsers: [],
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
      let result = await (await fetch("/api/login")).json();
      if (result.error) {
        updateContext({ user: false });
        return;
      }
      let events = await (await fetch("/api/myEvents/" + result.id)).json();
      if (events.error) {
        events = [];
      }

      let users = await (await fetch("/api/user")).json();
      if (users.error) {
        users = [];
      }

      let invitedEvents = await (
        await fetch("/api/invitedEvents/" + result.id + "?accepted=true")
      ).json();
      if (invitedEvents.error) {
        invitedEvents = [];
      }

      let declinedInvitations = await (
        await fetch("/api/invitedEvents/" + result.id + "?accepted=false")
      ).json();
      if (declinedInvitations.error) {
        declinedInvitations = [];
      }

      let allInvites = await (
        await fetch("/api/invitedEvents/" + result.id + "?accepted=null")
      ).json();
      if (allInvites.error) {
        allInvites = [];
      }
      // add the user data to the context variable
      updateContext({
        user: result,
        myEvents: events,
        invitedEvents: invitedEvents,
        allUsers: users,
        allInvites: allInvites,
        declinedInvitations: declinedInvitations,
      });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function logout() {
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    updateContext({
      user: false,
      allUsers: [],
      allInvites: [],
      myEvents: [],
      invitedEvents: [],
      declinedInvitations: [],
    });
    const result = await res.json();
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
