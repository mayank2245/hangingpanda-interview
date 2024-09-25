import fireAjax from '../axios/Api';
import apiUrl from '../axios/Url';

export const ApiService = {
    login: async payload => {
        return fireAjax({
            method: 'POST',
            URL: `${apiUrl.AdminLogin}`,
            data: payload,
        });
    },
    addquestionPaper: async (payload, token) => {
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
        return fireAjax({
            method: 'GET',
            URL: `${apiUrl.singlequestionpaper}${paperId}`,
            token,
        })
    },
    QuestionPaperType: async () => {
        return fireAjax({
            method: 'GET',
            URL: `${apiUrl.allQuestionPaperType}`,
        })
    }
};