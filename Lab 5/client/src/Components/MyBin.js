import queries from "../queries";
import PostList from "./PostList";
import { useQuery } from "@apollo/client";

function MyBin() {
    const { loading, error, data } = useQuery(queries.binnedImages, { fetchPolicy: "cache-and-network" });
    if (data) {
        const { binnedImages } = data;
        return (
            <div>
                <div className="page-header">My Bin</div>
                <div className="card-holder">
                    <PostList data={binnedImages} user={false} />
                </div>
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default MyBin;
