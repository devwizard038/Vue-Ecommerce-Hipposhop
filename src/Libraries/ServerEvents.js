import axios from "axios";

let headers = {
  Accept: "applications/json",
  "Content-Type": "application/json",
};

const apiClient = axios.create({
  baseURL:
    "https://hippo-shop-80389-default-rtdb.europe-west1.firebasedatabase.app",
  withCredentials: false,
  // Firebase database GET request requires host headers.
  // hostUpdate overwrites chrome or other browser auto-value host header.
  // not safe option but works for free plan on firebase.
  hostUpdate: "hippo-shop-80389-default-rtdb.europe-west1.firebasedatabase.app",
  headers: headers,
});

export default {
  getJsonProducts() {
    return apiClient.get("/database.json");
  },
  getUserList() {
    return apiClient.get("/users.php");
  },
  getCategoryList() {
    return apiClient.get("/database.json");
  },
  postJsonProducts(itemToSent) {
    return apiClient.post("/products.php", itemToSent);
  },
  postNewUser(itemToSent) {
    return apiClient.post("/users.php", itemToSent);
  },
  deleteProduct(productIdToSent) {
    return apiClient.delete("/products.php", {
      data: [{ id: productIdToSent }],
    });
  },
  deleteUser(userIdToSent) {
    return apiClient.delete("/users.php", { data: [{ id: userIdToSent }] });
  },
};
