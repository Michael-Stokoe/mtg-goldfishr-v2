import challengeDeck from "../challengeDeck";

const cards = [
    {
        name: 'Mogis\'s Chosen',
        image: '/images/decks/minotaurs/tbth-3-mogis-s-chosen.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 4,

        power: 5,
        toughness: 4,

        ranking: 3,

        castHandler: null,
        phaseHandlers: {},

        stateHandlers: {
            enterBattlefield: [
                function (card) {
                    card.tapped = true;
                }
            ]
        },
    },
];

export default cards;