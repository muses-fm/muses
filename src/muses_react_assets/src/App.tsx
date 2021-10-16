import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Curator from "./pages/Curator";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/artist">
          <Artist />
        </Route>
        <Route path="/curator">
          <Curator />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
