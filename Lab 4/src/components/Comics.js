import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { Container, Grid, LinearProgress, Typography, CardMedia, CardContent, Card, CardActionArea, Divider, Button } from "@mui/material";
import "../App.css";
import useStyles from "../Styles";
import SearchBar from "./SearchBar";
function Comics(props) {
    let navigate = useNavigate();
    const classes = useStyles();
    const { page } = useParams();
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchUrl, setSearchUrl] = useState(`https://gateway.marvel.com:443/v1/public/comics?offset=${page * 20}&`);
    let { data, loading } = useAxios(searchUrl);
    useEffect(() => {
        if (!searchTerm) {
            if (page < 0) {
                navigate("/404");
            }
            setSearchUrl(`https://gateway.marvel.com:443/v1/public/comics?offset=${page * 20}&`);
        } else {
            setSearchUrl(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchTerm}&`);
        }
    }, [searchTerm, navigate, page]);
    useEffect(() => {
        if (data && data.data.data.offset >= data.data.data.total && data.data.data.total > 0) {
            navigate("/404");
        }
    }, [data, navigate]);
    let comics = data && data.data.data.results;
    let card = null;
    const searchValue = (term) => {
        setSearchTerm(term);
    };
    function buildCard(comic) {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={comic.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <Link to={`/comics/${comic.id}`} className="cardlink">
                            <CardMedia
                                className={classes.media}
                                component="img"
                                image={comic.thumbnail.path + "." + comic.thumbnail.extension}
                                title={comic.name}
                            />
                            <CardContent>
                                <Typography className={classes.titleHead} component="h4">
                                    {comic.title}
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {comic.description ? comic.description : "Description : Not Available"}
                                </Typography>
                                <Typography className={classes.desc}>Series : {comic.series ? comic.series.name : "Not Available"}</Typography>
                                <Typography className={classes.desc}>
                                    Characters : {comic.characters.available ? comic.characters.available : "Not Available"}
                                </Typography>
                                <Typography className={classes.desc}>
                                    Creators : {comic.creators.available ? comic.creators.available : "Not Available"}
                                </Typography>
                                <Typography className={classes.desc}>
                                    Stories : {comic.stories.available ? comic.stories.available : "Not Available"}
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
            comics.map((comic) => {
                return buildCard(comic);
            });
        return (
            <>
                <Typography variant="h2" fontSize="32px" p={3} textAlign="center" gutterBottom className={classes.pageTitle}>
                    Comics
                </Typography>
                <SearchBar searchValue={searchValue} />
                <Grid container className={classes.pagination}>
                    <Grid item sm={4}>
                        {page <= "0" ? (
                            <Button variant="contained" disabled style={{ color: "#646464" }}>
                                Previous
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={() => navigate(`/comics/page/${page * 1 - 1}`)}>
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
                            <Button variant="contained" onClick={() => navigate(`/comics/page/${page * 1 + 1}`)}>
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

export default Comics;
