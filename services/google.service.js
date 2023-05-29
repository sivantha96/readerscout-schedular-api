const axios = require("axios").default;
const { ERRORS } = require("../constants");

class GoogleService {
    async getUserInfo(authHeader) {
        if (!authHeader) throw new Error(ERRORS.UNAUTHORIZED);

        const url = "https://www.googleapis.com/oauth2/v3/userinfo";
        const options = {
            headers: {
                Authorization: authHeader,
            },
        };

        try {
            const res = await axios.get(url, options);
            return res.data;
        } catch (error) {
            throw new Error(ERRORS.UNAUTHORIZED);
        }
    }
}

exports.GoogleService = GoogleService;
