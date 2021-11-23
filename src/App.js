import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './Create';
import EntryDetails from './EntryDetails';
import NotFound from './NotFound';
import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';
import ProgressPage from './ProgressPage';

function App() {
// npm start
 // npx json-server --watch data/db.json --port 8000

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route path = "/create">
            <Create/>
          </Route>
          <Route path = "/entries/:id">
            <EntryDetails/>
          </Route>
          <Route path = "/history">
            <HistoryPage/>
          </Route>
          <Route path = "/profile">
            <ProfilePage/>
          </Route>
          <Route path = "/progress">
            <ProgressPage/>
          </Route>
          <Route path = "*">
            <NotFound />
          </Route>
        </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
