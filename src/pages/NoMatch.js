/** @jsxImportSource @emotion/react */
import React from 'react'
import Header from '../components/template/Header'

export default function NoMatch() {
    return (
        <div className="container">
            <Header />
            <p css={{marginTop: 200, textAlign: 'center', fontSize: 18}}>404 Not Found</p>
        </div>
    )
}
