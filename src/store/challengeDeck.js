// import minotaurDecklist from '../decklists/minotaur.json';
import minotaur from './opponents/minotaur.js';
import Card from '../classes/card.js';

const challengeDeck = {
    namespaced: true,

    state: () => ({
        library: [],
        graveyard: [],
        exile: [],
        boardState: [],
    }),

    getters: {
        library: (state) => state.library,
        graveyard: (state) => state.graveyard,
        exile: (state) => state.exile,
        boardState: (state) => state.boardState,
        boardArtifacts: (state) => state.boardState.filter(card => card.type.includes('Artifact')),
        boardCreatures: (state) => state.boardState.filter(card => card.type.includes('Creature')),
    },

    actions: {
        loadDeck({ commit }, opponent) {
            commit('loadDeck', opponent)
        },
    },

    mutations: {
        loadDeck(state, opponent) {
            let decklists = {
                minotaur: minotaur,
            }

            const decklist = decklists[opponent];

            if (!decklist) {
                throw new Error('Unknown opponent');
            }

            let library = [];

            decklist.forEach(cardData => {
                for (let i = 0; i < cardData.amount; i++) {
                    const newCard = new Card(cardData);

                    let existingPhaseHandlers = Object.keys(cardData.phaseHandlers);

                    if (existingPhaseHandlers.length > 0) {
                        existingPhaseHandlers.forEach(phase => {
                            newCard.registerPhaseHandlers(phase, cardData.phaseHandlers[phase]);
                        });
                    }

                    let existingStateHandlers = Object.keys(cardData.stateHandlers);

                    if (existingStateHandlers.length > 0) {
                        existingStateHandlers.forEach(state => {
                            newCard.registerStateHandlers(state, cardData.stateHandlers[state]);
                        });
                    }

                    library.push(newCard);
                }
            });

            state.library = library;
        }
    },
}

export default challengeDeck;