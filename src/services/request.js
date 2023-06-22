class Request {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * Makes a request to fetch data from the API.
     * @param {string} endpoint - The specific endpoint of the API.
     * @returns {Promise<any>} - A promise that resolves with the retrieved data.
     */

    async getData(endpoint) {
        try {
            const path = `${this.baseUrl}/${endpoint}`;
            const response = await fetch(path)
                .then((response) => response.json())
                .then((data) => data);
            return response;
        } catch (error) {
            return [];
        }
    }
}

export default Request;