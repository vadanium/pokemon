/** @jsxImportSource @emotion/react */
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { POKEMONS } from '../../graphql/PokemonQuery'
import { css, keyframes } from '@emotion/react';

export default function InfinitePokemons() {
    ////////////////////////////////
    // graphql pokemon list
    const [pageSettings, setPageSettings] = useState({
        page: 1,
        limit: columnNumber() > 2 ? 50 : 20,
        offset: 0,
        end: false
    });
    const { loading, error, data } = useQuery(POKEMONS, {
        variables: {
            limit: pageSettings.limit,
            offset: pageSettings.offset,
        },
    });

    // total column of pokemons that shows on page
    const [column, setColumn] = useState(columnNumber());

    // variable to change box from small box to big box
    let striped1 = true;
    let striped2 = true;

    // box color
    const color = useMemo(() => [
        '#47cfaf',
        '#fb6c6c',
        '#76bdfe',
        '#fed36a'
    ], [])

    const [pokemons, setPokemons] = useState([]);

    ////////////////////////////////
    // style
    const boxStyle = {
        height: 130,
        padding: '15px 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        color: '#fff',
        textAlign: 'center',
    }

    const pNameStyle = {
        width: '100%',
        padding: 10,
        position: 'absolute',
        fontSize: 22,
        textTransform: 'capitalize',
        background: 'rgb(255,255,255)',
    }

    const pIdStyle = {
        position: 'absolute',
        fontSize: 12
    }

    ////////////////////////////////
    // infinite scroll
    const observer = useRef();
    const lastElementList = node => {
        if(observer.current) observer.current.disconnect();
        if(pageSettings.end) return false;

        observer.current = new IntersectionObserver(bottom => {
            if(bottom[0].isIntersecting && ! loading) {
                setPageSettings(page => {
                    return {
                        ...page,
                        offset: data.pokemons.nextOffset
                    }
                });

                if(! data.pokemons.nextOffset) {
                    setPageSettings(page => {
                        return {
                            ...page,
                            end: true
                        }
                    });
                }
            }
        })

        if(node) observer.current.observe(node);
    }

    /**
     * merge data from api with state
     * and add color
     */
    useEffect(() => {
        if(data && data.pokemons.results.length > 0 && !loading) {
            setPokemons((a) => {
                const i = data && data.pokemons.results;
                return [
                    ...a,
                    ...i.map(b => {
                        return {
                            ...b,
                            color: color[Math.floor(Math.random() * 4)]
                        }
                    })
                ]
            });
        }
    }, [data, loading, color])

    /**
     * change pokemon list column on screen resize
     */
    useLayoutEffect(() => {
        window.addEventListener('resize', changeColumn);
        return () => window.removeEventListener('resize', changeColumn);
    })

    /**
     * set column based on screen size
     */
    function columnNumber() {
        if(window.screen.width < 576) {
            // mobile
            return 2;
        } else if(window.screen.width < 992) {
            // tab
            return 4;
        } else {
            // desktop
            return 5;
        }
    }

    /**
     * change number of column
     */
    function changeColumn() {
        setColumn(columnNumber());
    }

    function Loading() {
        const animation = keyframes`
            0% {
                width: 0%
            }
            100% {
                width: 100%
            }
        `
        const box = {
            flex: '1 0 0%',
            height: '130px',
            borderRadius: '8px',
            margin: '15px',
            backgroundColor: '#f2f2f2',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                width: '0%',
                height: '100%',
                position: 'absolute',
                backgroundColor: '#ebebeb',
                animation: `${ animation } .8s ease-in-out infinite`
            }
        }

        return (
            <div>
                <div css={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {[...Array(column).keys()].map(i => (
                        <div key={ i } css={ box }>
        
                        </div>
                    ))}
                </div>
                <div css={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {[...Array(column).keys()].map(i => (
                        <div key={ i } css={ box }>
        
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div css={{ marginTop: 50, marginLeft: -10, marginRight: -10, marginBottom: 50 }}>
            <ul className="pokemon-list" css={{ display: 'flex' }}>
                {pokemons &&
                    [...Array(column).keys()].map(i => (
                        <div key={i} css={{
                            width: 100/column+'%'
                        }}>
                            {striped1 = ! striped1}
                            {striped2 = striped1}

                            {pokemons.map((pokemon, key) => (
                                (key+1) % column === (i+1) % column &&
                                <li key={key} className="item" css={{
                                    padding: 10,
                                }}>
                                    {striped2 = ! striped2}
                                    <Link to={ '/pokemon/' + pokemon.name } css={ css(boxStyle, {backgroundColor: pokemon.color}) }>

                                        <div css={ css(
                                            pIdStyle,
                                            {
                                                top: striped2 ? 10 : 'unset', 
                                                right: striped2 ? 10 : 'unset',
                                                left: striped2 ? 'unset' : 10,
                                                bottom: striped2 ? 'unset' : 10,
                                            }
                                        ) }>#{ pokemon.id }</div>

                                        <div>
                                            <img src={ pokemon.image } alt={ pokemon.name } />
                                        </div>

                                        <span css={ css(
                                            pNameStyle,
                                            {
                                                top: striped2 ? 'unset' : 0,
                                                bottom: striped2 ? 0 : 'unset',
                                                textAlign: striped2 ? 'left' : 'right',
                                                background: striped2 ? 'linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,0) 100%)' : 'linear-gradient(180deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,0) 100%)',
                                            }
                                        )}>{ pokemon.name }</span>
                                    </Link>

                                    {key+1 === pokemons.length &&
                                        <div ref={ lastElementList }></div>}
                                        
                                </li>
                            ))}
                        </div>
                    ))}

            </ul>
            
            {loading && <Loading />}

            {pageSettings.end &&
                <div className="container">
                    <div className="row">
                        <h3 css={{
                            padding: '20px 10px'
                        }}>END</h3>
                    </div>
                </div>}

            {error &&
                <div className="container">
                    <div className="row">
                        <h3 css={{
                            padding: '20px 10px'
                        }}>Ooops :(</h3>
                    </div>
                </div>}
        </div>
    );
}
