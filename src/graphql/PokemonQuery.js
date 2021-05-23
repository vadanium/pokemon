import { gql } from '@apollo/client'

/**
 * get all pokemons
 */
export const POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            nextOffset
            prevOffset
            status
            message
            results {
                id
                url
                name
                image
            }
        }
    }`;

/**
 * get pokemon detail
 */
export const POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            abilities {
                slot
                is_hidden
                ability {
                    name
                }
            }
            base_experience
            forms {
                name
            }
            height
            id
            moves {
                move {
                    name
                }
            }
            name
            species {
                name
            }
            sprites {
                back_default
                back_female
                back_shiny
                back_female
                front_default
                front_female
                front_shiny
                front_shiny_female
              }
            stats {
                base_stat
                effort
                stat {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            weight
            status
            message
        }
    }`;

    
