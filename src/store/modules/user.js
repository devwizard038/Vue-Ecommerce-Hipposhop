// noinspection JSVoidFunctionReturnValueUsed
import {SHOP_KEY, TABLES} from "@/const";
import EvenService from "@/Libraries/ServerEvents";

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
                "password": "",
                "admin": false
            },
            userList:[],
            modifiedUserList:[],
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
        getUserList(state){
            return state.userList;
        },
        getModifiedUserList(state){
            return state.modifiedUserList;
        }
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
        setUserList(state,data){
            state.userList = data;
        },
        setModifiedUserList(state,data){
            state.modifiedUserList = data;
        }
    },
    actions: {
        loadUserList({commit}){
            let jsonProducts = [];
            EvenService.getUserList()
                .then(response => {
                    jsonProducts = response.data.results;
                    commit("setUserList", jsonProducts);
                })
                .catch(error => console.log(error));
        },
        deleteUserList({commit}){
            commit("setUserList",[]);
        },
        saveModifiedUserList({commit}, newData) {
            commit("setModifiedUserList",newData);
        },
        loadUser({commit}, user) {
            commit("setUser", user);
        },
        loadAdmin({commit}, adminStatus) {
            commit("setAdmin", adminStatus);
        },
        loadNewUser({commit}, data) {
            commit("setNewUser", data);
        },
        resetNewUser({commit, getters}) {
            let data = getters["getNewUser"];
            data.id = null;
            data.name = "";
            data.email = "";
            data.password = "";
            data.admin=false;
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
        saveModifiedUserLocal({state},data) {
            if(state.user !== null ){
                localStorage.setItem(`${SHOP_KEY}-${TABLES.USER}`,
                    JSON.stringify({
                        user: data.email,
                        admin: data.admin
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
