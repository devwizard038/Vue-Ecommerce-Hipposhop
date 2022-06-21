// noinspection JSVoidFunctionReturnValueUsed
import {FILTERS, SHOP_KEY, TABLES} from "@/const";
import jsonProducts from "@/assets/products (4).json";
// import {Product} from "@/models/Product";
import {ProductTransformer} from "@/transformers/ProductTransformer";

export default {
    namespaced: true,
    state() {
        return {
            productList: [],
            searchedProduct: [],
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
            // Promise
            let data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));

            let products = [];
            data.forEach(item => {
                products.push(ProductTransformer.transform(item));
            });
            console.log(products);
            commit("setProducts", products);
        },
        /**
         * Process data and save to localStorage
         * @param commit
         */
        saveProducts: function ({commit}) {
            localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(jsonProducts));
            commit("setProducts", jsonProducts);
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
        sortProducts({state}, param) {

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
                    state.productList = JSON.parse(
                        localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
                    break;

            }

        },
        /**
         * Search product function in product list.
         * @param commit
         * @param searched {String}
         */
        searchProduct({commit}, searched) {
            if (!searched) {
                let local = JSON.parse(
                    localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
                commit("setProducts", local);
            } else {
                let text = JSON.parse(
                    localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
                let found = text.filter((item) => item.title.toLowerCase().includes(searched.toLowerCase()));

                commit("setProducts", found);
            }
        }
    },
};
