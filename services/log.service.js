const { DB_COLLECTIONS } = require("../constants");
const { getModel } = require("../database/models.database");
const { CommonService } = require("./common.service");

class LogService extends CommonService {
    constructor() {
        super(getModel(DB_COLLECTIONS.LOGS));
    }
}

exports.LogService = LogService;
