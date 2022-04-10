import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="nav">
            <Link to="/">
                <span className="App-link">Home</span>
            </Link>
            <Link to="/my-bin">
                <span className="App-link">My bin</span>
            </Link>
            <Link to="/my-posts">
                <span className="App-link">My posts</span>
            </Link>
            <Link to="/new-post">
                <span className="App-link">New posts</span>
            </Link>
        </nav>
    );
}

export default Navigation;
