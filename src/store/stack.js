const stack = {
    namespaced: true,

    state: () => ({
        stack: [],
        autoResolveSpells: true,
    }),

    getters: {
        stack: (state) => state.stack,
        stackSize: (state) => state.stack.length,
        autoResolveSpells: (state) => state.autoResolveSpells,
    },

    actions: {
        addCard({ commit, state, dispatch }, card) {
            commit('addCard', card);

            if (state.autoResolveSpells) {
                dispatch('resolveCard');
            }
        },
        resolveCard({ commit, rootState, state }) {
            const resolvedCard = state.stack[state.stack.length - 1];

            let types = resolvedCard.superTypes;
            if (types.includes('Creature') || types.includes('Artifact') || types.includes('Enchantment')) {
                rootState.challengeDeck.boardState.push(resolvedCard);
            } else {
                rootState.challengeDeck.nonPermanentsPlayed.push(resolvedCard);
                rootState.challengeDeck.graveyard.push(resolvedCard);
            }

            if (resolvedCard.castHandler) {
                resolvedCard.castHandler(rootState.challengeDeck);
            }

            if (resolvedCard.stateHandlers.enterBattlefield) {
                resolvedCard.stateHandlers.enterBattlefield.forEach((handler) => {
                    handler(resolvedCard);
                });
            }

            commit('removeCard');
        },
        counterCard({ commit, rootState, state }) {
            const counteredCard = state.stack[state.stack.length - 1];

            rootState.challengeDeck.graveyard.push(counteredCard);

            commit('removeCard');
        },
    },

    mutations: {
        addCard(state, card) {
            state.stack.push(card);
        },
        removeCard(state) {
            state.stack.pop();
        },
    },
}

export default stack;