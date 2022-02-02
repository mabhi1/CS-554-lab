const express = require("express");
const app = express();
app.use(express.json);

const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

app.get("/api/people/:id", async (req, res) => {
    try {
        const user = await data.getById(req.params.id);
        res.json(user);
        let users = await client.existsAsync("users");
        if (!users) {
            console.log("users");
        }
    } catch (e) {
        console.log(e);
        res.status(404).send(e.message);
    }
});
app.use("*", async (req, res) => {
    res.status(404).json({ error: "404! Not Found" });
});

app.listen(3001, () => {
    console.log("Server started at port 3000");
});
