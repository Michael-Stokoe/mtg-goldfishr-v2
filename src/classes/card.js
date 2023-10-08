import { getCurrentInstance } from "vue";
import { v4 as uuidv4 } from 'uuid';

export default class Card {
    id = null;
    owner = null;

    image = null;

    name = '';
    superTypes = [];
    subTypes = [];

    tapped = false;

    power = null;
    toughness = null;
    abilities = [];

    canAttack = true;
    isAttacking = false;
    isBlocked = false;
    isBlockedLethal = false;

    ranking = 0;

    counters = [];

    castHandler = function () { };

    phaseHandlers = {
        // untap: [],
        // upkeep: [],
        // draw: [],
        // main: [],
        // combatStart: [],
        // attackersDeclared: [],
        // blockersDeclared: [],
        // combatDamage: [],
        // combatEnd: [],
        // secondMain: [],
        // end: [],

        
        untap: [],
        upkeep: [],
        draw: [],
        main: [],
        combatStart: [],
        combatDamage: [],
        combatEnd: [],
        secondMain: [],
        endStep: [],
    }

    stateHandlers = {
        enterBattlefield: [],
        death: [],
    }

    constructor(card) {
        this.id = uuidv4();

        this.image = card.image;

        this.name = card.name;

        this.superTypes = card.superTypes;
        this.subTypes = card.subTypes;

        this.power = card.power;
        this.toughness = card.toughness;

        this.ranking = card.ranking;

        this.castHandler = card.castHandler;

        this.stateHandlers = card.stateHandlers;
        this.phaseHandlers = card.phaseHandlers;

        this.canAttack = card.canAttack;
    }

    destroy() {
        $evt.emit('destroy-card', this);
    }

    damage(amount) {
        let remaining = this.toughness - amount;

        if (remaining <= 0) {
            this.destroy();
        }
    }

    addAbility(ability) {
        this.abilities.push(ability);
    }

    removeAbility(ability) {
        this.abilities = this.abilities.filter(a => a !== ability);
    }

    dealsDamage(amount = null) {
        if (amount !== null) {
            $evt.emit('lose-life', amount);
        } else {
            $evt.emit('lose-life', this.power);
        }

        $evt.emit('card-deals-damage', this);
    }
}