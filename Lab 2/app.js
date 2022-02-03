const express = require("express");
const app = express();

const users = require("./routes");
app.use("/api/people", users);

app.use("*", async (req, res) => {
    res.status(404).json({ error: "404! Not Found" });
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
