const db = require("../config/mongoCollections");
const users = db.users;
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

module.exports = {
    async addUser(name, username, password) {
        if (!name || !username || !password) throw "Error: Incomplete parameters";
        if (
            name.trim().length == 0 ||
            username.trim().length == 0 ||
            password.trim().length == 0 ||
            !username.match(/^[A-Za-z0-9]+$/) ||
            password.match(/\s/g)
        )
            throw "Error: Invalid parameters";

        username = username.toLowerCase();
        password = await bcrypt.hash(password, 8);

        const userCollection = await users();

        let newUser = await userCollection.findOne({ username: username });
        if (newUser) throw "Error: username already exist";

        newUser = {
            name: name,
            username: username,
            password: password,
        };
        let insertedUser = await userCollection.insertOne(newUser);
        if (insertedUser.insertedCount == 0) throw "Error: User can't be created";
        newUser = await userCollection.findOne({ _id: insertedUser.insertedId });
        return newUser;
    },

    async login(username, password) {
        if (!username || !password) throw "Error: Incomplete parameters";
        if (username.trim().length == 0 || password.trim().length == 0 || !username.match(/^[A-Za-z0-9]+$/) || password.match(/\s/g))
            throw "Error: Invalid parameters";

        const userCollection = await users();

        const user = await userCollection.findOne({ username: username });
        if (!user) {
            throw "Either username or password is incorrect";
        } else {
            if (await bcrypt.compare(password, user.password)) return user;
            else throw "Either username or password is incorrect";
        }
    },
};
