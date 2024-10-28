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
        console.log("first12344");
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return axios.post(URL, data, { headers }) // Pass headers directly
            .then(
                res => res,
                error => {
                    // Check if a retry is needed on 401 status
                    if (error.response?.status === 401 && token) {
                        // Retry with token in headers
                        return axios.post(URL, data, { headers });
                    } else {
                        // Other errors
                        throw error; // Ensure other errors are handled as needed
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
