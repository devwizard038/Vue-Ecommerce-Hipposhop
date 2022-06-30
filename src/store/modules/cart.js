// noinspection JSVoidFunctionReturnValueUsed
import { SHOP_KEY, TABLES } from "@/const";


export default {
  namespaced: true,
  state() {
    return {
      cartList: [],
      selected: null
    };
  },
  getters: {
    getCart(state) {
      return state.cartList;
    },
    /*
    * Custom getter to retrieve the number of items in the cart
    * */
    getCartCount(state) {
      return state.cartList ? state.cartList.length : 0;
    },
    getCartPrice(state){
      let total=0;
      state.cartList.forEach(item => total += item.quantity * item.price);
      return total;
    },
    getSelected(state) {
      return state.selected;
    },
  },
  mutations: {
    setCart(state, data) {
      state.cartList = data;
    },
    setSelected(state, data) {
      state.selected = data;
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
    /**
     * Deletes selected item from Shopping Cart and LocalStorage.
     * @param commit
     * @param state
     * @param data {Object}
     */
    deleteCartItem({ commit, state }, data) {
      let newCart = localStorage.setItem(
        `${SHOP_KEY}-${TABLES.CART}`,
        JSON.stringify(
            state.cartList.filter(n => n.id !== data.id))
      );
      commit("setCart", newCart);
    },
    /**
     * Deletes all the items from Shopping Cart and LocalStorage.
     * @param commit {Array}
     */
    emptyCart({commit}){
      let newCart = localStorage.setItem(
          `${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify([])
      );
      commit("setCart",newCart);
    },
    /**
     * Selected product will be updated with new selected quantity.
     * @param commit
     * @param state
     * @param data {Object} - selected product
     * @param quantity {Integer} - selected quantity in ShopCart product component input
     */
    modifyCart({commit, state}, { data, quantity}) {
      let oldCart = state.cartList;
      oldCart.forEach(item => {
        if (item.id === data.id) {
          item.quantity = quantity;
        }
      });
      localStorage.setItem(`${SHOP_KEY}-${TABLES.CART}`,
          JSON.stringify(oldCart));
      commit("setCart", oldCart);
    },
    /**
     *
     * @param commit
     * @param data
     */
    loadSelected({commit}, data) {
      commit("setSelected", data);
    },
  },
};
