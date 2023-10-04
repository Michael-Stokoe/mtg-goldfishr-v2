import challengeDeck from "../challengeDeck";

const cards = [
    {
        name: 'Minotaur Goreseeker',
        image: '/images/decks/minotaurs/tbth-1-minotaur-goreseeker.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 1,

        power: 3,
        toughness: 2,

        ranking: 1,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Consuming Rage',
        image: '/images/decks/minotaurs/tbth-6-consuming-rage.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 1,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            state.handlers.combatStart.push((challengeDeck) => {
                challengeDeck.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature') && !card.tapped) {
                        card.power += 2;

                        if (!card.phaseHandlers.combatEnd) {
                            card.phaseHandlers.combatEnd = [];
                        }

                        card.phaseHandlers.combatEnd.push(creature => {
                            creature.destroy();
                        });
                    }
                });
            });
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
];

export default cards;