export default {
    namespaced: true,
    state() {
        return {
            details: {},
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
        loadDetails({commit}, data) {
            commit("setDetails", data);
        },
        loadAttributesLists({commit, getters, rootGetters}) {
            let attListLocal = [];
            let attSetsLocal = {};
            commit("setAttList", attListLocal);
            commit("setAttSets", attSetsLocal);

            let product = getters["getDetails"].attributes;
            if (product) {
                for (let att in product) {
                    if (att !== 'nom') {
                        attListLocal.push(att);
                        attSetsLocal[att] = [];
                    }
                }
            }

            let prodListLocal = rootGetters["products/getProducts"]
                .filter(prod => prod.attributes[Object.keys(prod.attributes)[0]] === product[Object.keys(product)[0]]);
            if (attListLocal) {
                if (attListLocal.length > 1) {
                    for (let attA in attListLocal) {
                        let att1 = attListLocal[attA];
                        let tempList = prodListLocal;
                        for(let attB in attListLocal){
                            let att2 = attListLocal[attB];
                            if(att1 !== att2 && attSetsLocal[att1].length === 0) {
                                tempList = tempList.filter(prod => prod.attributes[att2] === product[att2]);
                                attSetsLocal[att1] = tempList;
                            }
                        }
                    }
                } else if (attListLocal.length === 1) {
                    let att = attListLocal[0];
                    for (let prod in prodListLocal) {
                        if (prodListLocal[prod].attributes.nom === product.nom) {
                            attSetsLocal[att].push(prodListLocal[prod]);
                        }
                    }
                }
            }

            commit("setAttList", attListLocal);
            commit("setAttSets", attSetsLocal);
        }
    },
};
