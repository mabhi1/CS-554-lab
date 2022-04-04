import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { Container, Grid, LinearProgress, Typography, CardMedia, CardContent, Card, CardActionArea, Divider, Button } from "@mui/material";
import "../App.css";
import useStyles from "../Styles";
import SearchBar from "./SearchBar";
function Characters() {
    let navigate = useNavigate();
    const classes = useStyles();
    const { page } = useParams();
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchUrl, setSearchUrl] = useState(`https://gateway.marvel.com:443/v1/public/characters?offset=${page * 20}&`);
    let { data, loading } = useAxios(searchUrl);
    useEffect(() => {
        if (!searchTerm) {
            if (page < 0) {
                navigate("/404");
            }
            setSearchUrl(`https://gateway.marvel.com:443/v1/public/characters?offset=${page * 20}&`);
        } else {
            setSearchUrl(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&`);
        }
    }, [searchTerm, page, navigate]);
    useEffect(() => {
        if (data && data.data.data.offset >= data.data.data.total && data.data.data.total > 0) {
            navigate("/404");
        }
    }, [data, navigate]);
    let characters = data && data.data.data.results;
    let card = null;
    const searchValue = (data) => {
        setSearchTerm(data);
    };
    function buildCard(character) {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={character.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <Link to={`/characters/${character.id}`} className="cardlink">
                            <CardMedia
                                className={classes.media}
                                component="img"
                                image={character.thumbnail.path + "." + character.thumbnail.extension}
                                title={character.name}
                            />
                            <CardContent>
                                <Typography className={classes.titleHead} component="h4">
                                    {character.name}
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {character.description ? character.description : "Description : Not Available"}
                                </Typography>
                                <Typography className={classes.desc}>
                                    Comics : {character.comics.available ? character.comics.available : "Not Available"}
                                </Typography>
                                <Typography className={classes.desc}>
                                    Series : {character.series.available ? character.series.available : "Not Available"}
                                </Typography>
                                <Typography className={classes.desc}>
                                    Stories : {character.stories.available ? character.stories.available : "Not Available"}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
    if (loading) {
        return (
            <Container maxWidth="sm">
                <Typography variant="h6">Loading...</Typography>
                <LinearProgress />
            </Container>
        );
    } else {
        card =
            data &&
            characters.map((character) => {
                return buildCard(character);
            });
        return (
            <>
                <Typography variant="h2" p={3} textAlign="center" gutterBottom className={classes.pageTitle} fontSize="32px">
                    Characters
                </Typography>
                <SearchBar searchValue={searchValue} />
                <Grid container className={classes.pagination}>
                    <Grid item sm={4}>
                        {page <= "0" ? (
                            <Button variant="contained" disabled style={{ color: "#646464" }}>
                                Previous
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={() => navigate(`/characters/page/${page * 1 - 1}`)}>
                                Previous
                            </Button>
                        )}
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="h3" fontSize="24px" className={classes.paginationText}>
                            You are on page : {page * 1 + 1}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        {data && page * 20 + 20 >= data.data.data.total ? (
                            <Button variant="contained" disabled style={{ color: "#646464" }}>
                                Next
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={() => navigate(`/characters/page/${page * 1 + 1}`)}>
                                Next
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <Divider className={classes.divider} variant="middle" />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </>
        );
    }
}

export default Characters;
