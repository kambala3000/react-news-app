import axios from 'axios';

import { apiPrefix } from '../../server/config.json';

export default {
    listArticles() {
        return axios.get(`${apiPrefix}/articles`)
        .then(response => response.data);
    },

    createArticle(data) {
        return axios.post(`${apiPrefix}/articles`, data);
    },

    updateArticle(id, data) {
        return axios.put(`${apiPrefix}/articles/${id}`, data);
    },

    deleteArticle(id) {
        return axios.delete(`${apiPrefix}/articles/${id}`);
    }
};