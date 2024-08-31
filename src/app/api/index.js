import apiClient from "@/app/api/Clients/apiClient.js";


class Client {
    async getPopularCategories() {
        return apiClient.get('/categories/popular')
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(error);
                return null;
            });
    }

    async getArticle(id) {
        return apiClient.get(`/article/${id}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(error);
                return null;
            });
    }

    async addComment(article_id, data) {
        return apiClient.post('/comment/add', {
            article_id: article_id,
            message: data.message,
            name: data.name
        }).then((response) => {
                return response;
            }).catch((error) => {
                return error.response;
            });
    }

    async getArticlesPaginate(page, search = null, category = null){
        return apiClient.get(`/articles/paginate?page=${page}&search=${search}&category=${category}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(error);
                return null;
            });
    }

}

export default Client;