import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navigation() {
    let navigate = useNavigate();
    return (
        <ButtonGroup variant="text" color="inherit" fullWidth={true}>
            <Button style={{ border: 0 }} onClick={() => navigate("/")} size="large">
                Home
            </Button>
            <Button style={{ border: 0 }} onClick={() => navigate("/characters/page/0")} size="large">
                Characters
            </Button>
            <Button style={{ border: 0 }} onClick={() => navigate("/comics/page/0")} size="large">
                Comics
            </Button>
            <Button style={{ border: 0 }} onClick={() => navigate("/series/page/0")} size="large">
                Series
            </Button>
        </ButtonGroup>
    );
}

export default Navigation;
