export default {
    namespaced: true,
    state() {
        return {
            message: '',
        };
    },
    getters: {
        getMessage(state) {
            return state.message;
        },
    },
    mutations: {
        setMessage(state, data) {
            state.message = data;
        },
    },
    actions: {
        /**
         *
         * @param commit
         * @param data
         */
        loadLoginMessage({ commit }) {
            let data = "Connexion Réussie"
            commit("setMessage", data);
        },
        /**
         *
         * @param commit
         * @param data
         */
        loadLogoutMessage({ commit }) {
            let data = "Déconnexion Réussie"
            commit("setMessage", data);
        },
        loadRegisterMessage({ commit }) {
            let data = "Inscription Réussie"
            commit("setMessage", data);
        }
    },
};
