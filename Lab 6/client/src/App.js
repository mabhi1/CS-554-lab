import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import Poke from "./components/Poke";
import Trainers from "./components/Trainers";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000/",
    }),
});
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <Navigation />
                </div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/pokemon/page/:pageNum" element={<Pokemon />} />
                    <Route exact path="/pokemon/:id" element={<Poke />} />
                    <Route exact path="/trainers" element={<Trainers />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
