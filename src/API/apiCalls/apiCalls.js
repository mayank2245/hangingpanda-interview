import fireAjax from '../axios/api';
import apiUrl from '../axios/url';

export const ApiService = {
    login: async payload => {
        console.log(payload, "paytolad")
        return fireAjax({
            method: 'POST',
            URL: `${apiUrl.AdminLogin}`,
            data: payload,
        });
    },
    addquestionPaper: async (payload, token) => {
        console.log(payload, "paytolad")
        return fireAjax({
            method: 'POST',
            URL: `${apiUrl.addquestionpaper}`,
            data: payload,
            token,
        });
    }
};
