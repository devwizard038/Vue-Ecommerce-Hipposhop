// noinspection JSVoidFunctionReturnValueUsed
import {FILTERS, SHOP_KEY, TABLES} from "@/const";
// import jsonProducts from "@/assets/products (4).json";
// import {Product} from "@/models/Product";
import {ProductTransformer} from "@/transformers/ProductTransformer";
import EvenService from "@/services/EvenService";

export default {
    namespaced: true,
    state() {
        return {
            productList: [],
            localList:[],
        };
    },
    getters: {
        getProducts(state) {
            return state.productList;
        },
        getLocalStorageList(state){
            return state.localList;
        }
    },
    mutations: {
        setProducts(state, data) {
            state.productList = data;
        },
        setLocalState(state,data){
            state.localList = data;
        }
    },
    actions: {
        setState({commit},newState){
            commit("setProducts",newState);
        },
        loadLocal({commit}){
            let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
            commit("setLocalState",data);
        },
        loadProducts({commit}) {
            // Promise
            let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
            //console.log(data);
            let products = [];
            if (data !== null) data.forEach(item => {
                products.push(ProductTransformer.transform(item));
            });
            commit("setProducts", products);
        },
        /**
         * Process data and save to localStorage
         * @param commit
         */
        saveProducts: function ({commit}) {
            let jsonProducts = [];

            EvenService.getJsonProducts().then(response => {
                jsonProducts = response.data;
                localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(jsonProducts));
                commit("setProducts", jsonProducts);
            }).catch(error => console.log(error));
        },
        saveModifiedProducts: function ({commit},newProducts) {
            localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(newProducts));
            commit("setProducts", newProducts);
        },
        /**
         * @param commit
         * @param getters
         * @param {Product} product
         */
        saveProduct: function ({ commit, getters }, { product }) {
            let products = getters["getProducts"] ?? [];

            commit("setProducts", []); // vuejs2
            products = products.filter(item => item.id !== product.id); // TODO: optimize find product by id and update it
            products.push(product);
            commit("setProducts", products); // vuejs2

            let productsObj = product.map(item => ProductTransformer.reverseTransform(item));
            localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(productsObj));
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
        sortProducts({ state, dispatch }, param) {
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
        searchProduct({ commit, getters }, searched) {
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
