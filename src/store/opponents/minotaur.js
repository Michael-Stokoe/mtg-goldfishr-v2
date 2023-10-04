import challengeDeck from "../challengeDeck";

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

        castHandler: null,
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

        castHandler: null,
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

        castHandler: null,
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

        castHandler: null,
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

        castHandler: null,
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
        // Whenever a minotaur attacks this turn, it gains first strike until end of turn and must be blocked this turn if able.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            state.handlers.combatStart.push(challengeDeck => {
                challengeDeck.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature') && !card.tapped) {
                        card.addAbility('First Strike');

                        if (!card.phaseHandlers.end) {
                            card.phaseHandlers.end = [];
                        }

                        card.phaseHandlers.end.push(creature => {
                            creature.removeAbility('First Strike');
                        });
                    }
                });
            });
        },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Intervention of Keranos',
        image: '/images/decks/minotaurs/tbth-8-intervention-of-keranos.jpg',
        // At the beginning of combat this turn, Intervention of Keranos deals 3 damage to each creature.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            state.handlers.combatStart.push(challengeDeck => {
                challengeDeck.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature')) {
                        card.damage(3);
                    }
                });
            });
        },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Touch of the Horned God',
        image: '/images/decks/minotaurs/tbth-9-touch-of-the-horned-god.jpg',
        // Whenever a Minotaur attacks this turn, it gains deathtouch until end of turn.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            state.handlers.combatStart.push(challengeDeck => {
                challengeDeck.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature') && !card.tapped) {
                        card.addAbility('Deathtouch');

                        if (!card.phaseHandlers.end) {
                            card.phaseHandlers.end = [];
                        }

                        card.phaseHandlers.end.push(creature => {
                            creature.removeAbility('Deathtouch');
                        });
                    }
                });
            });
        },
        phaseHandlers: {},
        stateHandlers: {},
    },

    {
        name: 'Unquenchable Fury',
        image: '/images/decks/minotaurs/tbth-10-unquenchable-fury.jpg',
        // Each Minotaur can't be blocked this turn except by two or more creatures.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            state.handlers.combatStart.push(challengeDeck => {
                challengeDeck.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature') && !card.tapped) {
                        card.addAbility('Menace');

                        if (!card.phaseHandlers.end) {
                            card.phaseHandlers.end = [];
                        }

                        card.phaseHandlers.end.push(creature => {
                            creature.removeAbility('Menace');
                        });
                    }
                });
            });
        },
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

        castHandler: null,
        phaseHandlers: {
            main: [
                function (card) {
                    $evt.emit('cast-spells', 1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (card) {
                    // The horde sacrifices two Minotaurs
                    $evt.emit('sacrifice-creatures', 2);
                }
            ]
        },
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

        castHandler: null,
        phaseHandlers: {
            main: [
                function (card) {
                    $evt.emit('cast-spells', 1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (card) {
                    // The horde mills 7 cards
                    $evt.emit('mill-cards', 7);
                }
            ]
        },
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

        castHandler: null,
        phaseHandlers: {
            main: [
                function (card) {
                    $evt.emit('cast-spells', 1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (card) {
                    // Each player draws a card
                }
            ]
        },
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

        castHandler: null,
        phaseHandlers: {
            main: [
                function (card) {
                    $evt.emit('cast-spells', 1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (card) {
                    $evt.emit('gain-life', 5);
                }
            ]
        },
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

        castHandler: null,
        phaseHandlers: {
            main: [
                function (card) {
                    $evt.emit('cast-spells', 1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (card) {
                    // Each player reanimates a creature from their graveyard
                }
            ]
        },
    },
];

export default cards;