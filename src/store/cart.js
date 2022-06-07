// noinspection JSVoidFunctionReturnValueUsed

import { SHOP_KEY, TABLES } from "@/const";


export default {
  namespaced: true,
  state() {
    return {
      cartList: [],
    };
  },
  getters: {
    getCart(state) {
      return state.cartList;
    },
  },
  mutations: {
    setCart(state, data) {
      state.cartList = data;
    },
  },
  actions: {
    loadCart({commit}) {
      let data = JSON.parse(
          localStorage.getItem(`${SHOP_KEY}-${TABLES.CART}`));
      commit("setCart", data);
    },
    updateCart({commit}, data) {
      data =
          localStorage.setItem(`${SHOP_KEY}-${TABLES.CART}`,
              JSON.stringify(data));
      commit("setCart", data);
    },
  },
};
