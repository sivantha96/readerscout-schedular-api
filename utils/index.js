module.exports = {
    setParamsToURL: (url, params) => {
        const formattedURL = new URL(url);

        Object.entries(params)?.forEach((param) => {
            const [key, value] = param;
            formattedURL.searchParams.set(key, value);
        });

        return formattedURL.toString();
    },
};
