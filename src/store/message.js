export default {
    namespaced: true,
    state() {
        return {
            messageState: false,
        };
    },
    getters: {
        getMessageState(state) {
            return state.messageState;
        },
    },
    mutations: {
        setMessageState(state, data) {
            state.messageState = data;
        }
    },
    actions: {
        /**
         *
         * @param commit
         * @param data
         */
        loadMessageState({ commit }, data) {
            commit("setMessageState", data);
        }
    },
};
