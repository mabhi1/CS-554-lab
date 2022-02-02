const express = require("express");
const router = express.Router();
const data = require("./data");

const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
console.log(client);
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/:id", async (req, res) => {
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

module.exports = router;
