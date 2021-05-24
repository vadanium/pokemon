/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/utils/Modal'
import { RefreshCountPokemon } from '../App'

export default function MyPokemon() {
    const refreshCountPokemon = useContext(RefreshCountPokemon)
    const myPokemon = JSON.parse(localStorage.getItem('myPokemon') || '[]')
    const [pokemonList, setPokemonList] = useState(myPokemon)
    const [showModal, setShowModal] = useState()
    const [pokeRelease, setDelete]  = useState()

    // box color
    const color = useMemo(() => [
        '#47cfaf',
        '#fb6c6c',
        '#76bdfe',
        '#fed36a'
    ], [])

    const handleRemove = (id, name) => {
        // setPokemonList(pokemons)
        setShowModal(1)
        setDelete({ id: id, name: name })
    }

    const removePokemon = () => {
        const pokemons =  myPokemon.filter(item => {
            item.pokemons = item.pokemons.filter(poke => poke.name !== pokeRelease.name)
            if(!item.pokemons.length) return false
            return item
        })

        localStorage.setItem('myPokemon', JSON.stringify(pokemons))
        setPokemonList(pokemons)
        setShowModal(0)
        refreshCountPokemon()
    }

    const breakpoints = [576, 768, 992, 1200]

    const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
    )

    const buttonStyle = {
        width: 150,
        margin: 15,
        border: 'none',
        height: 50,
        fontSize: 24,
        fontFamily: 'inherit',
        borderRadius: 5,
        color: '#fff',
        cursor: 'pointer'
    }

    const buttonReleaseStyle = {
        border: 'none',
        fontFamily: 'inherit',
        borderRadius: 5,
        cursor: 'pointer',
        backgroundColor: '#fb6c6c',
        color: '#fff',
        fontSize: 18,
        '&:hover': {
            backgroundColor: '#e24d4d'
        }
    }

    const row = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 15
    }
    const col6 = {
        flex: '0 0 auto',
        width: '100%',
        [mq[2]]: {
            width: '50%'
        }
    }

    return (
        <>
            <div className="container" css={{ marginTop: 80, padding: 15 }}>
                <div css={row}>
                    {[...Array(2).keys()].map(x => (
                        <div key={x} css={col6}>
                            {pokemonList.map((item, y) => (
                                (y%2) === x &&
                                <div key={ item.id } css={{padding: 15}}>
                                    <div css={{ height: 100, backgroundColor: color[Math.floor(Math.random() * 4)], borderRadius: '8px 8px 0 0' }}>
                                        <div css={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <div><img src={ item.image } alt={ item.name } /></div>
                                            </div>
                                            <Link to={'/pokemon/'+item.name } css={{ paddingLeft: 15, fontSize: 28, fontWeight: 700, textTransform: 'capitalize', color: '#3a3a3a' }}>{ item.name }</Link>
                                        </div>
                                    </div>
                                    <div css={{backgroundColor: '#f9f9f9', borderRadius: '0 0 8px 8px', overflow: 'hidden'}}>
                                        {item.pokemons.map(poke => (
                                            <div key={ poke.name } css={{ padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
                                                <span css={{textTransform: 'capitalize', fontSize: 18}}>{ poke.name }</span>
                                                <button css={buttonReleaseStyle} onClick={ () => handleRemove(item.id, poke.name) }>Release</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                {showModal === 1 &&
                <Modal show={ showModal }>
                    <div css={{ textAlign: 'center' }}>
                        <h4 css={{ marginBottom: 15, fontSize: 24 }}>Are you sure release { pokeRelease.name }?</h4>
                        <div>
                            <button css={{...buttonStyle, backgroundColor: '#47cfaf',}} onClick={ removePokemon }>Yes</button>
                            <button css={{...buttonStyle, backgroundColor: '#fb6c6c',}} onClick={ () => setShowModal(0) }>No</button>
                        </div>
                    </div>
                </Modal>}

                {!pokemonList.length &&
                    <div css={{textAlign: 'center', fontSize: 18}}>
                        <h4>Catch more pokemon</h4>
                    </div>}
            </div>
        </>
    )
}
