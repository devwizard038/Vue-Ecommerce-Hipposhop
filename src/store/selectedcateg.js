export default {
    namespaced: true,
    state() {
        return {
            id: 0,
            category: null,
            selected: null
        };
    },
    getters: {
        getId(state) {
            return state.id;
        },
        getCategory(state) {
            return state.category;
        },
        getSelected(state) {
            return state.selected;
        },
    },
    mutations: {
        setId(state, data) {
            state.id = data;
        },
        setCategory(state, data) {
            state.category = data;
        },
        setSelected(state, data) {
            state.selected = data;
        },
    },
    actions: {
        /**
         *
         * @param commit
         * @param data
         */
        loadId({commit}, data) {
            commit("setId", data);
        },
        /**
         *
         * @param commit
         * @param data
         */
        loadCategory({commit}, data) {
            commit("setCategory", data);
        },
        /**
         *
         * @param commit
         * @param data
         */
        loadSelected({commit}, data) {
            commit("setSelected", data);
        }
    },
};
