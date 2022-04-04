import { TextField } from "@mui/material";
import React from "react";

function SearchBar(props) {
    const handleChange = (e) => {
        e.preventDefault();
        props.searchValue(e.target.value);
    };
    return (
        <div style={{ textAlign: "center", width: "100%", marginBottom: "25px" }}>
            <TextField
                aria-label="search"
                id="searchTerm"
                variant="outlined"
                label="Search"
                color="secondary"
                size="small"
                onChange={handleChange}
            ></TextField>
        </div>
    );
}

export default SearchBar;
