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
        gameStarted: false,
        deckType: null,
        playerFirst: null,
    }),

    getters: {
        currentTurn: state => state.currentTurn,
        currentPhase: state => state.currentPhase,
        title: state => state.title,
        initialised: state => state.initialised,
        started: state => state.gameStarted,
        deckTypeChosen: state => !!state.deckType,
        playingCommanderDeck: state => state.deckType === 'commander',
        playerFirst: state => state.playerFirst,
        playerFirstChosen: state => state.playerFirst !== null,
        readyToStart: state => state.initialised && state.gameStarted && !!state.deckType && !!state.playerFirst && state.currentTurn === 0,
    },

    actions: {
        setupGame({ commit }, opponent) {
            opponent = opponent.toLowerCase();

            commit('setupGame', getTitle(opponent));
        },
        startGame({ commit }) {
            commit('startGame');
        },
        playingCommander({ commit }, playingCommander) {
            commit('playingCommander', playingCommander);
        },
        playerFirst({ commit }, playerFirst) {
            commit('playerFirst', playerFirst);
        },
        startFirstTurn({ commit, dispatch }) {
            commit('startFirstTurn');
            dispatch('challengeDeck/startTurn');
        },
        nextTurn({ commit }) {
            commit('incrementTurn');
        },
        nextPhase({ commit }) {
            // ...
        },
    },

    mutations: {
        setupGame(state, title) {
            state.title = title;

            state.initialised = true;
        },
        startGame(state) {
            state.gameStarted = true;
        },
        playingCommander(state, playingCommander) {
            state.deckType = playingCommander ? 'commander' : 'normal';
        },
        playerFirst(state, playerFirst) {
            state.playerFirst = playerFirst;
        },
        startFirstTurn(state) {
            state.currentTurn = 1;
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