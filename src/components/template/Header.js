/** @jsxImportSource @emotion/react */
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/Poketo.png'

export default function Header() {
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
                <Link to="/">
                    <img src={ logo } css={{ height: 50 }} alt="logo" />
                </Link>
            </div>
        </div>
    )
}
