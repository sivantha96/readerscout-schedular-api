module.exports = {
    DB_COLLECTIONS: {
        PRODUCTS: "products",
        USERS: "users",
        WATCH_ITEMS: "watch-items",
        LOGS: "logs",
    },
    ERRORS: {
        DATABASE_ERROR: "DATABASE_ERROR",
        INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    },
    RAINFOREST_COLLECTION_NAME: "READER_SCOUT",
    URLS: {
        GOOGLE_OAUTH: "https://www.googleapis.com/oauth2/v3/userinfo",
        RAINFOREST_REQUEST: "https://api.rainforestapi.com/request",
        RAINFOREST_COLLECTIONS: "https://api.rainforestapi.com/collections",
        WORDPRESS: `${process.env.WORDPRESS_BASE_URL}/wp-json/rs/v1/user`,
        INFO_API: process.env.INFO_API,
        SCHEDULAR_API: process.env.SCHEDULAR_API,
    },
    PROVIDERS: {
        GOOGLE: "GOOGLE",
        AMAZON: "AMAZON",
    },
};
