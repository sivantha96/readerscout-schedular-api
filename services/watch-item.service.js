const { DB_COLLECTIONS } = require("../constants");
const { getModel } = require("../database/models.database");
const { sendSuccessResponse } = require("../utils/responses");
const { CommonService } = require("./common.service");

class WatchItemService extends CommonService {
    constructor() {
        super(getModel(DB_COLLECTIONS.WATCH_ITEMS));
    }

    async addToWatchlist(product, user) {
        const filter = {
            product: product._id,
            user: user._id,
        };

        const data = {
            product: product._id,
            user: user._id,
        };

        const savedWatchItem = await super.findOneAndUpdate(filter, data, {
            upsert: true,
            new: true,
        });

        const populatedItem = await super.findById(savedWatchItem._id, "product");

        return sendSuccessResponse(populatedItem);
    }

    async incrementAllWatchlistNotification(productId, hasRatingUpdate, hasPriceUpdate) {
        return super.updateMany(
            { product: productId },
            {
                $inc: {
                    notifications_rating: hasRatingUpdate ? 1 : 0,
                    notifications_price: hasPriceUpdate ? 1 : 0,
                },
            }
        );
    }

    async resetNotificationsOfUser(userId) {
        return super.updateMany(
            { user: userId },
            {
                $set: {
                    notifications_rating: 0,
                    notifications_price: 0,
                },
            }
        );
    }
}

exports.WatchItemService = WatchItemService;
