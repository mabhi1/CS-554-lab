const addPokemon = (id, pokemon) => ({
    type: "ADD_POKEMON",
    payload: {
        id: id,
        pokemon: pokemon,
    },
});

const deletePokemon = (id, name) => ({
    type: "DELETE_POKEMON",
    payload: {
        id: id,
        name: name,
    },
});

const addTrainer = (name) => ({
    type: "ADD_TRAINER",
    payload: {
        name: name,
    },
});

const selectTrainer = (id) => ({
    type: "SELECT_TRAINER",
    payload: {
        id: id,
    },
});

const unselectTrainer = (id) => ({
    type: "UNSELECT_TRAINER",
    payload: {
        id: id,
    },
});

const deleteTrainer = (id) => ({
    type: "DELETE_TRAINER",
    payload: {
        id: id,
    },
});

module.exports = {
    addPokemon,
    addTrainer,
    selectTrainer,
    unselectTrainer,
    deleteTrainer,
    deletePokemon,
};
