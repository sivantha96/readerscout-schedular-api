const mongoose = require("mongoose");
const { DB_COLLECTIONS } = require("../constants");
const { SLog } = require("../models/log.model");
const { SProduct } = require("../models/product.model");
const { SUser } = require("../models/user.model");
const { SWatchItem } = require("../models/watch-item.model");

function getModel(model) {
    try {
        return mongoose.model(model);
    } catch (e) {
        switch (model) {
            case DB_COLLECTIONS.PRODUCTS:
                return mongoose.model(DB_COLLECTIONS.PRODUCTS, SProduct);

            case DB_COLLECTIONS.USERS:
                return mongoose.model(DB_COLLECTIONS.USERS, SUser);

            case DB_COLLECTIONS.WATCH_ITEMS:
                return mongoose.model(DB_COLLECTIONS.WATCH_ITEMS, SWatchItem);

            case DB_COLLECTIONS.LOGS:
                return mongoose.model(DB_COLLECTIONS.LOGS, SLog);

            default:
                return null;
        }
    }
}

module.exports = {
    getModel,
};
