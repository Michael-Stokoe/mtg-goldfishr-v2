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
        // Hero's Reward - When Hydra Head leaves the battlefield,
        // each player gains 2 life.

        superTypes: ['Creature'],
        subTypes: ['Head'],
        amount: 11,

        power: 0,
        toughness: 3,

        ranking: 5,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Ravenous Brute Head',
        image: '/images/decks/hydra/tfth-2-ravenous-brute-head.jpg',
        // Hero's Reward - When Ravenous Brute Head leaves the battlefield,
        // each player gains 2 life and draws a card.

        superTypes: ['Creature'],
        subTypes: ['Head'],
        amount: 4,

        power: 0,
        toughness: 6,

        ranking: 4,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Savage Vigor Head',
        image: '/images/decks/hydra/tfth-3-savage-vigor-head.jpg',
        // At the beginning of the Hydra’s end step, reveal the top card of the
        // Hydra’s library and the Hydra casts that card.
        // Hero's Reward - When Savage Vigor Head leaves the battlefield,
        // each player gains 4 life and draws a card.

        superTypes: ['Creature'],
        subTypes: ['Head'],
        amount: 1,

        power: 0,
        toughness: 8,

        ranking: 2,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Snapping Fang Head',
        image: '/images/decks/hydra/tfth-5-snapping-fang-head.jpg',
        // At the beginning of the Hydra’s end step, Snapping Fang Head deals 1 damage to each player.
        // Hero's Reward - When Snapping Fang Head leaves the battlefield,
        // each player gains 4 life and draws a card.

        superTypes: ['Creature'],
        subTypes: ['Head'],
        amount: 1,

        power: 0,
        toughness: 8,

        ranking: 2,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Shrieking Titan Head',
        image: '/images/decks/hydra/tfth-4-shrieking-titan-head.jpg',
        // At the beginning of the Hydra’s end step, each player discards a card.
        // Hero's Reward - When Shrieking Titan Head leaves the battlefield,
        // each player gains 4 life and draws a card.

        superTypes: ['Creature'],
        subTypes: ['Head'],
        amount: 1,

        power: 0,
        toughness: 8,

        ranking: 2,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },

    // Sorceries

    {
        name: 'Disorienting Glower',
        image: '/images/decks/hydra/tfth-6-disorienting-glower.jpg',
        // Players can’t cast spells until the Hydra’s next turn.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Distract the Hydra',
        image: '/images/decks/hydra/tfth-7-distract-the-hydra.jpg',
        // Each player may sacrifice a creature.
        // Each player who sacrificed a creature this way chooses a Head and taps it.
        // Each player who didn’t sacrifice a creature loses 3 life.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Grown from the Stump',
        image: '/images/decks/hydra/tfth-8-grown-from-the-stump.jpg',
        // Place exactly two cards named Hydra Head onto the battlefield from the Hydra’s graveyard.
        // If you can’t, reveal cards from the top of the Hydra’s library until you reveal a Head card.
        // Put that card onto the battlefield and the rest into the Hydra’s graveyard.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Hydra\'s Impenetrable Hide',
        image: '/images/decks/hydra/tfth-9-hydra-s-impenetrable-hide.jpg',
        // Each Head gains indestructible until the end of the Hydra’s next turn.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Neck Tangle',
        image: '/images/decks/hydra/tfth-10-neck-tangle.jpg',
        // If there are five or more Heads on the battlefield,
        // tap two of them and they don’t untap during the Hydra’s next untap step.
        // Otherwise, reveal the top card of the Hydra’s library and the Hydra casts that card.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 3,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Noxious Hydra Breath',
        image: '/images/decks/hydra/tfth-11-noxious-hydra-breath.jpg',
        // Choose one — Noxious Hydra Breath deals 5 damage to each player;
        // or destroy each tapped non-Head creature.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Strike the Weak Spot',
        image: '/images/decks/hydra/tfth-12-strike-the-weak-spot.jpg',
        // Destroy target Head. If that Head was elite, the Hydra takes an extra turn after this one.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 2,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Swallow the Hero Whole',
        image: '/images/decks/hydra/tfth-13-swallow-the-hero-whole.jpg',
        // Each player exiles a creature they control.
        // Until the Hydra’s next turn, when a Head leaves the battlefield,
        // return the exiled cards to the battlefield under their owners’ control.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 5,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Torn Between Heads',
        image: '/images/decks/hydra/tfth-14-torn-between-heads.jpg',
        // Tap up to two Heads. They don’t untap during the Hydra’s next untap step.
        // Torn Between Heads deals 5 damage to each player.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 4,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
    {
        name: 'Unified Lunge',
        image: '/images/decks/hydra/tfth-15-unified-lunge.jpg',
        // Unified Lunge deals X damage to each player, where X is the number of Heads on the battlefield.

        superTypes: ['Sorcery'],
        subTypes: [],
        amount: 6,

        power: 0,
        toughness: 0,

        ranking: 0,

        castHandler: null,
        phaseHandlers: {},
        stateHandlers: {},
    },
];

export default cards;