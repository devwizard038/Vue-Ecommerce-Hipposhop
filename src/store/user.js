// noinspection JSVoidFunctionReturnValueUsed

export default {
    namespaced: true,
    state() {
        return {
            user: '',
            admin:false,
        };
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getAdmin(state) {
            return state.admin;
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setAdmin(state, data) {
            state.admin = data;
        },
    },
    actions: {
        loadUser({commit},user){
            commit("setUser",user);
        },
        loadAdmin({commit},adminStatus){
            commit("setAdmin",adminStatus);
        }
    },
};
