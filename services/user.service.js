const { DB_COLLECTIONS } = require("../constants");
const { getModel } = require("../database/models.database");
const { CommonService } = require("./common.service");

const oneDayAgo = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);

class UserService extends CommonService {
    constructor() {
        super(getModel(DB_COLLECTIONS.USERS));
    }

    async getPriorityProductsOfUsers() {
        return this.model
            .aggregate([
                {
                    $lookup: {
                        from: DB_COLLECTIONS.WATCH_ITEMS,
                        localField: "_id",
                        foreignField: "user",
                        as: "_watch_item",
                    },
                },
                {
                    $unwind: {
                        path: "$_watch_item",
                    },
                },
                {
                    $lookup: {
                        from: DB_COLLECTIONS.PRODUCTS,
                        localField: "_watch_item.product",
                        foreignField: "_id",
                        as: "_product",
                    },
                },
                {
                    $unwind: {
                        path: "$_product",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        products: { $push: "$_product" },
                        total_notifications_rating: {
                            $sum: {
                                $sum: "$_watch_item.notifications_rating",
                            },
                        },
                        total_notifications_price: {
                            $sum: {
                                $sum: "$_watch_item.notifications_price",
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        products: {
                            $filter: {
                                input: "$products",
                                as: "product",
                                cond: { $lte: ["$$product.last_modified_on", oneDayAgo] },
                            },
                        },
                        total_notifications_rating: 1,
                        total_notifications_price: 1,
                    },
                },
                {
                    $match: {
                        "products.0": {
                            $exists: true,
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        user_id: "$_id",
                        product: {
                            $first: "$products",
                        },
                        total_notifications_rating: 1,
                        total_notifications_price: 1,
                    },
                },
                {
                    $match: {
                        $and: [
                            {
                                total_notifications_rating: { $lt: 1 },
                            },
                            {
                                total_notifications_price: { $lt: 1 },
                            },
                        ],
                    },
                },
                {
                    $group: {
                        _id: "$product._id",
                        root: { $first: "$$ROOT" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        product: "$root.product",
                        user_id: "$root.user_id",
                    },
                },
            ])
            .allowDiskUse(true)
            .exec();
    }
}

exports.UserService = UserService;
