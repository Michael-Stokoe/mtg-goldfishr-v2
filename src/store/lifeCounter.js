const lifeCounter = {
    namespaced: true,

    state: () => ({
        currentLifeTotal: 0,
        startingLifeTotal: 0,
    }),

    getters: {
        currentLife: (state) => state.currentLifeTotal,
        startingLife: (state) => state.startingLifeTotal,
    },

    actions: {
        setStartingLife({ commit }, startingLife) {
            commit('setStartingLife', startingLife);
        },
        changeLife({ commit }, amount) {
            commit('changeLife', amount);
        },
        setLife({ commit }, amount) {
            commit('setLife', amount);
        },
    },

    mutations: {
        setStartingLife(state, startingLife) {
            state.startingLifeTotal = startingLife;
            state.currentLifeTotal = startingLife;
        },
        changeLife(state, amount) {
            state.currentLifeTotal += amount;
        },
        setLife(state, amount) {
            state.currentLifeTotal = amount;
        },
    },
}

export default lifeCounter;