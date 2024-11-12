import axios from 'axios';
import config from './Config';

axios.defaults.timeout = 30000;

export default async function fireAjax({
    method,
    URL,
    data,
    header,
    token,
    code,
}) {
    const headerData = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    URL = config.BaseURL + URL;

    let headers = { ...headerData };

    if (method === 'POST') {
        if (token) {
            console.log("Adding token to headers");
            headers = {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        return axios.post(URL, data, headers).then(
            res => {
                console.log("Request successful");
                return res;
            },
            error => {
                if (error.response && error.response.status === 401) {
                    console.log("Token expired or invalid, retrying request");
                    return axios.post(URL, data, headers);
                } else {
                    console.log("Request failed with error", error);
                    return Promise.reject(error);
                }
            }
        );
    }
    else if (method === 'GET') {
        if (token) {
            headers = {
                headers: {
                    ...headers.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        if (header) {
            headers = header;
        }
        return axios.get(URL, headers).then(
            res => {
                return res;
            },
            error => {
                if (error.response.status === 401) {
                    return axios.get(URL, headers);
                } else {
                    return axios.get(URL, headers);
                }
            },
        );
    }
}
