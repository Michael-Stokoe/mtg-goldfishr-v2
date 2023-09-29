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
        cardsInLibrary: (state) => state.library.length,
        graveyard: (state) => state.graveyard,
        cardsInGraveyard: (state) => state.graveyard.length,
        exile: (state) => state.exile,
        cardsInExile: (state) => state.exile.length,
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

            var library = [];

            decklist.forEach(cardData => {
                for (let i = 0; i < cardData.amount; i++) {
                    const newCard = new Card(cardData);

                    library.push(newCard);
                }
            });

            state.library = library;
        }
    },
}

export default challengeDeck;