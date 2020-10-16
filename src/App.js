import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalendarView from './calendar/CalendarView';

export default function App() {
  return (

    <Router>
      <div>
        <div className="container">
          <Route exact path="/home" component={CalendarView} />
        </div>

      </div>
    </Router>

  );
}