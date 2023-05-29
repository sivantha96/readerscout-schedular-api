const { ERRORS } = require("../constants");

const errorHandler = (error) => {
    switch (error?.message) {
        case ERRORS.DATABASE_ERROR:
            console.log("DATABASE_ERROR", error);
            break;

        case ERRORS.INTERNAL_SERVER_ERROR:
            console.log("INTERNAL_SERVER_ERROR", error);
            break;

        default:
            console.log("ERROR_HANDLER", error);
            break;
    }
};

module.exports = {
    errorHandler,
};
