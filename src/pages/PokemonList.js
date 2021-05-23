/** @jsxImportSource @emotion/react */
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from '../components/template/Header'

// componets
// get pokemons list
import GetPokemons from '../components/pokemon-list/InfinitePokemons'

// page
// pokemon detail
import PokemonDetail from './PokemonDetail'

export default function PokemonList() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    const { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <Header />
                    <div className="container">
                        <h2>Pokemons</h2>

                        <GetPokemons />
                    </div>
                </Route>
                <Route path={`${path}/:pokemonName`}>
                    <PokemonDetail />
                </Route>
            </Switch>
        </div>
    )
}