import { gql } from "@apollo/client";

const allPokemon = gql`
    query Query($pageNum: Int!) {
        allPokemon(pageNum: $pageNum) {
            name
            url
        }
    }
`;

const pokemon = gql`
    query Query($pokemonId: Int!) {
        pokemon(id: $pokemonId) {
            id
            name
            height
            weight
            abilities
            types
            sprites
        }
    }
`;

let exported = {
    allPokemon,
    pokemon,
};

export default exported;
