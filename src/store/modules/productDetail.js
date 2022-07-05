export default {
    namespaced: true,
    state() {
        return {
            details:{},
            attList: [],
            attSets: {},
        };
    },
    getters: {
        getDetails(state) {
            return state.details;
        },
        getAttList(state) {
            return state.attList;
        },
        getAttSets(state) {
            return state.attSets;
        },
    },
    mutations: {
        setDetails(state, data) {
            state.details = data;
        },
        setAttList(state, data) {
            state.attList = data;
        },
        setAttSets(state, data) {
            state.attSets = data;
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
        loadAttributesLists({commit, getters, rootGetters}){

            let attListLocal = [];
            let attSetsLocal = {};

            commit("setAttList", attListLocal);
            commit("setAttSets", attSetsLocal);

            if (getters["getDetails"].attributes) {
                for (let att in getters["getDetails"].attributes) {
                    if (att !== 'nom') {
                        attListLocal.push(att);
                        attSetsLocal[att] = [];
                    }
                }
            }

            if (attListLocal) {
                if (attListLocal.length > 1) {
                    for (let first in attListLocal) {
                        for (let second in attListLocal) {
                            if (first !== second) {
                                let att1 = attListLocal[first];
                                let att2 = attListLocal[second];
                                for (let prod in rootGetters["products/getProducts"]) {
                                    if (rootGetters["products/getProducts"][prod].attributes.nom === getters["getDetails"].attributes.nom &&
                                        rootGetters["products/getProducts"][prod].attributes[att1] === getters["getDetails"].attributes[att1]) {
                                        attSetsLocal[att2].push(rootGetters["products/getProducts"][prod]);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    let att = attListLocal[0];
                    for (let prod in rootGetters["products/getProducts"]) {
                        if (rootGetters["products/getProducts"][prod].attributes.nom === getters["getDetails"].attributes.nom) {
                            attSetsLocal[att].push(rootGetters["products/getProducts"][prod]);
                        }
                    }
                }
            }

            commit("setAttList", attListLocal);
            commit("setAttSets", attSetsLocal);

        }
    },
};
