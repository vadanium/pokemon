import './assets/scss/style.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
// pages
import Home from './pages/Home';
import PokemonList from './pages/PokemonList'
import MyPokemon from './pages/MyPokemon'
import Credit from './pages/Credit'
import NoMatch from './pages/NoMatch'

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon">
            <PokemonList />
          </Route>
          <Route path="/my-pokemon">
            <MyPokemon />
          </Route>
          <Route path="/credit">
            <Credit />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
