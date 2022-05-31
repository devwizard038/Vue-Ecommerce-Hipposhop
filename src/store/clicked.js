export default {
	namespaced: true,
	state () {
		return {
			clicked: []
		}
	},
	getters: {
		getList (state) {
			return state.clicked;
		}
	},
	mutations: {
		setList (state, data) {
			console.log(data);
			state.clicked = data;
		}
	},
	actions: {
		loadList ({ commit }, data) {
			console.log(data);
            data = 
			commit('setList', data);
		},
	}
}