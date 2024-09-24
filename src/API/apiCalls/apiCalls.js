import fireAjax from '../axios/api';
import apiUrl from '../axios/url';

export const ApiService = {
    login: async payload => {
        console.log(payload, "-----------paytolad123")
        return fireAjax({
            method: 'POST',
            URL: `${apiUrl.AdminLogin}`,
            data: payload,
        });
    },
    addquestionPaper: async (payload, token) => {
        console.log(token, "-------------token token")
        console.log(payload, "--------------paytolad")
        return fireAjax({
            method: 'POST',
            URL: `${apiUrl.addquestionpaper}`,
            data: payload,
            token,
        });
    },
    questionPaper: async (token) => {
        return fireAjax({
            method: 'GET',
            URL: `${apiUrl.addquestionpaper}`,
            token,
        });
    },
    singleQuestionPaper: async (token, paperId) => {
        console.log(token, "-------------token token")
        console.log(paperId, "--------------paytolad")
        return fireAjax({
            method: 'GET',
            URL: `${apiUrl.singlequestionpaper}${paperId}`,
            token,
        })
    }
};
