// noinspection JSVoidFunctionReturnValueUsed
import {SHOP_KEY, TABLES} from "@/const";
import jsonCategory from '../../assets/category.json';

export default {
    namespaced: true,
    state() {
        return {
            categoryList: [],
        };
    },
    getters: {
        getCategories(state) {
            return state.categoryList;
        },
    },
    mutations: {
        setCategories(state, data) {
            state.categoryList = data;
        },
    },
    actions: {
        loadCategories({commit}) {
            let data = JSON.parse(
                localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`));
            commit("setCategories", data);
        },
        saveCategories({commit}) {
            let data =
                localStorage.setItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`,
                    JSON.stringify(jsonCategory));
            commit("setCategories", data);
        },
        deleteCategories({commit}) {
            let data =
                localStorage.removeItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`);
            commit("setCategories", data);
        },
        updateCategories({commit}, data) {
            data =
                localStorage.setItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`,
                    JSON.stringify(data));
            commit("setCategories", data);
        },
    },
};
