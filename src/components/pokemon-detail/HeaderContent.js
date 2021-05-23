/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react'
import { PokemonContext, BaseColorContext } from '../../pages/PokemonDetail'
import LoadingBox from '../utils/LoadingBox'
import { css } from '@emotion/react'

export default function HeaderContent() {
    // get pokemon data
    const { loading, error, data } = useContext(PokemonContext)
    // base color
    const baseColor = useContext(BaseColorContext)

    const wrapper = {
        width: '100%',
        height: 280,
        position: 'fixed',
        top: 0,
        zIndex: -1,
        backgroundColor: baseColor,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }
    }

    const centerCtn = {
        height: '100%',
        paddingTop: 50,
        position: 'relative',
        overflow: 'hidden'
    }

    const pType = {
        display: 'inline-block',
        marginRight: 5,
        padding: '5px 10px',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: 5,
        fontSize: 12,
        textTransform: 'capitalize'
    }

    return (
        <>
            {data && !error &&
                <div css={ wrapper }>
                    <div className="container" css={ centerCtn }>
                        <div css={{paddingTop: 50}}>
                            <h2 css={{ textTransform: 'capitalize' }}>{ data.pokemon.name }</h2>

                            <div>
                                {data.pokemon.types.map(item => (
                                    <span key={ item.type.name } css={ pType }>{ item.type.name }</span>
                                ))}
                            </div>
                        </div>

                        <img src={ data.pokemon.sprites.front_shiny } css={{
                            filter: 'grayscale(1)',
                            position: 'absolute',
                            bottom: -50,
                            right: -50,
                            width: 200,
                            opacity: '.1'
                        }} alt={ data.pokemon.name } />
                    </div>
                </div>}

            {loading && 
                <div css={ css(wrapper, { 
                        backgroundColor: '#fcfcfc',
                        
                    }) }>
                    <div className="container" css={{
                        paddingTop: 100,
                        paddingBottom: 15
                    }}>
                        <div css={{display: 'block', marginBottom: 10}}><LoadingBox width="150" height="30" /></div>
                        <LoadingBox width="80" height="20" />
                    </div>
                </div>}
        </>
    )
}
