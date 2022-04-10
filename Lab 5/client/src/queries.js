import { gql } from "@apollo/client";

const binnedImages = gql`
    query BinnedImages {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const deleteImage = gql`
    mutation Mutation($deleteImageId: ID!) {
        deleteImage(id: $deleteImageId) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const unsplashImages = gql`
    query Query($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const updateImage = gql`
    mutation Mutation($updateImageId: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean) {
        updateImage(id: $updateImageId, url: $url, posterName: $posterName, description: $description, userPosted: $userPosted, binned: $binned) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const uploadImage = gql`
    mutation Mutation($url: String!, $description: String, $posterName: String) {
        uploadImage(url: $url, description: $description, posterName: $posterName) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const userPostedImages = gql`
    query BinnedImages {
        userPostedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

let exported = {
    unsplashImages,
    updateImage,
    binnedImages,
    userPostedImages,
    deleteImage,
    uploadImage,
};

export default exported;
