/** @jsxImportSource @emotion/react */
import React, { useContext, useRef, useState } from 'react'
import { css, keyframes } from '@emotion/react'
import { PokemonContext } from '../../pages/PokemonDetail'
import { RefreshCountPokemon } from '../../App'
import Modal from '../../components/utils/Modal'

import pokeballImgClose from '../../assets/img/pokeball-close.png'
import pokeballImgOpen from '../../assets/img/pokeball-open.png'

export default function CatchPokemon() {
    // get pokemon data
    const { loading, error, data, baseColor } = useContext(PokemonContext)
    const refreshCountPokemon = useContext(RefreshCountPokemon)

    const [isCatching, setIsCatching] = useState()
    const [openBall, setOpenBall] = useState()
    const [modalResult, setModalResult] = useState()
    const [catchResult, setCatchResult] = useState()
    const [pokemonName, setPokemonName] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const nameRef = useRef(null)

    const probability = n => {
        return !!n && Math.random() <= n
    }

    const throwBall = () => {
        if(isCatching) return false

        setIsCatching(1)
    }

    const catchPoke = () => {
        setOpenBall(1)

        // 50% probability
        const result = probability(.5)

        if(result) {
            setCatchResult(1)
        } else {
            setCatchResult(0)
        }
        setTimeout(() => setModalResult(1), 300)
    }

    const savePokemon = () => {
        if(!catchResult) return { status: 1, message: 'failed' }

        const getPokemons = localStorage.getItem('myPokemon') || '[]'
        let pokemons = JSON.parse(getPokemons)
        const filterId = pokemons.filter((item) => item.id === data.pokemon.id)
        const filterName = pokemons.filter(item => item.pokemons.filter(pokemon => pokemon.name === pokemonName).length)

        // filter name
        if(filterName.length) return { status: 0, message: 'Name already taken, please select another one' }

        // add new data if pokemon id not found
        if(! filterId.length) {
            pokemons = [
                ...pokemons,
                {
                    id: data.pokemon.id,
                    name: data.pokemon.name,
                    image: data.pokemon.sprites.front_default,
                    pokemons: [
                        {
                            name: pokemonName
                        }
                    ]
                }
            ]

            localStorage.setItem('myPokemon', JSON.stringify(pokemons))
            return { status: 1, message: 'success' }
        }

        // save to local based on id
        filterId.map(item => {
            if(item.id === data.pokemon.id) {
                item.pokemons = [
                    ...item.pokemons,
                    {
                        name: pokemonName
                    }
                ]
            }
            return {...item, item}
        })

        localStorage.setItem('myPokemon', JSON.stringify(pokemons))
        return { status: 1, message: 'success' }
    }

    const addPokemon = () => {
        if(!pokemonName) return setErrorMessage('Name required')

        const save = savePokemon()
        if(!save.status) return setErrorMessage(save.message)

        reset()
        refreshCountPokemon()
    }

    const nameOnChange = () => {
        const getPokemons = localStorage.getItem('myPokemon') || '[]'
        let pokemons = JSON.parse(getPokemons)

        // filter
        const filterName = pokemons.filter(item => item.pokemons.filter(pokemon => pokemon.name === nameRef.current.value).length)

        setPokemonName(nameRef.current.value)

        if(filterName.length) return setErrorMessage('Name already taken, please select another one')
        if(errorMessage) setErrorMessage('')
    }

    const reset = () => {
        setModalResult(0)
        setIsCatching(0)
        setOpenBall(0)
        setErrorMessage('')
    }

    const s_defaultAnim = keyframes`
            0%, 50%, 80% {
                transform: translate3d(0,0,0);
            }
            90% {
                transform: translate3d(0,-4px,0);
            }
        `

    const s_throwAnim = keyframes`
            0% {
                bottom: 20px;
            }
            30% {
                transform: translate3d(10%, 0, 0);
            }
            60% {
                bottom: 60%;
                transform: translate3d(-60%, 0, 0) rotate(150deg);
            }
            70% {
                transform: translate3d(-80%, 100%, 0) rotate(160deg);
            }
            75% {
                transform: translate3d(-90%, 50%, 0) rotate(180deg);
            }
            80% {
                transform: translate3d(-100%, 100%, 0) rotate(200deg);
            }
            85% {
                transform: translate3d(-120%, 80%, 0) rotate(270deg);
            }
            100% {
                bottom: 60%;
                transform: translate3d(-150%, 100%, 0) rotate(350deg);
            }
        `

    const s_ball = css`
        width: 100px;
        height: 100px;
        padding: 0;
        background-color: transparent;
        border: none;
        background: url(${pokeballImgClose}) 0 0 no-repeat;
        cursor: pointer;
    `
    let s_pokeball = isCatching ? s_ball : css`${s_ball}; animation: ${s_defaultAnim} 2s ease-in infinite;`
    if(openBall) s_pokeball = css`${s_pokeball}; background: url(${pokeballImgOpen}) 0 0 no-repeat;`

    const s_ballBox = css`
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
    `
    const s_thorwBallAnim = isCatching ? css`${s_ballBox}; animation: ${s_throwAnim} 1s ease forwards;` : s_ballBox

    const btnStyle = {
        width: '100%',
        border: 'none',
        height: 50,
        fontSize: 24,
        fontFamily: 'inherit',
        backgroundColor: baseColor,
        borderRadius: 5,
        cursor: 'pointer'
    }

    return (
        <div>
            {data && !loading && !error &&
                <>
                    <div css={ s_thorwBallAnim } onAnimationEnd={ catchPoke }>
                        <button css={ s_pokeball } onClick={ throwBall }></button>
                    </div>

                    <Modal show={ modalResult }>
                        {!catchResult &&
                            <div>
                                <h3 css={{ paddingBottom: 15 }}>{ data.pokemon.name } managed to escape</h3>
                                <p css={{ paddingBottom: 50, fontSize: 18 }}>I won't give up!</p>
                                <button css={btnStyle} onClick={ reset }>Not Today</button>
                            </div>
                        }

                        {catchResult === 1 &&
                            <>
                            <div>
                                <h3 css={{ paddingBottom: 15 }}>Big Catch</h3>
                                <h4 css={{ paddingBottom: 50 }}> was caught { data.pokemon.name }</h4>

                                <label css={{ paddingBottom: 15, display: 'block' }}>Pick a name</label>
                                <input name="pokemon_name" css={{
                                    width: '100%',
                                    height: 50,
                                    marginBottom: 15,
                                    padding: '0 15px',
                                    fontSize: 24,
                                    fontFamily: 'inherit',
                                    fontWeight: 700,
                                    borderRadius: 5,
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: '#f3f3f3'
                                }} ref={ nameRef } onChange={ nameOnChange } />
                            </div>
                            <button css={ btnStyle } onClick={ addPokemon }>Save</button>
                            </>
                        }
                        

                        {errorMessage &&
                            <div css={{ paddingTop: 15, fontSize: 14, color: '#d74949' }}>{ errorMessage }</div>}
                    </Modal>
                </>
            }
        </div>
    )
}
