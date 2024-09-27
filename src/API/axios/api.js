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
        // Code: code,
    };

    URL = config.BaseURL + URL;

    let headers = { ...headerData };
    if (method === 'POST') {
        if (token) {
            headers = {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        return axios.post(URL, data).then(
            res => {
                return res;
            },
            error => {
                if (error.response.status === 401) {
                    return axios.post(URL, data, headers);
                } else {
                    return axios.post(URL, data, headers);
                }
            }
        );
    } else if (method === 'GET') {
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
