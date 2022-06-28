// noinspection JSVoidFunctionReturnValueUsed
import {SHOP_KEY, TABLES} from "@/const";

export default {
    namespaced: true,
    name:'user',
    state() {
        return {
            user: null,
            admin: false,
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
        loadUser({commit}, user) {
            commit("setUser", user);
        },
        loadAdmin({commit}, adminStatus) {
            commit("setAdmin", adminStatus);
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
        deleteUserLocal(){
            localStorage.removeItem(`${SHOP_KEY}-${TABLES.USER}`);
        },
        loadUserLocal({commit}){
           let data = JSON.parse(
                localStorage.getItem(`${SHOP_KEY}-${TABLES.USER}`));
           if(data !== null){
               commit("setUser", data.user);
               commit("setAdmin", data.admin);
           }
        }
    },
};
