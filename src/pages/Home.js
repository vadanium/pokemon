/** @jsxImportSource @emotion/react */
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/template/Header'

const menu = {
    padding: 15,
    fontSize: 34,
    'a': {
        display: 'block',
        background: '#47cfaf',
        margin: 5,
        padding: '15px 30px',
        borderRadius: 8,
        color: '#fff',
        fontWeight: 700
    }
}

export default function Home() {
    return (
        <>
            <Header />
            <div css={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0 }}>
                <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                    <ul>
                        <li css={menu}>
                            <Link to="/pokemons">Pokemon List</Link>
                        </li>
                        <li css={menu}>
                            <Link to="/my-pokemon">My Pokemon</Link>
                        </li>
                        <li css={menu}>
                            <Link to="/credit">Credit</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
