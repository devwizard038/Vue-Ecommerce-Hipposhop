// noinspection JSVoidFunctionReturnValueUsed
import {FILTERS, SHOP_KEY, TABLES} from "@/const";
import jsonProducts from "@/assets/products (4).json";

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
            let data = JSON.parse(
                localStorage.getItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`));
            commit("setProducts", data);
        },
        /**
         * Process data and save to localStorage
         * @param commit
         */
        saveProducts: function ({commit}) {
            let data = JSON.parse(JSON.stringify(jsonProducts));
            if (data) {
                data.forEach(item => {
                    let obj = {};
                    if (item.Attributes != null) {
                        // let attr = item.Attributes.split(',');
                        // attr.forEach(n => {
                        //     let tup = n.split(':');
                        //     obj[tup[0]] = tup[1];
                        // });
                        // item.Attributes = obj;

                        let attributes = item.Attributes.matchAll(/(?<name>[a-z]+):(?<value>[^,:]*)/g);
                        for (let attr of attributes) {
                            obj[attr.groups.name] = attr.groups.value;
                        }
                        item.Attributes = obj;
                    }
                });
            }
            localStorage.setItem(`${SHOP_KEY}-${TABLES.PRODUCTS}`, JSON.stringify(data));
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
