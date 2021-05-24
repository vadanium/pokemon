import './assets/scss/style.scss'
import React, { useState } from 'react'
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
import Header from './components/template/Header'

export const RefreshCountPokemon = React.createContext()

function App() {
  // for update my pokemon number on header
  const [countPokemon, setCountPokemon] = useState(true)
  const refreshCountPokemon = () => {
      setCountPokemon(!countPokemon)
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <RefreshCountPokemon.Provider value={refreshCountPokemon}>
        <Header />
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
      </RefreshCountPokemon.Provider>
    </Router>
  );
}

export default App;
