import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Content from "./components/Content";
import ThemeChanger from './components/ThemeChanger';
import "./sass/style.scss";
import DateIndicator from "./calendar/indicators/DateIndicator";

// create and export the context
export const Context = createContext();

export default function App() {
  window.userFetch = window.userFetch || false;
  const [contextVal, setContext] = useState({
    user: false,
    myEvents: [],
    invitedEvents: [], //accepted = true
    allInvites: [], // accepted = null
    showNewEvent: false,
    showEditEvent: false,
    declinedInvitations: [], //accepted= false
    allUsers: [],
    colorTheme: '',
    header: {background:"", font: ""}
  });

  const updateContext = (updates) =>
    setContext({
      ...contextVal,
      ...updates,
    });

  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  useEffect(() => {
    (async () => {
      let result = await (await fetch("/api/login")).json();
      window.userFetch = true;
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
        {contextVal.user ? (
          <div className="App wrapper">
            <TopBar logout={logout} />
            <Sidebar
              toggle={toggleSidebar}
              logout={logout}
              isOpen={sidebarIsOpen}
            />
            <Content
              toggleSidebar={toggleSidebar}
              sidebarIsOpen={sidebarIsOpen}
              logout={logout}
            />
          </div>
        ) : (
          <div className="App wrapper">
            <Content />
          </div>
        )}
      </Router>
    </Context.Provider>
  
  );
}
