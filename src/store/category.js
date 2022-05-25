import { SHOP_KEY, TABLES } from "@/const";


export default {
	namespaced: true,
	state () {
		return {
			list: []
		}
	},
	getters: {
		getList (state) {
			return state.list;
		}
	},
	mutations: {
		setList (state, data) {
			console.log(data);
			state.list = data;
		}
	},
	actions: {
		loadList ({ commit }, data) {
			console.log(data);
			// TODO: recuperer la list des products du localStorage
            data = JSON.parse(localStorage.getItem(`${SHOP_KEY}-${TABLES.CATEGORIES}`));
			commit('setList', data);
		},
	}
}