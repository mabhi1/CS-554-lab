import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import useStyles from "../Styles";
import { Container, CardHeader, LinearProgress, Typography, CardMedia, CardContent, Card, Button } from "@mui/material";
import "../App.css";

function Comic(props) {
    const regex = /(<([^>]+)>)/gi;
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading } = useAxios(`https://gateway.marvel.com:443/v1/public/comics/${id}?`);
    const classes = useStyles();
    const showData = data && data.data.data.results[0];
    let comicCard = null;
    let comicCardLink = null;
    let priceCard = null;
    let showSeries = null;
    let b = null;
    if (loading) {
        return (
            <Container maxWidth="sm">
                <Typography variant="h6">Loading...</Typography>
                <LinearProgress />
            </Container>
        );
    } else {
        comicCardLink = (items) => {
            return items.map((item) => {
                b = item.resourceURI.split("/");
                return (
                    <dd key={item.resourceURI} className={classes.charDD}>
                        <Link to={"/" + b[b.length - 2] + "/" + b[b.length - 1]} className="charlink">
                            {item.name}
                        </Link>
                    </dd>
                );
            });
        };
        priceCard = (prices) => {
            return prices.map((price) => {
                return (
                    <dd key={price.type} className={classes.charDD}>
                        {price.type} : $ {price.price}
                    </dd>
                );
            });
        };
        comicCard = (items) => {
            return items.map((item) => {
                return (
                    <dd key={item.resourceURI} className={classes.charDD}>
                        {item.name}
                    </dd>
                );
            });
        };
        showSeries = (series) => {
            b = series.resourceURI.split("/");
            return (
                <dd className={classes.charDD}>
                    <Link to={"/" + b[b.length - 2] + "/" + b[b.length - 1]} className="charlink">
                        {series.name}
                    </Link>
                </dd>
            );
        };
        return (
            <Card className={classes.characterCard} variant="outlined">
                <CardHeader className={classes.title} title={showData.name} />
                <CardMedia
                    className={classes.image}
                    component="img"
                    image={showData.thumbnail.path + "." + showData.thumbnail.extension}
                    title={showData.name}
                />

                <CardContent>
                    <Typography variant="h6" color="textSecondary" component="span" className={classes.desc}>
                        <dl>
                            <div>
                                <dt className={classes.charDt}> Description:</dt>
                                {showData && showData.description ? (
                                    <dd className={classes.charDD}>{showData.description.replace(regex, "")}</dd>
                                ) : (
                                    <dd className={classes.charDD}>N/A</dd>
                                )}
                            </div>
                            <div>
                                <dt className={classes.charDt}> Series:</dt>
                                {showData && showData.series ? showSeries(showData.series) : <div className={classes.charDD}>N/A</div>}
                            </div>
                            <div>
                                <dt className={classes.charDt}> Prices:</dt>
                                {showData && showData.prices ? priceCard(showData.prices) : <div className={classes.charDD}>N/A</div>}
                            </div>
                            <div>
                                <dt className={classes.charDt}> Events:</dt>
                                {showData && showData.events.available > 0 ? (
                                    comicCard(showData.events.items)
                                ) : (
                                    <dd className={classes.charDD}>N/A</dd>
                                )}
                            </div>
                            <div>
                                <dt className={classes.charDt}> Stories:</dt>
                                {showData && showData.stories.available > 0 ? (
                                    comicCard(showData.stories.items)
                                ) : (
                                    <dd className={classes.charDD}>N/A</dd>
                                )}
                            </div>
                            <div>
                                <dt className={classes.charDt}> Characters:</dt>
                                {showData && showData.characters.available > 0 ? (
                                    comicCardLink(showData.characters.items)
                                ) : (
                                    <dd className={classes.charDD}>N/A</dd>
                                )}
                            </div>
                            <div>
                                <dt className={classes.charDt}> Creators:</dt>
                                {showData && showData.creators.available > 0 ? (
                                    comicCard(showData.creators.items)
                                ) : (
                                    <dd className={classes.charDD}>N/A</dd>
                                )}
                            </div>
                        </dl>
                    </Typography>
                </CardContent>
                <Button variant="contained" style={{ marginBottom: "25px" }} onClick={() => navigate("/comics/page/0")}>
                    Go Back to Comics page
                </Button>
            </Card>
        );
    }
}

export default Comic;
