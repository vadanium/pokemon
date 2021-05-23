/** @jsxImportSource @emotion/react */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { POKEMON } from '../graphql/PokemonQuery'
import HeaderContent from '../components/pokemon-detail/HeaderContent'
import DetailContent from '../components/pokemon-detail/DetailContent'
import CatchPokemon from '../components/pokemon-detail/CatchPokemon'
import NoMatch from './NoMatch'
import Header from '../components/template/Header'

// create context for pokemon detail from api
export const PokemonContext = React.createContext()
// base color
export const BaseColorContext = React.createContext()

export default function PokemonDetail() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { pokemonName } = useParams();

    const { loading, error, data } = useQuery(POKEMON, {
        variables: {
            name: pokemonName,
        },
    });

    // box color
    const color = [
        '#47cfaf',
        '#fb6c6c',
        '#76bdfe',
        '#fed36a'
    ];

    const baseColor = color[Math.floor(Math.random() * 4)];
    
    return (
        <>
            <PokemonContext.Provider value={{ loading, error, data }}>
                <BaseColorContext.Provider value={ baseColor }>
                    <Header />
                    <HeaderContent />
                    <DetailContent />
                    <CatchPokemon />
                </BaseColorContext.Provider>
            </PokemonContext.Provider>

            {error &&
                <NoMatch />}
        </>
    )
}
