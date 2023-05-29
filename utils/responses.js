module.exports = {
    sendSuccessResponse: (data) => ({
        statusCode: 200,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ error: false, message: "Success", data }),
    }),
    sendBadRequestResponse: () => ({
        statusCode: 422,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ error: true, message: "Bad Request" }),
    }),
    sendUnauthorizedResponse: () => ({
        statusCode: 401,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ error: true, message: "Unauthorized" }),
    }),
    sendUnprocessableEntityResponse: (message) => ({
        statusCode: 422,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ error: true, message }),
    }),
    sendInternalServerErrorResponse: () => ({
        statusCode: 500,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ error: true, message: "Internal Server Error" }),
    }),
    sendNotFoundResponse: () => ({
        statusCode: 404,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ error: true, message: "Not Found" }),
    }),
};
