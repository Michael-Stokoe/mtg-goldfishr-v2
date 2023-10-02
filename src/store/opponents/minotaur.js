const cards = [
    // Creatures

    {
        name: 'Minotaur Goreseeker',
        image: '/images/decks/minotaurs/tbth-1-minotaur-goreseeker.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 10,

        power: 3,
        toughness: 2,

        ranking: 1,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Minotaur Younghorn',
        image: '/images/decks/minotaurs/tbth-2-minotaur-younghorn.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 15,

        power: 2,
        toughness: 2,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Mogis\'s Chosen',
        image: '/images/decks/minotaurs/tbth-3-mogis-s-chosen.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 4,

        power: 5,
        toughness: 4,

        ranking: 3,

        castHandler: function () { },
        phaseHandlers: {},

        stateHandlers: {
            enterTheBattleField: [
                function (card) {
                    card.tapped = true;
                }
            ]
        },
    },

    {
        name: 'Phoberos Reaver',
        image: '/images/decks/minotaurs/tbth-4-phoberos-reaver.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 10,

        power: 2,
        toughness: 3,

        ranking: 1,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Reckless Minotaur',
        image: '/images/decks/minotaurs/tbth-5-reckless-minotaur.jpg',

        superTypes: ['Creature'],
        subTypes: ['Minotaur'],
        amount: 4,

        power: 4,
        toughness: 1,

        ranking: 2,

        castHandler: function () { },
        phaseHandlers: {
            end: [
                function (card) {
                    card.destroy();
                }
            ]
        },
        stateHandlers: {},
    },

    // Sorceries

    {
        name: 'Consuming Rage',
        image: '/images/decks/minotaurs/tbth-6-consuming-rage.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

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

    {
        name: 'Descend on the Prey',
        image: '/images/decks/minotaurs/tbth-7-descend-on-the-prey.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Intervention of Keranos',
        image: '/images/decks/minotaurs/tbth-8-intervention-of-keranos.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Touch of the Horned God',
        image: '/images/decks/minotaurs/tbth-9-touch-of-the-horned-god.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Unquenchable Fury',
        image: '/images/decks/minotaurs/tbth-10-unquenchable-fury.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {},
        stateHandlers: {},
    },

    // Artifacts

    {
        name: 'Altar of Mogis',
        image: '/images/decks/minotaurs/tbth-11-altar-of-mogis.jpg',

        superTypes: ['Artifact'],
        subTypes: [],
        amount: 1,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {
            main1: [
                function (card) {
                    card.owner.castTopSpellOfLibrary();
                }
            ]
        },
        stateHandlers: {},
    },

    {
        name: 'Massacre Totem',
        image: '/images/decks/minotaurs/tbth-12-massacre-totem.jpg',

        superTypes: ['Artifact'],
        subTypes: [],
        amount: 1,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {
            main1: [
                function (card) {
                    card.owner.castTopSpellOfLibrary();
                }
            ]
        },
        stateHandlers: {},
    },

    {
        name: 'Plundered Statue',
        image: '/images/decks/minotaurs/tbth-13-plundered-statue.jpg',

        superTypes: ['Artifact'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {
            main1: [
                function (card) {
                    card.owner.castTopSpellOfLibrary();
                }
            ]
        },
        stateHandlers: {},
    },

    {
        name: 'Refreshing Elixir',
        image: '/images/decks/minotaurs/tbth-14-refreshing-elixir.jpg',

        superTypes: ['Artifact'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {
            main1: [
                function (card) {
                    card.owner.castTopSpellOfLibrary();
                }
            ]
        },
        stateHandlers: {},
    },

    {
        name: 'Vitality Salve',
        image: '/images/decks/minotaurs/tbth-15-vitality-salve.jpg',

        superTypes: ['Artifact'],
        subTypes: [],
        amount: 1,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () { },
        phaseHandlers: {
            main1: [
                function (card) {
                    card.owner.castTopSpellOfLibrary();
                }
            ]
        },
        stateHandlers: {},
    },
];

export default cards;