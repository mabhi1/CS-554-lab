const express = require("express");
const router = express.Router();
const data = require("./data");

const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/history", async (req, res) => {
    try {
        let history = await client.lrangeAsync("list", 0, 19);
        res.json(history.map(JSON.parse));
    } catch (e) {
        console.log(e);
        res.status(404).send(e.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        if ((await client.hexistsAsync("users", req.params.id)) === 1) {
            const user = await client.hmgetAsync("users", req.params.id);
            res.json(JSON.parse(user));
            await client.lpushAsync("list", user);
            return;
        } else {
            const user = await data.getById(req.params.id);
            res.json(user);
            await client.hmsetAsync("users", req.params.id, JSON.stringify(user));
            await client.lpushAsync("list", JSON.stringify(user));
            return;
        }
    } catch (e) {
        console.log(e);
        res.status(404).send(e.message);
    }
});

module.exports = router;
