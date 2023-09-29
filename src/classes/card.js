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

    isAttacking = false;
    isBlocked = false;
    isBlockedLethal = false;

    ranking = 0;

    counters = [];

    phaseHandlers = {
        untap: [],
        upkeep: [],
        draw: [],
        main1: [],
        combatStart: [],
        attackersDeclared: [],
        blockersDeclared: [],
        combatDamage: [],
        combatEnd: [],
        main2: [],
        end: [],
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

        this.stateHandlers = card.stateHandlers;
        this.phaseHandlers = card.phaseHandlers;
    }
}