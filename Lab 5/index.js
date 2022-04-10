const { ApolloServer, gql } = require("apollo-server");
const uuid = require("uuid");
const axios = require("axios");
const redis = require("redis");

const client = redis.createClient();
const clientConnect = async () => {
    await client.connect();
};
clientConnect();

const typeDefs = gql`
    type Query {
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
    }

    type ImagePost {
        id: ID!
        url: String!
        posterName: String!
        description: String
        userPosted: Boolean!
        binned: Boolean!
    }

    type Mutation {
        uploadImage(url: String!, description: String, posterName: String): ImagePost
        updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean): ImagePost
        deleteImage(id: ID!): ImagePost
    }
`;

const resolvers = {
    Query: {
        unsplashImages: async (_, args) => {
            let posts = [];
            const { data } = await axios.get(
                "https://api.unsplash.com/photos?client_id=2QgfzDF26qnd8DPDRGdLQXXqC4pjGPX_cIlCfjw5EZM&&page=" + args.pageNum
            );
            for (let post of data) {
                let reqPost = {
                    id: uuid.v4(),
                    url: post.urls.raw,
                    posterName: post.user.name,
                    description: post.description,
                    userPosted: false,
                    binned: false,
                };
                posts.push(reqPost);
            }
            return posts;
        },
        binnedImages: async () => {
            let reqPosts = [];
            const posts = await client.hGetAll("posts");
            if (Object.keys(posts).length === 0) return reqPosts;
            for (let post in posts) {
                const req = JSON.parse(posts[post]);
                if (req.binned === true) reqPosts.push(req);
            }
            return reqPosts;
        },
        userPostedImages: async () => {
            let reqPosts = [];
            const posts = await client.hGetAll("posts");
            if (Object.keys(posts).length === 0) return reqPosts;
            for (let post in posts) {
                const req = JSON.parse(posts[post]);
                if (req.userPosted === true) reqPosts.push(req);
            }
            return reqPosts;
        },
    },
    Mutation: {
        uploadImage: async (_, args) => {
            let post = {
                id: uuid.v4(),
                url: args.url,
                posterName: "abhi",
                description: "",
                userPosted: true,
                binned: false,
            };
            if (args.description) post.description = args.description;
            if (args.posterName) post.posterName = args.posterName;
            await client.hSet("posts", post.id, JSON.stringify(post));
            return post;
        },
        updateImage: async (_, args) => {
            let post = {};
            if (await client.hExists("posts", args.id)) {
                post = await client.hGet("posts", args.id);
                await client.hDel("posts", args.id);
                post = JSON.parse(post);
            } else {
                post = {
                    id: args.id,
                    url: args.url,
                    posterName: "abhi",
                    description: "",
                    userPosted: true,
                    binned: false,
                };
            }
            if (args.url) post.url = args.url;
            if (args.posterName) post.posterName = args.posterName;
            if (args.description) post.description = args.description;
            if (args.userPosted != null) post.userPosted = args.userPosted;
            if (args.binned != null) post.binned = args.binned;
            if (post.binned == true || post.userPosted == true) {
                await client.hSet("posts", args.id, JSON.stringify(post));
            }
            return post;
        },
        deleteImage: async (_, args) => {
            const post = await client.hGet("posts", args.id);
            await client.hDel("posts", args.id);
            return JSON.parse(post);
        },
    },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Apollo server ready at ${url} 🚀`);
});
