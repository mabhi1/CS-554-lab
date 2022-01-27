const express = require("express");
const router = express.Router();
const data = require("../data");
const blog = data.blog;
const users = data.user;
const { ObjectId } = require("mongodb");

router.post("/", async (req, res) => {
    const userThatPosted = { _id: req.session._id, username: req.session.username };
    title = req.body.title;
    body = req.body.body;
    if (!title || !body) {
        res.status(400).json({ error: "One or more parameters not passed" });
        return;
    }
    if (title.trim().length == 0 || body.trim().length == 0) {
        res.status(400).json({ error: "Invalid Parameters passed" });
        return;
    }
    try {
        let createdBlog = await blog.createBlog(title, body, userThatPosted);
        res.send(createdBlog);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get("/logout", async (req, res) => {
    if (req.session.username) {
        let username = req.session.username;
        req.session.destroy();
        res.json({ success: username + " logged out successfully" });
        return;
    } else {
        res.status(400).json({ error: "No user is logged in" });
    }
});

router.get("/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ Error: "No Id found" });
        return;
    }
    if (typeof req.params.id != "string" || req.params.id.trim().length == 0) {
        res.status(400).json({ error: "Invalid ID" });
        return;
    }
    try {
        let requiredBlog = await blog.getBlogById(req.params.id);
        res.json(requiredBlog);
    } catch (e) {
        res.status(404).json({ error: "No restaurant with that ID" });
    }
});

router.get("/", async (req, res) => {
    let limit = 20;
    let skip = 0;
    if (req.query.take) {
        if (isNaN(req.query.take) || req.query.take < 0) {
            res.status(400).json({ error: "Invalid take value" });
            return;
        }
        limit = parseInt(req.query.take);
        if (limit > 100) limit = 100;
    }
    if (req.query.skip) {
        if (isNaN(req.query.skip) || req.query.skip < 0) {
            res.status(400).json({ error: "Invalid skip value" });
            return;
        }
        skip = parseInt(req.query.skip);
    }
    try {
        const blogs = await blog.getAllBlogs(limit, skip);
        if (blogs.length == 0) {
            res.status(404).json({ error: "No blogs with given take and skip values" });
            return;
        }
        res.send(blogs);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put("/:id", async (req, res) => {
    title = req.body.title;
    body = req.body.body;
    if (!title || !body) {
        res.status(400).json({ error: "One or more parameters not passed" });
        return;
    }
    if (title.trim().length == 0 || body.trim().length == 0) {
        res.status(400).json({ error: "Invalid Parameters passed" });
        return;
    }
    try {
        const returnedBlog = await blog.getBlogById(req.params.id);
        if (returnedBlog.userThatPosted._id !== req.session._id) {
            res.status(401).json({ error: "Unauthorized Access" });
            return;
        }
    } catch (e) {
        res.status(404).json({ error: "No blog with that ID" });
        return;
    }
    try {
        let updatedBlog = await blog.updateBlogs(req.params.id, title, body);
        res.send(updatedBlog);
    } catch (e) {
        res.status(500).json({ error: "Could not update blog" });
    }
});

router.patch("/:id", async (req, res) => {
    let currentBlog = {};
    try {
        currentBlog = await blog.getBlogById(req.params.id);
        if (currentBlog.userThatPosted._id !== req.session._id) {
            res.status(401).json({ error: "Unauthorized Access" });
            return;
        }
    } catch (e) {
        res.status(404).json({ error: "No blog with that ID" });
        return;
    }
    let title = "";
    let body = "";
    if (!req.body.title) title = currentBlog.title;
    else title = req.body.title;
    if (!req.body.body) body = currentBlog.body;
    else body = req.body.body;
    try {
        let updatedBlog = await blog.patchBlogs(req.params.id, title, body);
        res.send(updatedBlog);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Could not update blog" });
    }
});

router.post("/:id/comments", async (req, res) => {
    userThatPostedComment = { _id: req.session._id, username: req.session.username };
    let comment = req.body.comment;
    let blogId = req.params.id;
    if (!blogId || !comment) {
        res.status(400).json({ error: "No parameters provided" });
        return;
    }
    if (blogId.trim().length == 0 || comment.trim().length == 0) {
        res.status(400).json({ error: "Invalid parameters" });
        return;
    }
    try {
        await blog.getBlogById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "No blog with that ID" });
        return;
    }
    try {
        await blog.addComments(blogId, comment, userThatPostedComment);
        res.json({ success: "Comment successfully added" });
    } catch (e) {
        res.status(500).json({ error: "Could not add comments" });
    }
});

router.delete("/:blogId/:commentId", async (req, res) => {
    blogId = req.params.blogId;
    commentId = req.params.commentId;
    if (!blogId || !commentId) {
        res.status(400).json({ error: "Incomplete parameters" });
        return;
    }
    if (blogId.trim().length == 0 || commentId.trim().length == 0) {
        res.status(400).json({ error: "Invalid parameters" });
        return;
    }
    let commentFound = false;
    try {
        const blogReturned = await blog.getBlogById(blogId);
        for (let comment of blogReturned.comments) {
            if (comment._id.toString() == commentId) {
                commentFound = true;
                if (comment.userThatPostedComment._id == req.session._id) {
                    break;
                } else {
                    res.status(401).json({ error: "Unauthorized Access" });
                    return;
                }
            }
        }
        if (commentFound == false) {
            res.status(404).json({ error: "Comment does not exist" });
            return;
        }
    } catch (e) {
        console.log(e);
        res.status(404).json({ error: "No blog with that ID" });
        return;
    }

    try {
        await blog.removeComment(blogId, commentId);
        res.json({ success: "Comment successfully deleted" });
    } catch (e) {
        res.status(500).json({ error: "Could not delete comments" });
    }
});

router.post("/signup", async (req, res) => {
    if (req.session.username) {
        res.status(400).json({ error: "already logged in user : " + req.session.username });
        return;
    }
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    if (!name || !username || !password) {
        res.status(400).json({ error: "Incomplete parameters" });
        return;
    }
    if (
        name.trim().length == 0 ||
        username.trim().length == 0 ||
        password.trim().length == 0 ||
        !username.match(/^[A-Za-z0-9]+$/) ||
        password.match(/\s/g)
    ) {
        res.status(400).json({ error: "Invalid parameters" });
        return;
    }
    try {
        let user = await users.addUser(name, username, password);
        res.send(user);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post("/login", async (req, res) => {
    if (req.session.username) {
        res.status(400).json({ error: "already logged in user : " + req.session.username });
        return;
    }
    username = req.body.username;
    password = req.body.password;
    if (!username || !password) {
        res.status(400).json({ error: "Incomplete parameters" });
        return;
    }
    if (username.trim().length == 0 || password.trim().length == 0 || !username.match(/^[A-Za-z0-9]+$/) || password.match(/\s/g)) {
        res.status(400).json({ error: "Invalid parameters" });
        return;
    }
    try {
        const ifUser = await users.login(username, password);
        req.session.username = ifUser.username;
        req.session._id = ifUser._id;
        res.send(ifUser);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

module.exports = router;
