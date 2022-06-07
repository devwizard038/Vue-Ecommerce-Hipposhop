import { SHOP_KEY, TABLES } from "@/const";

export default {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  getters: {
    getList(state) {
      return state.list;
    },
  },
  mutations: {
    setList(state, data) {
      state.list = data;
    },
  },
  actions: {
    loadList({ commit }) {
      // TODO: recuperer la list des products du localStorage
      let data = JSON.parse(
        localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`)
      );
      commit("setList", data);
    },
  },
};
