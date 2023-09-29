import { createStore } from 'vuex';
import eventBus from '../plugins/tiny-emitter.js';
import challengeDeck from './challengeDeck.js';
import lifeCounter from './lifeCounter';
import stack from './stack';

const store = createStore({
    state: () => ({
        currentTurn: 0,
        currentPhase: 'setup',
        title: '',

        initialised: false,
    }),

    getters: {
        currentTurn: state => state.currentTurn,
        currentPhase: state => state.currentPhase,
        title: state => state.title,
        initialised: state => state.initialised,
    },

    actions: {
        setupGame({ commit }, opponent) {
            opponent = opponent.toLowerCase();

            commit('setupGame', getTitle(opponent));
        },
        nextTurn({ commit }) {
            commit('incrementTurn');
        },
        nextPhase({ commit }) {
            // ...
        },
        runHandlersForPhase({ commit }, phase) {
            // ...
        },
    },

    mutations: {
        setupGame(state, title) {
            state.title = title;

            state.initialised = true;
        },
        incrementTurn(state) {
            state.currentTurn++;
        },
    },

    modules: {
        challengeDeck: challengeDeck,
        lifeCounter: lifeCounter,
        stack: stack,
    },
});

export default store;

const getTitle = function (opponent) {
    switch (opponent) {
        case 'minotaur':
            return 'Battle the Horde';
        case 'hydra':
            return 'Face the Hydra';
        case 'god':
            return 'Defeat a God';
        default:
            throw new Error('Unknown game type');
    }
}