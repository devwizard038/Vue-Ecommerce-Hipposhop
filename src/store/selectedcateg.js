export default {
    namespaced: true,
    state() {
        return {
            id:0,
        };
    },
    getters: {
        getId(state) {
            return state.id;
        },
    },
    mutations: {
        setId(state, data) {
            state.id = data;
        },
    },
    actions: {
        /**
         *
         * @param commit
         * @param data
         */
        loadId({ commit }, data) {
            commit("setId", data);
        },
    },
};
