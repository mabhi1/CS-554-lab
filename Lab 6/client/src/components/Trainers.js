import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import Cards from "./Cards";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Trainers() {
    const trainers = useSelector((state) => state.trainers);
    const dispatch = useDispatch();
    const handleClick = () => {
        if (!document.getElementById("trainer").value) return;
        const name = document.getElementById("trainer").value.toString();
        dispatch(actions.addTrainer(name));
        document.getElementById("trainer").value = "";
    };
    const handleSelect = (id) => {
        dispatch(actions.selectTrainer(id));
    };
    const handleUnselect = (id) => {
        dispatch(actions.unselectTrainer(id));
    };
    const handleDelete = (id) => {
        dispatch(actions.deleteTrainer(id));
    };
    let cards = trainers?.map((trainer) => {
        let data = { allPokemon: trainer.team };
        return (
            <div key={trainer.id}>
                <div className="page-text">{trainer.name}</div>
                {trainer.selected ? <Button disabled>Delete</Button> : <Button onClick={() => handleDelete(trainer.id)}>Delete</Button>}

                {trainer.selected ? (
                    <Button onClick={() => handleUnselect(trainer.id)}>Selected</Button>
                ) : (
                    <Button onClick={() => handleSelect(trainer.id)}>Select</Button>
                )}

                <Cards data={data} trainerList={true} />
            </div>
        );
    });
    return (
        <div>
            <Form.Label htmlFor="trainer"></Form.Label>
            <Form.Control id="trainer" type="text" placeholder="Enter name for the trainer" />
            <Button onClick={handleClick}>Add Trainer</Button>
            <br />
            <br />
            <div>{cards}</div>
        </div>
    );
}

export default Trainers;
