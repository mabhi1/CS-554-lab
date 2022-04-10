import queries from "../queries";
import PostList from "./PostList";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import NewPostModal from "./NewPostModal";

function MyPosts() {
    const [showAddModal, setShowAddModal] = useState(false);
    const { loading, error, data } = useQuery(queries.userPostedImages, { fetchPolicy: "cache-and-network" });
    if (data) {
        const { userPostedImages } = data;
        return (
            <div>
                <div className="page-header">My Posts</div>
                <button onClick={() => setShowAddModal(true)} className="new-post">
                    Create New Post
                </button>
                <div className="card-holder">
                    <PostList data={userPostedImages} user={true} />
                </div>
                {showAddModal && <NewPostModal isOpen={showAddModal} handleClose={setShowAddModal} />}
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default MyPosts;
