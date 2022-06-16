export default {
    namespaced: true,
    state() {
        return {
            details:{}
        };
    },
    getters: {
        getDetails(state) {
            return state.details;
        },
    },
    mutations: {
        setDetails(state, data) {
            state.details = data;
        },
    },
    actions: {
        /**
         *
         * @param commit
         * @param data
         */
        loadDetails({ commit }, data) {
            commit("setDetails", data);
        },
    },
};
