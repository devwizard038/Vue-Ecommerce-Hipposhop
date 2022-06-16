// noinspection JSVoidFunctionReturnValueUsed

import {SHOP_KEY, TABLES} from "@/const";
import jsonProducts from "@/assets/products (4).json";

export default {
    namespaced: true,
    state() {
        return {
            productList: [],
            searchedProduct:[],
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
        /**
         * Process data and save to localStorage
         * @param commit
         */
        saveProducts({commit}) {
            let data = jsonProducts;
            if(data != undefined) {
                data.forEach(item => {
                    let obj={};
                    if (item.Attributes != null) {
                        let attr = item.Attributes.split(',');
                        attr.forEach(n => {
                            let tup = n.split(':');
                            obj[tup[0]] = tup[1];
                        });
                        item.Attributes = obj;
                    }
                });
            }
            localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`,JSON.stringify(data));
            commit("setProducts", data);
        },
        deleteProducts({commit}) {
            let data =
                localStorage.removeItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`);
            commit("setProducts", data);
        },
        /**
         * Sort filter for selected option in select sortList HTML element
         * @param commit
         * @param state
         * @param param{String}
         */
        sortProducts({commit,state},param) {
            if (param == 1) {
                let local = state.productList;
                local.sort((a, b) => {
                    return a.price - b.price;
                });
                commit("setProducts", local);
            } else if (param == 2) {
                let local = state.productList;
                local.sort((a, b) => {
                    return b.price - a.price;
                });
                commit("setProducts", local);
            } else if (param == 3) {
                let local = state.productList;
                local.sort((a, b) => {
                    let fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                commit("setProducts", local);
            } else if (param == 4) {
                let local = state.productList;
                local.sort((a, b) => {
                    let fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();

                    if (fa < fb) {
                        return 1;
                    }
                    if (fa > fb) {
                        return -1;
                    }
                    return 0;
                });
                commit("setProducts", local);
            } else{
                let local = JSON.parse(
                    localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
                commit("setProducts", local);
            }
        },
        /**
         * Search product function in product list.
         *  - only matches ENTIRE words, not letters or numbers in them !
         *  - TO FIX: ! Only matches one word ! It returns empty state for multiple word !!
         * @param commit
         * @param searched {String}
         */
        searchProduct({commit},searched){
            if(searched == "") {
                let local = JSON.parse(
                    localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
                commit("setProducts",local);
            } else {
                let found = [];
                let text = JSON.parse(
                    localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
                let newSearched = new RegExp(`\\b${searched}\\b`,'i');
                text.forEach(item => {
                    if(item.title.match(newSearched) != null){
                        found.push(item);
                    }
                });
                commit("setProducts",found);
            }
        }
    },
};
