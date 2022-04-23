const { ApolloServer, gql, UserInputError } = require("apollo-server");
const redis = require("redis");
const axios = require("axios");

const client = redis.createClient();
const clientConnect = async () => {
    await client.connect();
};
clientConnect();

const typeDefs = gql`
    type Query {
        allPokemon(pageNum: Int!): [pokemon]
        pokemon(id: Int!): individualPokemon
    }

    type pokemon {
        name: String!
        url: String!
    }

    type individualPokemon {
        id: Int!
        name: String!
        height: Int!
        weight: Int!
        abilities: [String]!
        types: [String]!
        sprites: [String]!
    }
`;

const resolvers = {
    Query: {
        allPokemon: async (_, args) => {
            if (args.pageNum <= 0 || args.pageNum >= 58) throw new UserInputError("Request failed with status code 404");
            const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=" + (args.pageNum * 20 - 20).toString());
            return data.results;
        },
        pokemon: async (_, args) => {
            if (await client.hExists("pokemons", args.id)) {
                let pokemon = await client.hGet("pokemons", args.id);
                pokemon = JSON.parse(pokemon);
                return pokemon;
            }
            const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + args.id);
            const individualPokemon = {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                abilities: [],
                types: [],
                sprites: [],
            };

            for (let i = 0; i < data.abilities.length; i++) {
                individualPokemon.abilities.push(data.abilities[i].ability.name);
            }

            for (let i = 0; i < data.types.length; i++) {
                individualPokemon.types.push(data.types[i].type.name);
            }

            individualPokemon.sprites.push(data.sprites.back_default);
            individualPokemon.sprites.push(data.sprites.back_shiny);
            individualPokemon.sprites.push(data.sprites.front_default);
            individualPokemon.sprites.push(data.sprites.front_shiny);
            await client.hSet("pokemons", args.id, JSON.stringify(individualPokemon));
            return individualPokemon;
        },
    },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Apollo server ready at ${url} 🚀`);
});
