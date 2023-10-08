export const rules = `
<ul class="ml-6 list-outside list-disc">
    
</ul>

<div>
<a href="https://mtg.fandom.com/wiki/Face_the_Hydra" class="text-neutral-400 hover:text-white hover:underline" target="_blank">More information here</a>
</div>
`;

export const cards = [
    // Creatures

    {
        name: 'Hydra Head',
        image: '/images/decks/hydra/tfth-1-hydra-head.jpg',

        superTypes: ['Creature'],
        subTypes: ['Head'],
        amount: 11,
        canAttack: false,

        power: 0,
        toughness: 3,

        ranking: 5,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    $evt.emit('gain-life', 2);
                }
            ]
        },
    },
    {
        name: 'Ravenous Brute Head',
        image: '/images/decks/hydra/tfth-2-ravenous-brute-head.jpg',

        superTypes: ['Elite', 'Creature'],
        subTypes: ['Head'],
        amount: 4,
        canAttack: false,

        power: 0,
        toughness: 6,

        ranking: 4,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {
            death: [
                function (state) {
                    $evt.emit('gain-life', 2);
                    // TODO: Notify player to draw a card.
                }
            ]
        },
    },
    {
        name: 'Savage Vigor Head',
        image: '/images/decks/hydra/tfth-3-savage-vigor-head.jpg',

        superTypes: ['Elite', 'Creature'],
        subTypes: ['Head'],
        amount: 1,
        canAttack: false,

        power: 0,
        toughness: 8,

        ranking: 2,

        castHandler: null,
        phaseHandlers: {
            endStep: [
                function (card) {
                    // reveal top card of library
                    // cast card
                    $evt.emit('cast-spells', 1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (state) {
                    $evt.emit('gain-life', 4);
                    // TODO: Notify player to draw a card.
                }
            ]
        },
    },
    {
        name: 'Snapping Fang Head',
        image: '/images/decks/hydra/tfth-5-snapping-fang-head.jpg',

        superTypes: ['Elite', 'Creature'],
        subTypes: ['Head'],
        amount: 1,
        canAttack: false,

        power: 0,
        toughness: 8,

        ranking: 2,

        castHandler: null,
        phaseHandlers: {
            endStep: [
                function (card) {
                    card.dealsDamage(1);
                }
            ]
        },
        stateHandlers: {
            death: [
                function (state) {
                    $evt.emit('gain-life', 4);
                    // TODO: Notify player to draw a card.
                }
            ]
        },
    },
    {
        name: 'Shrieking Titan Head',
        image: '/images/decks/hydra/tfth-4-shrieking-titan-head.jpg',

        superTypes: ['Elite', 'Creature'],
        subTypes: ['Head'],
        amount: 1,
        canAttack: false,

        power: 0,
        toughness: 8,

        ranking: 2,

        castHandler: null,
        phaseHandlers: {
            endStep: [
                function (card) {
                    // TODO: Notify player to discard a card in their end step
                }
            ]
        },
        stateHandlers: {
            death: [
                function (state) {
                    $evt.emit('gain-life', 4);
                    // TODO: Notify player to draw a card.
                }
            ]
        },
    },

    // Sorceries

    {
        name: 'Disorienting Glower',
        image: '/images/decks/hydra/tfth-6-disorienting-glower.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // TODO: Notify player they can't cast spells until the Hydra's next turn.
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Distract the Hydra',
        image: '/images/decks/hydra/tfth-7-distract-the-hydra.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // TODO:
            // each player may sacrifice a creature
            // each player who sacrificed a creature chooses a head and taps it
            // each player who didn't sacrifice a creature loses 3 life
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Grown from the Stump',
        image: '/images/decks/hydra/tfth-8-grown-from-the-stump.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // place exactly two cards named Hydra Head onto the battlefield from the Hydra’s graveyard
            // if you can't, reveal cards from the top of the Hydra’s library until you reveal a Head card
            // put that card onto the battlefield and the rest into the Hydra’s graveyard
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Hydra\'s Impenetrable Hide',
        image: '/images/decks/hydra/tfth-9-hydra-s-impenetrable-hide.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            state.battlefield.forEach(function (card) {
                if (card.subTypes.includes('Head')) {
                    card.abilities.push('Indestructible');
                }
            });

            state.nextTurnHandlers.end.push(function (state) {
                state.battlefield.forEach(function (card) {
                    if (card.subTypes.includes('Head')) {
                        card.abilities = card.abilities.filter(function (ability) {
                            return ability !== 'Indestructible';
                        });
                    }
                });
            });
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Neck Tangle',
        image: '/images/decks/hydra/tfth-10-neck-tangle.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 3,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // TODO:
            // if there are five or more Heads on the battlefield,
            // tap two of them and they don’t untap during the Hydra’s next untap step
            // otherwise, reveal the top card of the Hydra’s library and the Hydra casts that card
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Noxious Hydra Breath',
        image: '/images/decks/hydra/tfth-11-noxious-hydra-breath.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // choose one — Noxious Hydra Breath deals 5 damage to each player
            // or destroy each tapped non-Head creature
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Strike the Weak Spot',
        image: '/images/decks/hydra/tfth-12-strike-the-weak-spot.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // destroy target head
            // if that head was elite, the Hydra takes an extra turn after this one
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Swallow the Hero Whole',
        image: '/images/decks/hydra/tfth-13-swallow-the-hero-whole.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // each player exiles a creature they control
            // until the Hydra’s next turn, when a Head leaves the battlefield,
            // return the exiled cards to the battlefield under their owners’ control
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Torn Between Heads',
        image: '/images/decks/hydra/tfth-14-torn-between-heads.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // tap up to two heads
            // they don’t untap during the Hydra’s next untap step
            // Torn Between Heads deals 5 damage to each player
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Unified Lunge',
        image: '/images/decks/hydra/tfth-15-unified-lunge.jpg',

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 6,
        canAttack: false,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: function (state) {
            // Unified Lunge deals X damage to each player, where X is the number of Heads on the battlefield
        },
        phaseHandlers: {},
        stateHandlers: {},
    },
];

export default cards;