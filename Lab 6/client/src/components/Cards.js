import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

function Cards(props) {
    const { allPokemon } = props.data;
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
    const card = allPokemon.map((pokemon) => {
        const id = pokemon.url.split("/")[6];
        return (
            <Card style={{ width: "250px" }} key={id}>
                <Link to={"/pokemon/" + id}>
                    <Card.Img
                        src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png"}
                        alt={pokemon.name}
                    />
                    <Card.Title>{pokemon.name}</Card.Title>
                </Link>
                {props.trainerList ? undefined : selected === null ? (
                    <Button disabled>No Trainer Selected</Button>
                ) : pokemons.length >= 6 && !pokemons.includes(pokemon.name) ? (
                    <Button disabled>Team Full</Button>
                ) : pokemons.includes(pokemon.name) ? (
                    <Button onClick={() => handleRelease(pokemon.name)}>Release</Button>
                ) : (
                    <Button onClick={() => handleCatch(pokemon.name, pokemon.url)}>Catch</Button>
                )}
            </Card>
        );
    });
    return (
        <Row xs={1} md={3} lg={4} className="card-holder">
            {card}
        </Row>
    );
}

export default Cards;
