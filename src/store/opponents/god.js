export const rules = `
<ul class="ml-6 list-outside list-disc">
    
</ul>

<div>
<a href="https://mtg.fandom.com/wiki/Defeat_a_God" class="text-neutral-400 hover:text-white hover:underline" target="_blank">More information here</a>
</div>
`;

export const cards = [
    // Legendary Enchantment Creatures
    {
        name: 'Xenagos Ascended',
        image: '/images/decks/god/tdag-1-xenagos-ascended.jpg',
        // Xenagos Ascended can’t leave the battlefield as long as a Reveler is on the battlefield.
        // When Xenagos Ascended leaves the battlefield, each player wins the game.

        superTypes: ['Legendary', 'Enchantment', 'Creature'],
        subTypes: ['God'],
        amount: 1,
        canAttack: false,

        power: 6,
        toughness: 5,

        ranking: 100,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    // Player wins the game
                }
            ]
        },
    },

    // Enchantment Creatures
    {
        name: 'Maddened Oread',
        image: '/images/decks/god/tdag-4-maddened-oread.jpg',
        // As long as five or more Revelers are on the battlefield, Maddened Oread attacks each turn if able.
        // Hero’s Reward — When Maddened Oread leaves the battlefield, each player gains 3 life.

        superTypes: ['Enchantment', 'Creature'],
        subTypes: ['Nymph', 'Reveler'],
        amount: 2,
        canAttack: false,

        power: 4,
        toughness: 2,

        ranking: 10,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    // player gains 3 life
                }
            ]
        },
    },

    // Creatures
    {
        name: 'Ecstatic Piper',
        image: '/images/decks/god/tdag-3-ecstatic-piper.jpg',
        // When Ecstatic Piper enters the battlefield, Xenagos Ascended attacks this turn if able.
        // Hero’s Reward — When Ecstatic Piper leaves the battlefield, each player gains 2 life.

        superTypes: ['Creature'],
        subTypes: ['Nymph', 'Reveler'],
        amount: 16,
        canAttack: false,

        power: 2,
        toughness: 2,

        ranking: 10,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            enterBattlefield: [
                function (card) {
                    // Xenagos Ascended attacks this turn if able
                }
            ],
            death: [
                function (state) {
                    // player gains 2 life
                }
            ]
        },
    },
    {
        name: 'Pheres-Band Revelers',
        image: '/images/decks/god/tdag-5-pheres-band-revelers.jpg',
        // Hero’s Reward — When Pheres-Band Revelers leaves the battlefield, each player draws a card.

        superTypes: ['Creature'],
        subTypes: ['Nymph', 'Reveler'],
        amount: 4,
        canAttack: false,

        power: 4,
        toughness: 4,

        ranking: 10,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    // player draws a card
                }
            ]
        },
    },
    {
        name: 'Rollicking Throng',
        image: '/images/decks/god/tdag-2-rollicking-throng.jpg',
        // When Rollicking Throng enters the battlefield, reveal the top card of Xenagos’s library
        // and Xenagos casts that card. (This ability doesn’t trigger as the game begins.).

        superTypes: ['Creature'],
        subTypes: ['Nymph', 'Reveler'],
        amount: 6,
        canAttack: false,

        power: 1,
        toughness: 3,

        ranking: 10,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            enterBattlefield: [
                function (state) {
                    // Xenagos casts the top card of his library
                }
            ],
        },
    },
    {
        name: 'Serpent Dancers',
        image: '/images/decks/god/tdag-6-serpent-dancers.jpg',
        // Deathtouch
        // Hero’s Reward — When Serpent Dancers leaves the battlefield, each player draws a card.

        superTypes: ['Creature'],
        subTypes: ['Nymph', 'Reveler'],
        amount: 2,
        canAttack: false,
        abilities: ['Deathtouch'],

        power: 2,
        toughness: 4,

        ranking: 10,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    // player draws a card
                }
            ]
        },
    },
    {
        name: 'Wild Maenads',
        image: '/images/decks/god/tdag-7-wild-maenads.jpg',
        // First Strike
        // Hero’s Reward — When Wild Maenads leaves the battlefield, each player gains 3 life.

        superTypes: ['Creature'],
        subTypes: ['Nymph', 'Reveler'],
        amount: 2,
        canAttack: false,
        abilities: ['First Strike'],

        power: 3,
        toughness: 1,

        ranking: 10,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    // player gains 3 life
                }
            ]
        },
    },

    // Sorceries
    {
        name: 'Impulsive Charge',
        image: '/images/decks/god/tdag-8-impulsive-charge.jpg',
        // At the beginning of combat this turn, all Revelers gain haste until end of turn and attack this combat if able.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 7,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // all Revelers gain haste until end of turn and attack this combat if able
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Impulsive Destruction',
        image: '/images/decks/god/tdag-9-impulsive-destruction.jpg',
        // Each player may sacrifice an artifact or enchantment.
        // Impulsive Destruction deals 3 damage to each player who didn’t sacrifice a permanent this way

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function () {
            // player may sacrifice an artifact or enchantment
            // Impulsive Destruction deals 3 damage if they didn’t
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Impulsive Return',
        image: '/images/decks/god/tdag-10-impulsive-return.jpg',
        // Return two cards named Ecstatic Piper from Xenagos’s graveyard to the battlefield.
        // At the beginning of combat this turn, Impulsive Return deals damage to each player
        // equal to the number of Revelers on the battlefield

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // Return two cards named Ecstatic Piper from Xenagos’s graveyard to the battlefield
            // Impulsive Return deals damage to each player equal to the number of Revelers on the battlefield
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Rip to Pieces',
        image: '/images/decks/god/tdag-11-rip-to-pieces.jpg',
        // At the beginning of combat this turn, each Reveler deals 1 damage
        // to each player and each creature those players control

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // at the beginning of combat this turn,
            // each Reveler deals 1 damage to each player and each creature those players control
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Xenagos\'s Scorn',
        image: '/images/decks/god/tdag-12-xenagos-s-scorn.jpg',
        // Xenagos Ascended gains trample until end of turn and attacks this turn if able

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 3,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // Xenagos Ascended gains trample until end of turn and attacks this turn if able
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Xenagos\'s Strike',
        image: '/images/decks/god/tdag-13-xenagos-s-strike.jpg',
        // Xenagos’s Strike deals 4 damage to each player

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // Xenagos’s Strike deals 4 damage to the player
        },
        phaseHandlers: {},
        stateHandlers: {},
    },

    // Enchantments
    {
        name: 'Dance of Flame',
        image: '/images/decks/god/tdag-14-dance-of-flame.jpg',
        // Whenever a Reveler attacks, Dance of Flame deals 1 damage to each player

        superTypes: ['Enchantment'],
        subTypes: [],
        amount: 2,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {
            combatStart: [
                function (card) {
                    // Whenever a Reveler attacks, Dance of Flame deals 1 damage to each player
                }
            ]
        },
        stateHandlers: {},
    },
    {
        name: 'Dance of Panic',
        image: '/images/decks/god/tdag-15-dance-of-panic.jpg',
        // As long as five or more Revelers are on the battlefield, all Revelers have haste and attack each turn if able

        superTypes: ['Enchantment'],
        subTypes: [],
        amount: 2,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {
            combatStart: [
                function (card) {
                    // all Revelers have haste and attack each turn if able
                }
            ]
        },
        stateHandlers: {},
    },
];

export default cards;