const mongoose = require("mongoose");
const { DB_COLLECTIONS } = require("../constants");
const { getModel } = require("./models.database");

let conn = null;

const uri = process.env.MONGO_URL;

exports.connect = async function () {
    if (conn == null) {
        conn = mongoose
            .connect(uri, {
                serverSelectionTimeoutMS: 5000,
            })
            .then(() => mongoose);
        await conn;

        // initialize models
        getModel(DB_COLLECTIONS.PRODUCTS);
        getModel(DB_COLLECTIONS.USERS);
        getModel(DB_COLLECTIONS.WATCH_ITEMS);
        getModel(DB_COLLECTIONS.LOGS);
    }
    return conn;
};
