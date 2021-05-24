/** @jsxImportSource @emotion/react */
import { Route, Switch, useRouteMatch } from 'react-router-dom'

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
                    <div className="container" css={{marginTop: 80}}>
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