// noinspection JSVoidFunctionReturnValueUsed
import {FILTERS, SHOP_KEY, TABLES} from "@/const";
import {ProductTransformer} from "@/transformers/ProductTransformer";
import EvenService from "@/services/EvenService";

export default {
    namespaced: true,
    state() {
        return {
            productList: [],
            adminList: [],
            modifiedItems:[],
        };
    },
    getters: {
        getProducts(state) {
            return state.productList;
        },
        getAdminList(state) {
            return state.adminList;
        },
        getModifiedItemsList(state) {
            return state.modifiedItems;
        }
    },
    mutations: {
        setProducts(state, data) {
            state.productList = data;
        },
        setAdminList(state, data) {
            state.adminList = data;
        },
        setModifiedItemsList(state, data) {
            state.modifiedItems = data;
        }
    },
    actions: {
        setState({commit}, newState) {
            commit("setProducts", newState);
        },
        loadLocal({commit}) {
            let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
            commit("setLocalState", data);
        },
        /**
         * Admin table saved to state ( !Data not processed through transformer! )
         * @param commit
         */
        loadProducts({commit}) {
            let jsonProducts = [];
            EvenService.getJsonProducts()
                .then(response => {
                    jsonProducts = response.data.results;
                    commit("setProducts", jsonProducts);
                }).catch(error => console.log(error));
        },
        /**
         * Fetch,process and save data to state
         * @param commit
         * @param dispatch
         */
        saveProducts: function ({commit}) {
            let products = []
            let jsonProducts = [];
            EvenService.getJsonProducts()
                .then(response => {
                    jsonProducts = response.data.results;
                    if (jsonProducts !== null) jsonProducts.forEach(item => {
                        products.push(ProductTransformer.transform(item));
                    });
                    commit("setProducts", products);
                })
                .catch(error => console.log(error));
        },
        /**
         * TODO: Admin state optimization for modifying items in AG Grid
         * @param commit
         * @param newProducts
         */
        saveModifiedProducts: function ({commit}, newProducts) {
            commit("setProducts", newProducts);
        },
        /**
         * @param commit
         * @param getters
         * @param {Product} product
         */
        // saveProduct: function ({commit, getters}, {product}) {
        //     let products = getters['getProducts'] ?? [];
        //
        //     commit("setProducts", []); // vuejs2
        //     products = products.filter(item => item.id !== product.id); // TODO: optimize find product by id and update it
        //     products.push(product);
        //     commit("setProducts", products); // vuejs2
        //
        //     let productsObj = product.map(item => ProductTransformer.reverseTransform(item));
        //     localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(productsObj));
        // },
        deleteProducts({commit, state}) {
            let data =
                localStorage.removeItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`);
            commit("setProducts", data);
            state.productList = [];
        },
        saveAdminTable({commit}) {
            let jsonProducts = [];
            EvenService.getJsonProducts()
                .then(response => {
                    jsonProducts = response.data.results;
                    commit("setAdminList", jsonProducts);
                })
                .catch(error => console.log(error));
        },
        saveModifedItemsList({commit},newData){
            commit("setModifiedItemsList", newData);
        },
        deleteAdminTable({state}) {
            state.adminList = [];
        },
        /**
         * Sort filter for selected option in select sortList HTML element
         * @param commit
         * @param state
         * @param param{String}
         */
        sortProducts({state, dispatch}, param) {
            switch (Number(param)) {
                case FILTERS.PRICE_ASC:
                    state.productList.sort((a, b) => {
                        return a.price - b.price;
                    });
                    break;
                case FILTERS.PRICE_DESC:
                    state.productList.sort((a, b) => {
                        return b.price - a.price;
                    });
                    break;
                case FILTERS.A_Z:
                    state.productList.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                        return fa < fb ? -1 : fa > fb ? 1 : 0;
                    });
                    break;
                case FILTERS.Z_A:
                    state.productList.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                        return fa < fb ? 1 : fa > fb ? -1 : 0;
                    });
                    break;
                default:
                    dispatch("loadProducts");
                    break;
            }
        },
        /**
         * Search product function in product list.
         * @param commit
         * @param getters
         * @param searched {String}
         */
        searchProduct({commit, getters}, searched) {
            if (!searched) {
                let local = getters["getProducts"] ?? [];
                commit("setProducts", local);
            } else {
                let text = getters["getProducts"] ?? [];
                let found = text.filter((item) => item.title.toLowerCase().includes(searched.toLowerCase()));
                commit("setProducts", found);
            }
        }
    },
};
