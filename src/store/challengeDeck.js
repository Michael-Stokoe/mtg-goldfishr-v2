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
        nonPermanentsPlayed: [],

        waitingForCombat: false,
        waitingForBlockers: false,
        waitingForSecondMain: false,
        waitingForPlayerTurn: false,

        handlers: {
            untap: [],
            upkeep: [],
            draw: [],
            main: [],
            combatStart: [],
            combatDamage: [],
            combatEnd: [],
            secondMain: [],
            endStep: [],
        },
    }),

    getters: {
        library: (state) => state.library,
        cardsInLibrary: (state) => state.library.length,
        graveyard: (state) => state.graveyard,
        cardsInGraveyard: (state) => state.graveyard.length,
        exile: (state) => state.exile,
        cardsInExile: (state) => state.exile.length,
        nonPermanentsPlayed: (state) => state.nonPermanentsPlayed,
        boardState: (state) => state.boardState,
        boardArtifacts: (state) => state.boardState.filter(card => card.superTypes.includes('Artifact')),
        boardEnchantments: (state) => state.boardState.filter(card => card.superTypes.includes('Enchantment')),
        boardCreatures: (state) => state.boardState.filter(card => card.superTypes.includes('Creature')),
        waitingForCombat: (state) => state.waitingForCombat,
        waitingForBlockers: (state) => state.waitingForBlockers,
        waitingForSecondMain: (state) => state.waitingForSecondMain,
        waitingForPlayerTurn: (state) => state.waitingForPlayerTurn,
    },

    actions: {
        loadDeck({ commit }, opponent) {
            commit('loadDeck', opponent);
            commit('shuffleDeck');
        },

        startTurn({ dispatch }) {
            dispatch('handleUntap');
        },
        handleUntap({ dispatch, commit }) {
            commit('untapAll');
            dispatch('handleUpkeep');
        },
        handleUpkeep({ dispatch }) {
            dispatch('handleDraw');
        },
        handleDraw({ dispatch }) {
            dispatch('handleMainPhase');
        },
        handleMainPhase({ dispatch, commit, state }) {
            // TODO: Handle any abilities that trigger at the start of main phase

            // Cast the first 2 cards from library
            if (state.library.length > 1) {
                dispatch('stack/addCard', state.library[0], { root: true });
                dispatch('stack/addCard', state.library[1], { root: true });

                commit('removeCardsFromLibrary', 2);
            } else if (state.library.length > 0) {
                dispatch('stack/addCard', state.library[0], { root: true });

                commit('removeCardsFromLibrary', 1);
            }

            commit('waitingForCombat');
        },
        startCombat({ commit, dispatch }) {
            // TODO: Resolve any abilities that trigger at the start of combat
            // tap all valid attackers

            commit('startCombat');
        },
        handleCombatDamage({ dispatch }) {
            dispatch('handleCombatEnd');
        },
        handleCombatEnd({ dispatch }) {
            // TODO: Handle any abilities that trigger at the end of combat
            dispatch('handleSecondMain');
        },

        handleSecondMain({ dispatch }) {
            dispatch('handleEndStep');
        },
        handleEndStep({ dispatch }) {
            dispatch('handleCleanup');
        },
        handleCleanup({ commit }) {
            // Handle the cleanup step, then move to the player's turn.
            commit('handleCleanup');
            commit('waitingForPlayerTurn');
        },

        tapCard({ commit }, card) {
            commit('tapCard', card);
        },
        untapCard({ commit }, card) {
            commit('untapCard', card);
        },

        removeCardFromCombat({ commit }, amount) {
            commit('removeCardFromCombat', amount);
        },
        toggleBlock({ commit }, card) {
            commit('toggleBlock', card);
        },
        toggleLethalBlock({ commit }, card) {
            commit('toggleLethalBlock', card);
        },

        destroyCard({ commit }, card) {
            commit('destroyCard', card);
        },
        exileCard({ commit }, card) {
            commit('exileCard', card);
        },

        blockersDeclared({ commit, dispatch }) {
            commit('blockersDeclared');
            dispatch('handleCombatDamage');
        },

        endPlayerTurn({ commit, dispatch }) {
            commit('endPlayerTurn');
            dispatch('startTurn');
        }
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
        },
        shuffleDeck(state) {
            let shuffledCards = Object.assign(state.library, []);

            for (var i = shuffledCards.length - 1; i > 0; --i) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = shuffledCards[i];
                shuffledCards[i] = shuffledCards[j];
                shuffledCards[j] = temp;
            }

            state.library = shuffledCards;
        },
        untapAll(state) {
            state.boardState.forEach(card => {
                card.tapped = false;
            });
        },
        removeCardsFromLibrary(state, amount) {
            state.library.splice(0, amount);
        },
        tapCard(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            const boardState = Object.assign([], state.boardState);
            boardState[index].tapped = true;
            state.boardState = boardState;
        },
        untapCard(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            const boardState = Object.assign([], state.boardState);
            boardState[index].tapped = false;
            state.boardState = boardState;
        },
        removeCardFromCombat(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            const boardState = Object.assign([], state.boardState);
            boardState[index].tapped = false;
            state.boardState = boardState;
            state.library[index].isAttacking = false;
        },
        toggleBlock(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            const boardState = Object.assign([], state.boardState);
            boardState[index].isBlockedLethal = false;
            boardState[index].isBlocked = !boardState[index].isBlocked;
            state.boardState = boardState;
        },
        toggleLethalBlock(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            const boardState = Object.assign([], state.boardState);
            boardState[index].isBlocked = false;
            boardState[index].isBlockedLethal = !boardState[index].isBlockedLethal;
            state.boardState = boardState;
        },
        destroyCard(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            state.graveyard.push(card);
            const boardState = Object.assign([], state.boardState);
            boardState.splice(index, 1);
            state.boardState = boardState;
        },
        exileCard(state, card) {
            const index = state.boardState.indexOf(card);

            if (index === -1) {
                throw new Error('Card not found on board state');
                return;
            }

            state.exile.push(card);
            const boardState = Object.assign([], state.boardState);
            boardState.splice(index, 1);
            state.boardState = boardState;
        },

        waitingForCombat(state) {
            state.waitingForCombat = true;
        },

        startCombat(state) {
            state.waitingForCombat = false;

            state.handlers.combatStart.forEach(handler => handler(state));

            state.boardState.forEach(card => {
                if (card.superTypes.includes('Creature') && card.tapped === false) {
                    card.isAttacking = true;
                    card.tapped = true;
                }
            });

            state.waitingForBlockers = true;
        },

        blockersDeclared(state) {
            state.waitingForBlockers = false;

            state.boardState.forEach(card => {
                if (card.isAttacking) {
                    if (!card.isBlocked && !card.isBlockedLethal) {
                        $evt.emit('lose-life', card.power);
                    }

                    if (card.isBlockedLethal) {
                        $evt.emit('destroy-card', card);
                    }
                }
            });

            state.waitingForSecondMain = true;
        },

        handleCleanup(state) {
            state.boardState.forEach(card => {
                card.isAttacking = false;
                card.isBlocked = false;
                card.isBlockedLethal = false;
            });
        },

        waitingForPlayerTurn(state) {
            state.waitingForPlayerTurn = true;
        },

        endPlayerTurn(state) {
            state.waitingForPlayerTurn = false;
        },
    },
}

export default challengeDeck;