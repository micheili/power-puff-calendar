import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register"

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
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}
