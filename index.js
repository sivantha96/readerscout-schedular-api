const connection = require("./database/connection.database");
const { sendInternalServerErrorResponse, sendSuccessResponse } = require("./utils/responses");
const { RainforestService } = require("./services/rainforest.service");
const { UserService } = require("./services/user.service");
const { RAINFOREST_COLLECTION_NAME } = require("./constants");

exports.handler = async () => {
    try {
        await connection.connect();

        // get all the collection starting with BOOKSHOPPER
        const rainforestService = new RainforestService();
        console.log("Getting all the existing rainforest collections");
        const collections = await rainforestService.getAllCollections();

        // delete all the collections
        console.log("Deleting all the existing rainforest collections");
        await rainforestService.deleteAllCollections(collections);

        // filter allProducts with only the required products (prioritization logic)
        console.log("Querying for all the updatable products");
        const userService = new UserService();
        const results = await userService.getPriorityProductsOfUsers();

        console.log("Number of updatable products", results.length);

        // if there are no results, then end
        if (results.length === 0) {
            console.log("Schedular completed the batch update successfully");
            return sendSuccessResponse();
        }

        // handle the 15000 limit of requests per collection
        const collectionChunkSize = 15000;
        const numOfSets = Math.ceil(results.length / collectionChunkSize);

        for (let i = 0; i < numOfSets; i += 1) {
            // create the collection to hold 15000 requests
            const collection = await rainforestService.createCollection(
                `${RAINFOREST_COLLECTION_NAME}_${process.env.ENVIRONMENT}_${i + 1}`
            );

            const collectionChunk = results.slice(
                i * collectionChunkSize,
                i * collectionChunkSize + collectionChunkSize
            );

            // handle the 1000 limit of requests per API call
            const requestChunkSize = 1000;
            const numOfApiCallSets = Math.ceil(collectionChunk.length / requestChunkSize);

            for (let j = 0; j < numOfApiCallSets; j += 1) {
                const apiCallChunk = collectionChunk.slice(
                    j * requestChunkSize,
                    j * requestChunkSize + requestChunkSize
                );
                await rainforestService.addToCollection(collection.id, apiCallChunk);
            }

            await rainforestService.startCollection(collection.id);
        }

        return sendSuccessResponse();
    } catch (error) {
        console.log(error);
        return sendInternalServerErrorResponse();
    }
};
