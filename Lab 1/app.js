// using express
const express = require("express");
const app = express();
app.use(express.json());

// session and cookie for user login
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
    session({
        name: "AuthCookie",
        secret: "key",
        saveUninitialized: true,
        resave: false,
    })
);

// Midlewares
const loginMiddleware = async (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.status(401).json({ error: "You must be logged in" });
    }
};
app.post("/blog/:id/comments", loginMiddleware);
app.delete("/blog/:blogId/:commentId", loginMiddleware);
app.put("/blog/:id", loginMiddleware);
app.post("/blog", loginMiddleware);
app.patch("/blog/:id", loginMiddleware);

// routes config for server
const blog = require("./routes/blog");
app.use("/blog", blog);
app.use("*", (req, res) => {
    res.status(404).json({ error: "URL not found" });
});

// start server on port 3000
app.listen(3000, () => {
    console.log("Your routes will be running on http://localhost:3000");
});
