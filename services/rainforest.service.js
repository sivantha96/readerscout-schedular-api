const axios = require("axios").default;
const { ERRORS, RAINFOREST_COLLECTION_NAME, URLS } = require("../constants");

class RainforestService {
    constructor() {
        this.API_KEY = process.env.RAINFOREST_API_KEY;
    }

    /**
     * @param {string} name - name of the collection
     * check the status of the collection idle/queued/running before adding to the collection
     */
    findCollection = async (name) => {
        const url = URLS.RAINFOREST_COLLECTIONS;

        const options = {
            params: {
                api_key: this.API_KEY,
                search_term: name,
            },
        };

        const res = await axios.get(url, options);
        const data = res.data.collections?.[0];

        if (!data) throw new Error(ERRORS.INTERNAL_SERVER_ERROR);

        return data;
    };

    getMostRecentResults = async (collectionId) => {
        const url = `${URLS.RAINFOREST_COLLECTIONS}/${collectionId}/results`;

        const options = {
            params: {
                api_key: this.API_KEY,
            },
        };

        const res = await axios.get(url, options);
        const data = res.data.results?.[0];

        if (!data) throw new Error(ERRORS.INTERNAL_SERVER_ERROR);

        return data;
    };

    /**
     *
     * @param {string} collectionId - collection id of the
     * @param {string} resultId
     * @returns
     */
    getResultSet = async (collectionId, resultId) => {
        const url = `${URLS.RAINFOREST_COLLECTIONS}/${collectionId}/results/${resultId}`;
        const options = {
            params: {
                api_key: this.API_KEY,
            },
        };

        const res = await axios.get(url, options);
        const data = res.data.result;

        if (!data) throw new Error(ERRORS.INTERNAL_SERVER_ERROR);

        return data;
    };

    /**
     * check the status of the collection idle/queued/running before adding to the collection
     */
    getAllCollections = async (name) => {
        const url = URLS.RAINFOREST_COLLECTIONS;

        const options = {
            params: {
                api_key: this.API_KEY,
                search_term: name || `${RAINFOREST_COLLECTION_NAME}_${process.env.ENVIRONMENT}`,
                sort_by: "created_at",
                sort_direction: "descending",
            },
        };

        const res = await axios.get(url, options);
        const data = res.data.collections;

        if (!data) throw new Error(ERRORS.INTERNAL_SERVER_ERROR);

        return data;
    };

    addToCollection = async (collectionId, products) => {
        const url = `${URLS.RAINFOREST_COLLECTIONS}/${collectionId}`;

        const body = {
            requests: products.map((item) => ({
                type: "product",
                amazon_domain: "amazon.com",
                asin: item.product.asin,
                custom_id: item.product._id.toString(),
            })),
        };

        const options = {
            params: {
                api_key: this.API_KEY,
            },
        };

        await axios.put(url, body, options);
        return true;
    };

    deleteCollection = async (collectionId) => {
        const url = `${URLS.RAINFOREST_COLLECTIONS}/${collectionId}`;

        const options = {
            params: {
                api_key: this.API_KEY,
            },
        };

        await axios.delete(url, options);
        return true;
    };

    deleteAllCollections = async (collections) => {
        const deleteAllConnections = collections.map(async (collection) => {
            return this.deleteCollection(collection.id);
        });

        await Promise.all(deleteAllConnections);
        return true;
    };

    createCollection = async (name) => {
        const url = URLS.RAINFOREST_COLLECTIONS;

        const body = {
            name,
            enabled: true,
            schedule_type: "manual",
            priority: "normal",
            notification_as_json: true,
            notification_webhook: URLS.INFO_API,
        };

        const options = {
            params: {
                api_key: this.API_KEY,
            },
        };

        const res = await axios.post(url, body, options);
        return res.data.collection;
    };

    startCollection = async (collectionId) => {
        const url = `${URLS.RAINFOREST_COLLECTIONS}/${collectionId}/start`;

        console.log("Starting");
        const options = {
            params: {
                api_key: this.API_KEY,
            },
        };

        await axios.get(url, options);
    };
}

exports.RainforestService = RainforestService;
