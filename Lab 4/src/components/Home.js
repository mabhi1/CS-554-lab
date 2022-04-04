import { Container, Stack, Typography } from "@mui/material";
import React from "react";

function Home(props) {
    return (
        <Container maxWidth="lg">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h2">Welcome to Marvel App !</Typography>
                <Typography variant="h3" fontSize="28px">
                    Navigate through links to see characters, series and comics of marvel
                </Typography>
                <Typography variant="h3" fontSize="28px">
                    Search your favourites and know the details of individual characters,series and comics
                </Typography>
            </Stack>
        </Container>
    );
}

export default Home;
