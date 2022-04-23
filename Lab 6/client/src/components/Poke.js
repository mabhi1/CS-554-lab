import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import queries from "../queries";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import ProgressBar from "react-bootstrap/ProgressBar";

function Poke() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(queries.pokemon, { variables: { pokemonId: parseInt(id) } });
    const trainers = useSelector((state) => state.trainers);
    const dispatch = useDispatch();
    let selected = null;
    let pokemons = [];
    const findTrainer = () => {
        for (let trainer of trainers) {
            if (trainer.selected === true) {
                selected = trainer.id;
                for (let pokemon of trainer.team) {
                    pokemons.push(pokemon.name);
                }
                return;
            }
        }
    };
    findTrainer();
    const handleCatch = (pName, pUrl) => {
        dispatch(actions.addPokemon(selected, { name: pName, url: pUrl }));
    };
    const handleRelease = (name) => {
        dispatch(actions.deletePokemon(selected, name));
    };
    const card = (p) => {
        const url = "https://pokeapi.co/api/v2/pokemon/" + p.id;
        return (
            <Card style={{ width: "80%" }} key={p.id} className="pokemon_card">
                <Card.Header>{p.name}</Card.Header>
                <Card.Img
                    src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + p.id + ".png"}
                    alt={"Image : " + p.name}
                />
                <Card.Body>
                    <Card.Text>
                        Height : {p.height} Weight : {p.weight}
                    </Card.Text>
                    <Card.Text>Abilities : {p.abilities.join(" ")}</Card.Text>
                    {p.sprites.map((spr) => {
                        return spr ? (
                            <img src={spr} alt={spr} style={{ marginLeft: "5px", marginRight: "5px" }} key={spr} />
                        ) : (
                            <img
                                src="https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg"
                                alt="Not Found"
                                style={{ marginLeft: "5px", marginRight: "5px" }}
                                width="100px"
                                height="100px"
                            />
                        );
                    })}
                    <Card.Text>Types : {p.types.join(" ")}</Card.Text>
                </Card.Body>
                <div>
                    {selected === null ? (
                        <Button disabled>No Trainer Selected</Button>
                    ) : pokemons.length >= 6 && !pokemons.includes(p.name) ? (
                        <Button disabled>Team Full</Button>
                    ) : pokemons.includes(p.name) ? (
                        <Button onClick={() => handleRelease(p.name)}>Release</Button>
                    ) : (
                        <Button onClick={() => handleCatch(p.name, url)}>Catch</Button>
                    )}
                </div>
            </Card>
        );
    };
    if (loading) {
        return (
            <div className="body">
                Loading
                <br />
                <ProgressBar animated now={50} className="m-3" />
            </div>
        );
    } else if (error) {
        return <div className="body alert alert-danger">{error.message}</div>;
    } else if (data) {
        const { pokemon } = data;
        return <div style={{ textAlign: "center" }}>{card(pokemon)}</div>;
    }
}

export default Poke;
