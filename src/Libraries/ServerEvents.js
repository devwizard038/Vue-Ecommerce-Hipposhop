import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://10.194.200.12',
    withCredentials: false,
    headers: {
        Accept: 'applications/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getJsonProducts() {
        return apiClient.get('/products.php');
    },
    getUserList() {
        return apiClient.get('/users.php');
    },
    getCategoryList() {
        return apiClient.get('/categories.php');
    },
    postJsonProducts(itemToSent) {
        return apiClient.post('/products.php', itemToSent);
    },
    postNewUser(itemToSent) {
        return apiClient.post('/users.php', itemToSent);
    },
    deleteProduct(productIdToSent){
        return apiClient.delete('/products.php', {data: [{'id': productIdToSent}] });
    },
    deleteUser(userIdToSent){
        return apiClient.delete('/users.php', {data: [{'id': userIdToSent}] });
    }
};