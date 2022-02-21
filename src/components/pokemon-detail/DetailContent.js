/** @jsxImportSource @emotion/react */
import React, { useState, useContext, useEffect } from 'react'
import Tabs from '../utils/Tabs'
import LoadingBox from '../utils/LoadingBox'
import { PokemonContext } from '../../pages/PokemonDetail'
import { css } from '@emotion/react'

export default function DetailContent() {
    // get pokemon data
    const { loading, error, data, baseColor } = useContext(PokemonContext)

    const wrapper = {
        marginTop: 250,
        paddingTop: 50,
        paddingBottom: 50,
        borderRadius: '30px 30px 0 0',
        backgroundColor: '#fff',
        position: 'relative'
    }

    const row = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 15
    }

    const col = {
        flex: '1 0 0%'
    }

    const col6 = {
        flex: '0 0 auto',
        width: '50%'
    }

    const colLeft = {
        flex: '0 0 auto',
        width: '33.3333333333%'
    }

    const tabContentWrapStyle = {
        paddingTop: 30,
        paddingBottom: 30
    }

    const Stats = (prop) => {
        const [ bar, setBar] = useState(0)
        const [ color, setColor ] = useState('#fe6767')
        const stat = prop.stat/255*100;

        useEffect(() => {
            if(stat > 40) setColor('#ffd700')
            if(stat > 70) setColor('#90cd24')
            setBar(stat)
        }, [stat])

        return (
            <div css={{
                width: '100%',
                height: 5,
                backgroundColor: '#e3e3e2',
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    width: `${ bar }%`,
                    height: '100%',
                    backgroundColor: color,
                    transition: 'all .5s ease-in-out'
                }
            }}></div>
        )
    }

    return (
        <>
            {data && !error &&
                <div className="container" css={ wrapper }>
                    <div css={{
                            position: 'absolute',
                            top: -90,
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}>
                        <img src={ data.pokemon.sprites.front_default } css={{ height: 150 }} alt={ data.pokemon.name } />
                    </div>

                    <div className="row">
                        <Tabs color={ baseColor }>
                            <div label="About" >
                                <div css={ tabContentWrapStyle }>
                                    <div css={ row }>
                                        <span css={ colLeft }>Species</span>
                                        <span className="bold" css={ col }>{ data.pokemon.species.name }</span>
                                    </div>
                                    <div css={ row }>
                                        <span css={ colLeft }>Height</span>
                                        <span className="bold" css={ col }>{ data.pokemon.height }</span>
                                    </div>
                                    <div css={ row }>
                                        <span css={ colLeft }>Weight</span>
                                        <span className="bold" css={ col }>{ data.pokemon.weight }</span>
                                    </div>
                                    <div css={ row }>
                                        <span css={ colLeft }>Base Experience</span>
                                        <span className="bold" css={ col }>{ data.pokemon.base_experience }</span>
                                    </div>
                                    <div css={ row }>
                                        <span css={ colLeft }>Abilities</span>
                                        <span className="bold" css={ col }>
                                            { data.pokemon.abilities.map((item, i) => (
                                                i >0 ? ', '+item.ability.name : item.ability.name
                                            ) )}</span>
                                    </div>
                                </div>
                            </div>

                            <div label="Stats">
                                <div css={ tabContentWrapStyle }>
                                    {data.pokemon.stats.map(item => (
                                        <div key={ item.stat.name } css={ row }>
                                            <span css={ colLeft }>{ item.stat.name }</span>
                                            <span className="bold" css={ col }><span>{ item.base_stat }</span> <Stats stat={ item.base_stat } /> </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div label="Moves">
                                <div css={ tabContentWrapStyle }>
                                    <div css={ row }>
                                        {data.pokemon.moves.map(item => (
                                            <span key={ item.move.name } css={ col6 }><span className="bold" css={{ paddingBottom: '15px', display: 'block' }}>{ item.move.name }</span></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>}

            {loading && 
                <div className="container">
                    <div className="row">
                        <div css={ css(
                            wrapper,
                            {
                                paddingLeft: 15,
                                paddingBottom: 100,
                                backgroundColor: '#f7f7f7',
                                '&::before': {
                                    backgroundColor: '#f7f7f7'
                                }
                            }
                        ) }>
                            {[...Array(3).keys()].map(i => (
                                <div key={i} css={ row }>
                                    <span css={ colLeft }>
                                        <div css={{display: 'block', marginBottom: 10}}><LoadingBox width="80" height="25" /></div>
                                    </span>
                                    <span className="bold" css={ col }>
                                        <div css={{display: 'block', marginBottom: 10}}><LoadingBox width="120" height="25" />
                                    </div></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </>
    )
}
