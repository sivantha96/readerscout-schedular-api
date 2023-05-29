const mongoose = require("mongoose");

const SProduct = new mongoose.Schema({
    asin: {
        type: String,
        unique: true,
    },
    title: String,
    rating: Number,
    ratings_total: Number,
    price: mongoose.Schema.Types.Mixed,
    bestsellers_rank: mongoose.Schema.Types.Mixed,
    last_modified_on: Date,
    added_on: {
        type: Date,
        default: Date.now,
    },
    link: String,
    authors: mongoose.Schema.Types.Mixed,
    cover: String,
    manual: Boolean,
});

module.exports = {
    SProduct,
};
