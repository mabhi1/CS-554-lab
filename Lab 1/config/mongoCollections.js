const dbConnection = require("./mongoConnections");

const getCollection = (collection) => {
    let _col = undefined;
    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col;
    };
};

module.exports = {
    blogs: getCollection("blogs"),
    users: getCollection("users"),
};
