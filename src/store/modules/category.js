import EventService from "@/Libraries/ServerEvents";

export default {
    namespaced: true,
    state() {
        return {
            categoryList: [],
        };
    },
    getters: {
        getCategories(state) {
            return state.categoryList;
        },
    },
    mutations: {
        setCategories(state, data) {
            state.categoryList = data;
        },
    },
    actions: {
        saveCategories({ commit, getters }) {
            if (!getters["getCategories"].length) {
                let jsonCategories = [];
                return EventService.getCategoryList()
                    .then(response => {
                            jsonCategories = response.data.results;
                            console.log("load categories frim server");
                            commit("setCategories", jsonCategories);
                        }
                    ).catch(err => console.log(err));
            }
        },
    },
};
