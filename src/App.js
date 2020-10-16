import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalendarView from './CalendarView';

export default function App() {
  return (

    <Router>
    <div>
           
      <Route exact path="/"  component={CalendarView} />

    </div>
    </Router>

  );
}