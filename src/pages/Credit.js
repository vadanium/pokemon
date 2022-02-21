/** @jsxImportSource @emotion/react */
import React from 'react'
import Header from '../components/template/Header'

export default function Credit() {
    return (
        <div>
            <Header />
            <div css={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0 }}>
                <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', textAlign: 'center', fontSize: 20 }}>
                    <p css={{paddingBottom: 30}}>Made With Love<br />Wisnu Nugroho - 2022</p>
                    <p css={{paddingBottom: 5}}><a css={{color: '#47cfaf'}} target="_blank" rel="noreferrer" href="https://github.com/vadanium/pokemon">Github</a></p>
                    <p css={{paddingBottom: 5}}><a css={{color: '#47cfaf'}} target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/wisnu-nugroho/">Linkedin</a></p>
                </div>
            </div>
        </div>
    )
}
