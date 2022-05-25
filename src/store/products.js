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
			commit('setList', data);
		},
	}
}