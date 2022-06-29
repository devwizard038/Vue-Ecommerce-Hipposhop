import EventService from "@/services/EvenService";

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
        saveCategories({commit}) {
            let jsonCategories = [];
            return EventService.getCategoryList()
                .then(response => {
                    jsonCategories = response.data.results;
                        commit("setCategories", jsonCategories);
                    }
                ).catch(err => console.log(err));
        },
    },
};