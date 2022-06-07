// noinspection JSVoidFunctionReturnValueUsed

import {SHOP_KEY, TABLES} from "@/const";
import jsonProducts from "@/assets/products.json";

export default {
    namespaced: true,
    state() {
        return {
            productList: [],
        };
    },
    getters: {
        getProducts(state) {
            return state.productList;
        },
    },
    mutations: {
        setProducts(state, data) {
            state.productList = data;
        },
    },
    actions: {
        loadProducts({commit}) {
            let data = JSON.parse(
                localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
            commit("setProducts", data);
        },
        saveProducts({commit}) {
            let data =
                localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`,
                    JSON.stringify(jsonProducts));
            commit("setProducts", data);
        },
        deleteProducts({commit}) {
            let data =
                localStorage.removeItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`);
            commit("setProducts", data);
        },
    },
};
