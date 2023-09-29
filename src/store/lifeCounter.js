const lifeCounter = {
    namespaced: true,

    state: () => ({
        currentLifeTotal: 0,
        startingLifeTotal: 0,
    }),

    getters: {
        currentLife: () => state.currentLifeTotal,
    },

    actions: {
        // ...
    },

    mutations: {
        // ...
    },
}

export default lifeCounter;