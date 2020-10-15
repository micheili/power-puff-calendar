import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Event from './Event.js'

export default function App() {

  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    const events = (await (await fetch("api/event")).json());
    setEvents(events);
    console.log('har hämtat events ', events);
  }

  //kör när det startas, bara en gång
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* 
          //Add your routes and component names here!
          <Route exact path="/" component={} />
          <Route exact path="/invitations" component={} />
          <Route path="/event" component={} />
          <Route path="/event/:id" component={} /> 
        */}
        </Switch>

        <div className="container">
          <div className="row mt-5">
            <div className="col-12 w-100">
              <h1>HellO!</h1>
              <h3>check to see if your database work..</h3>
              <div className="row mt-5">
              <h2>Events:</h2>
                <div className="col-12">
                  {events.map((event) => {
                    return <Event key={event.eventId} {...event}/>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}
