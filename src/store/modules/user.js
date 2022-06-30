// noinspection JSVoidFunctionReturnValueUsed
import {SHOP_KEY, TABLES} from "@/const";

export default {
    namespaced: true,
    name: 'user',
    state() {
        return {
            user: null,
            admin: false,
            newUser: {
                "id": null,
                "name": "",
                "email": "",
                "password": ""
            },
        };
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getAdmin(state) {
            return state.admin;
        },
        getNewUser(state) {
            return state.newUser;
        },
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setAdmin(state, data) {
            state.admin = data;
        },
        setNewUser(state, data) {
          state.newUser = data;
        },
        setResetNewUser(state, data) {
            state.newUser = data;
        },
    },
    actions: {
        loadUser({commit}, user) {
            commit("setUser", user);
        },
        loadAdmin({commit}, adminStatus) {
            commit("setAdmin", adminStatus);
        },
        loadNewUser({commit}, data) {
            commit("setAdmin", data);
        },
        resetNewUser({commit, getters}) {
            let data = getters["getNewUser"];
            data.id = null;
            data.name = "";
            data.email = "";
            data.password = "";
            commit("setResetNewUser", data);
        },
        saveUserLocal({state}) {
            if (state.user !== null) {
                localStorage.setItem(`${SHOP_KEY}-${TABLES.USER}`,
                    JSON.stringify({
                        user: state.user,
                        admin: state.admin
                    }));
            }
        },
        deleteUserLocal() {
            localStorage.removeItem(`${SHOP_KEY}-${TABLES.USER}`);
        },
        loadUserLocal({commit}) {
            let data = JSON.parse(
                localStorage.getItem(`${SHOP_KEY}-${TABLES.USER}`));
            if (data !== null) {
                commit("setUser", data.user);
                commit("setAdmin", data.admin);
            }
        }
    },
};
