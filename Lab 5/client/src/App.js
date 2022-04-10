import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import MyBin from "./Components/MyBin";
import MyPosts from "./Components/MyPosts";
import NewPost from "./Components/NewPost";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000",
    }),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <header className="App-header">
                    <Navigation />
                </header>
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/my-bin" element={<MyBin />} />
                        <Route exact path="/my-posts" element={<MyPosts />} />
                        <Route exact path="/new-post" element={<NewPost />} />
                    </Routes>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
