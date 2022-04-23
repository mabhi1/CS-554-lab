import { v4 as uuid } from "uuid";

const trainerReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_POKEMON":
            for (let trainer of state) {
                if (trainer.id === payload.id) {
                    trainer.team.push(payload.pokemon);
                    break;
                }
            }
            return [...state];

        case "DELETE_POKEMON":
            let newTeam = [];
            for (let trainer of state) {
                if (trainer.id === payload.id) {
                    for (let pokemon of trainer.team) {
                        if (pokemon.name !== payload.name) {
                            newTeam.push(pokemon);
                        }
                    }
                    trainer.team = newTeam;
                    break;
                }
            }
            return [...state];

        case "ADD_TRAINER":
            return [...state, { id: uuid(), name: payload.name, team: [], selected: false }];

        case "SELECT_TRAINER":
            for (let trainer of state) {
                if (trainer.id === payload.id) {
                    trainer.selected = true;
                } else {
                    trainer.selected = false;
                }
            }
            return [...state];

        case "UNSELECT_TRAINER":
            for (let trainer of state) {
                trainer.selected = false;
            }
            return [...state];

        case "DELETE_TRAINER":
            let newState = [];
            for (let trainer of state) {
                if (trainer.id !== payload.id) {
                    newState.push(trainer);
                }
            }
            return [...newState];

        default:
            return state;
    }
};

export default trainerReducer;
