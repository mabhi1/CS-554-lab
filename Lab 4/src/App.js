import { AppBar, CssBaseline, Fab, Grid, Toolbar, Typography } from "@mui/material";
import "./App.css";
import StarsIcon from "@mui/icons-material/Stars";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comics from "./components/Comics";
import Characters from "./components/Characters";
import Series from "./components/Series";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Character from "./components/Character";
import { useState, useEffect } from "react";
import IndividualSeries from "./components/IndividualSeries";
import Comic from "./components/Comic";

function App() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);
    return (
        <Router>
            <CssBaseline />
            <AppBar position="sticky" sx={{ marginBottom: 5 }}>
                <Toolbar disableGutters>
                    <Grid container spacing={1} marginTop={0}>
                        <Grid item xs={1} textAlign="right">
                            <StarsIcon sx={{ fontSize: 35 }} />
                        </Grid>
                        <Grid item xs={6} padding={1}>
                            <Typography variant="h1" fontSize="26px">
                                Marvel App
                            </Typography>
                        </Grid>
                        <Grid item xs={4} marginRight="5px">
                            <Navigation />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/comics/page/:page" element={<Comics />} />
                <Route exact path="/comics/:id" element={<Comic />} />
                <Route exact path="/characters/page/:page" element={<Characters />} />
                <Route exact path="/characters/:id" element={<Character />} />
                <Route exact path="/series/page/:page" element={<Series />} />
                <Route exact path="/series/:id" element={<IndividualSeries />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <footer style={{ marginBottom: "50px" }}>
                {showButton && (
                    <Fab
                        style={{ position: "fixed", right: 0, bottom: 0, margin: "25px", zIndex: 9 }}
                        color="secondary"
                        aria-label="scroll to top"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        top
                    </Fab>
                )}
            </footer>
        </Router>
    );
}

export default App;
