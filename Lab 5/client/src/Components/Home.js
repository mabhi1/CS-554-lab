import { useQuery } from "@apollo/client";
import { useState } from "react";
import queries from "../queries";
import PostList from "./PostList";

function Home() {
    let [pageNum, setPageNum] = useState(1);
    let { loading, error, data } = useQuery(queries.unsplashImages, { variables: { pageNum: pageNum } });
    if (data) {
        const { unsplashImages } = data;
        return (
            <div>
                <div className="page-header">Unsplash Images</div>
                <div className="card-holder">
                    <PostList data={unsplashImages} user={false} />
                    <br />
                    <button
                        className="get-more"
                        onClick={() => {
                            setPageNum(pageNum + 1);
                        }}
                    >
                        Get More
                    </button>
                </div>
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default Home;
