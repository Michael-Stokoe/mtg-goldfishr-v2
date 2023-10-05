// import minotaur from './opponents/minotaur-test.js';
import Card from '../classes/card.js';

import {rules as minotaurRules, cards as minotaur} from './opponents/minotaur.js';
import {rules as hydraRules, cards as hydra} from './opponents/hydra.js';
import {rules as godRules, cards as god} from './opponents/god.js';

const challengeDeck = {
    namespaced: true,

    state: () => ({
        opponent: null,
        library: [],
        graveyard: [],
        exile: [],
        boardState: [],
        nonPermanentsPlayed: [],

        waitingForCombat: false,
        waitingForBlockers: false,
        waitingForSecondMain: false,
        waitingForPlayerTurn: false,

        rulesText: null,
        autoSubtract: true,

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
        rulesText: (state) => state.rulesText,
        autoSubtract: (state) => state.autoSubtract,
    },

    actions: {
        loadDeck({ commit }, opponent) {
            commit('loadDeck', opponent);
            commit('loadRules', opponent);
            commit('setOpponent', opponent);
            commit('shuffleDeck');
        },

        resetState({ commit, dispatch, state }) {
            commit('loadDeck', state.opponent);
            commit('shuffleDeck');
            commit('resetState');
        },

        changeAutoSubtract({ commit }, value) {
            commit('changeAutoSubtract', value);
        },

        startTurn({ dispatch, commit }) {
            commit('clearTurnState');
            dispatch('handleUntap');
        },
        handleUntap({ dispatch, commit }) {
            commit('untapAll');
            commit('runGamePhaseHandlers', 'untap');
            commit('runBoardStateHandlers', 'untap');
            dispatch('handleUpkeep');
        },
        handleUpkeep({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'upkeep');
            commit('runBoardStateHandlers', 'upkeep');
            dispatch('handleDraw');
        },
        handleDraw({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'draw');
            commit('runBoardStateHandlers', 'draw');
            dispatch('handleMainPhase');
        },
        handleMainPhase({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'main');
            commit('runBoardStateHandlers', 'main');

            dispatch('castSpells', 2);

            commit('waitingForCombat');
        },
        castSpells({ commit, dispatch, state }, amount) {
            for (let i = 0; i < amount; i++) {
                if (state.library.length > 0) {
                    dispatch('stack/addCard', state.library[0], { root: true });
                    commit('removeCardsFromLibrary', 1);
                }
            }
        },
        millCards({ commit }, amount) {
            commit('millCards', amount);
        },

        startCombat({ commit, dispatch }) {
            commit('runGamePhaseHandlers', 'combatStart');
            commit('runBoardStateHandlers', 'combatStart');
            commit('startCombat');
        },
        handleCombatDamage({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'combatDamage');
            commit('runBoardStateHandlers', 'combatDamage');
            dispatch('handleCombatEnd');
        },
        handleCombatEnd({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'combatEnd');
            commit('runBoardStateHandlers', 'combatEnd');
            dispatch('handleSecondMain');
        },

        handleSecondMain({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'secondMain');
            commit('runBoardStateHandlers', 'secondMain');
            dispatch('handleEndStep');
        },
        handleEndStep({ dispatch, commit }) {
            commit('runGamePhaseHandlers', 'endStep');
            commit('runBoardStateHandlers', 'endStep');
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
        sacrificeCreatures({ commit }, amount) {
            commit('sacrificeCreatures', amount);
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
        setOpponent(state, opponent) {
            state.opponent = opponent;
        },
        loadDeck(state, opponent) {
            let decklists = {
                minotaur: minotaur,
                hydra: hydra,
                god: god,
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
        changeAutoSubtract(state, value) {
            state.autoSubtract = value;
        },
        loadRules(state, opponent) {
            switch (opponent) {
                case 'minotaur':
                    state.rulesText = minotaurRules;
                    break;
                case 'hydra':
                    state.rulesText = hydraRules;
                    break;
                case 'god':
                    state.rulesText = godRules;
                    break;
                default:
                    state.rulesText = null;
                    break;
            }
        },
        clearTurnState(state) {
            state.handlers = {
                untap: [],
                upkeep: [],
                draw: [],
                main: [],
                combatStart: [],
                combatDamage: [],
                combatEnd: [],
                secondMain: [],
                endStep: [],
            };

            state.nonPermanentsPlayed = [];

            state.waitingForCombat = false;
            state.waitingForBlockers = false;
            state.waitingForSecondMain = false;
            state.waitingForPlayerTurn = false;
        },
        resetState(state) {
            state.graveyard = [];
            state.exile = [];
            state.boardState = [];
            state.nonPermanentsPlayed = [];

            state.waitingForCombat = false;
            state.waitingForBlockers = false;
            state.waitingForSecondMain = false;
            state.waitingForPlayerTurn = false;
            state.handlers = {
                untap: [],
                upkeep: [],
                draw: [],
                main: [],
                combatStart: [],
                combatDamage: [],
                combatEnd: [],
                secondMain: [],
                endStep: [],
            };
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
        runGamePhaseHandlers(state, handlerType) {
            if (state.handlers[handlerType] && state.handlers[handlerType].length > 0) {
                state.handlers[handlerType].forEach(handler => handler(state));
            }
        },
        runBoardStateHandlers(state, handlerType) {
            state.boardState.forEach(card => {
                if (card.phaseHandlers[handlerType] && card.phaseHandlers[handlerType].length > 0) {
                    card.phaseHandlers[handlerType].forEach(handler => handler(card));
                }
            });
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

            if (card.stateHandlers.death && card.stateHandlers.death.length) {
                card.stateHandlers.death.forEach(handler => handler(card));
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
        sacrificeCreatures(state, amount) {
            // filter state.boardState by creatures and sort by ranking
            const creatures = state.boardState.filter(card => card.superTypes.includes('Creature')).sort((a, b) => a.rank - b.rank);
            for(let i = 0; i < amount; i++) {
                if (creatures[i]) {
                    creatures[i].destroy();
                }
            }
        },
        millCards(state, amount) {
            let library = Object.assign([], state.library);
            let cards = library.splice(0, amount);
            state.library = library;
            state.graveyard.push(...cards);
        },

        waitingForCombat(state) {
            state.waitingForCombat = true;
        },

        startCombat(state) {
            state.waitingForCombat = false;

            state.boardState.forEach(card => {
                if (card.canAttack && card.tapped === false) {
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
                        if (state.autoSubtract) {
                            $evt.emit('lose-life', card.power);
                        }
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
            state.nonPermanentsPlayed = [];
            
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