/** @jsxImportSource @emotion/react */
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/Poketo.png'
import pokeballImgClose from '../../assets/img/pokeball-close.png'

export default function Header() {
    const countPokemon = () => {
        const poke = JSON.parse(localStorage.getItem('myPokemon') || '[]')

        return poke.length ? poke.map(a => a.pokemons.length).reduce((total, num) => total+num) : 0
    }

    return (
        <div css={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: 'rgba(255,255,255,1)',
            zIndex: 999
        }}>
            <div className="container" css={{ textAlign: 'center' }}>
                <div css={{display: 'flex', alignItems: 'center'}}>
                    <div css={{justifyItems: 'center', flex: '1'}}>
                        <Link to="/">
                            <img src={ logo } css={{ height: 50 }} alt="logo" />
                        </Link>
                    </div>
                    <Link to="/my-pokemon">
                        <div css={{display: 'flex'}}>
                            <img css={{ height: 30 }} src={pokeballImgClose} alt="pokeball" />
                            <span css={{lineHeight: '30px', fontWeight: 700}}>{ countPokemon() }</span> 
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
