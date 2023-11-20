/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
    // Configure axios for tests to use.
    const host = process.env.HOST ?? '127.0.0.1';
    const port = process.env.PORT ?? '3100';
    axios.defaults.baseURL = `http://${host}:${port}`;
};
