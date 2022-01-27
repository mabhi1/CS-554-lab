const mongoCollections = require("../config/mongoCollections");
const blogs = mongoCollections.blogs;
let { ObjectId } = require("mongodb");

module.exports = {
    async createBlog(title, body, userThatPosted) {
        if (!title || !body || !userThatPosted) throw "Error: One or more parameters not passed";
        if (title.trim().length == 0 || body.trim().length == 0) throw "Error: Invalid parameters";

        const blogCollection = await blogs();

        let blog = {
            title: title,
            body: body,
            userThatPosted: userThatPosted,
            comments: [],
        };

        const insertInfo = await blogCollection.insertOne(blog);
        if (insertInfo.insertedCount == 0) throw "Error: Could not add blog";
        return this.getBlogById(insertInfo.insertedId.toString());
    },

    async getBlogById(id) {
        if (!id) throw "Error: No Id found";
        if (typeof id != "string" || id.trim().length == 0) throw "Error: Invalid ID";
        id = ObjectId(id);

        const blogCollection = await blogs();

        const singleBlog = await blogCollection.findOne({ _id: id });
        if (singleBlog == null) throw "Error: Blog not found with the given ID";
        singleBlog._id = singleBlog._id.toString();
        return singleBlog;
    },

    async getAllBlogs(limit, skip) {
        if (!limit) limit = 20;
        if (!skip) skip = 0;
        const blogCollection = await blogs();
        const allBlogs = await blogCollection.find({}).limit(limit).skip(skip).toArray();
        return allBlogs;
    },

    async updateBlogs(id, title, body) {
        if (!id || !title || !body) throw "Error: One or more parameters not passed";
        if (title.trim().length == 0 || body.trim().length == 0 || id.trim().length == 0) throw "Error: Invalid parameters";
        id = ObjectId(id);

        const blogCollection = await blogs();
        let blog = await blogCollection.findOne({ _id: id });
        if (!blog) throw "Error: No blog with that id";
        let updateBlog = {
            title: title,
            body: body,
        };
        const updatedInfo = await blogCollection.updateOne({ _id: id }, { $set: updateBlog });
        if (updatedInfo.modifiedCount == 0) throw "Error: Could not update blog";
        return this.getBlogById(id.toString());
    },

    async patchBlogs(id, title, body) {
        id = ObjectId(id);
        const blogCollection = await blogs();
        let blog = await blogCollection.findOne({ _id: id });
        if (!blog) throw "Error: No blog with that id";
        if (!title) title = blog.title;
        if (!body) body = blog.body;

        let updateBlog = {
            title: title,
            body: body,
        };
        const updatedInfo = await blogCollection.updateOne({ _id: id }, { $set: updateBlog });
        if (updatedInfo.modifiedCount == 0) throw "Error: Could not update blog";
        return this.getBlogById(id.toString());
    },

    async addComments(id, com, userThatPostedComment) {
        if (!id || !com || !userThatPostedComment) throw "Error: Parameters missing";
        if (id.trim().length == 0 || com.trim().length == 0) throw "Error: Invalid parameters";
        if (this.getBlogById(id) == null) throw "Error: No blog with that ID";
        id = ObjectId(id);

        const blogCollection = await blogs();

        const insertedInfo = await blogCollection.updateOne(
            { _id: id },
            {
                $push: {
                    comments: {
                        _id: ObjectId(),
                        userThatPostedComment: userThatPostedComment,
                        comment: com,
                    },
                },
            }
        );

        if (insertedInfo.insertedCount == 0) throw "Error: Could not add comments";
        return;
    },

    async removeComment(blogId, commentId) {
        if (!blogId || !commentId) throw "Error: One or more parameters mmissing";
        if (blogId.trim().length == 0 || commentId.trim().length == 0) throw "Error: Invalid parameters";
        if (this.getBlogById(blogId) == null) throw "Error: No blog with that ID";

        blogId = ObjectId(blogId);
        const blogCollection = await blogs();

        let deletedComment = await blogCollection.updateOne({ _id: blogId }, { $pull: { comments: { _id: ObjectId(commentId) } } });

        if (deletedComment.deletedCount == 0) throw "Error: Could not delete comment";
        return;
    },
};
