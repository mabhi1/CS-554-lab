import { useMutation } from "@apollo/client";
import queries from "../queries";

function PostList(props) {
    const [updateImage] = useMutation(queries.updateImage, {
        update(cache, { data: { updateImage } }) {
            let binnedImages = [];
            if (cache.readQuery({ query: queries.binnedImages })) {
                binnedImages = cache.readQuery({ query: queries.binnedImages }).binnedImages;
            } else {
                binnedImages = [];
            }
            binnedImages = binnedImages?.filter((image) => {
                return image.id !== updateImage.id;
            });
            cache.writeQuery({
                query: queries.binnedImages,
                data: { binnedImages: binnedImages.concat([updateImage]) },
            });
        },
    });

    const [deleteImage] = useMutation(queries.deleteImage, {
        update(cache, { data: { deleteImage } }) {
            let userPostedImages = [];
            if (cache.readQuery({ query: queries.userPostedImages })) {
                userPostedImages = cache.readQuery({ query: queries.userPostedImages }).userPostedImages;
            } else {
                userPostedImages = [];
            }
            userPostedImages = userPostedImages?.filter((image) => {
                return image.id !== deleteImage.id;
            });
            cache.writeQuery({
                query: queries.userPostedImages,
                data: { userPostedImages: userPostedImages },
            });
        },
    });
    const images = props.data?.map((image) => {
        return (
            <div key={image.id} className="card">
                <img src={image.url} alt={image.posterName} width="auto" height="400px" />
                <div className="card-description">Description: {image.description ? image.description : "No Description"}</div>
                <div className="card-poster">Poster: {image.posterName ? image.posterName : "Unknown Poster"}</div>

                {props.user ? (
                    <button
                        className="card-button"
                        onClick={() =>
                            deleteImage({
                                variables: {
                                    deleteImageId: image.id,
                                },
                            })
                        }
                    >
                        Delete Post
                    </button>
                ) : null}
                <br />
                {image.binned ? (
                    <button
                        className="card-button"
                        onClick={() => {
                            updateImage({
                                variables: {
                                    updateImageId: image.id,
                                    url: image.url,
                                    posterName: image.posterName,
                                    description: image.description,
                                    userPosted: image.userPosted,
                                    binned: false,
                                },
                            });
                        }}
                    >
                        Remove from bin
                    </button>
                ) : (
                    <button
                        className="card-button"
                        onClick={() => {
                            updateImage({
                                variables: {
                                    updateImageId: image.id,
                                    url: image.url,
                                    posterName: image.posterName,
                                    description: image.description,
                                    userPosted: image.userPosted,
                                    binned: true,
                                },
                            });
                        }}
                    >
                        Add to bin
                    </button>
                )}
            </div>
        );
    });
    return images;
}

export default PostList;
