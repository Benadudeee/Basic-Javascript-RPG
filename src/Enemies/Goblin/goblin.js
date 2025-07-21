import Enemy from "../base-enemy.js";
import { getEnemyById } from "../enemy-data.js";
import { GoblinBehavior } from "./goblin-behavior.js";

/**
 * First Enemy in game
 * 
 * Basic Enemy, hits big attack every three turns (Cuz I want to)
 * Buffs self if hp < 50% (To test complexity)
 */

const data = getEnemyById('_goblin');

class Goblin extends Enemy{
    constructor(){
        super(data);
        this.img = "";

        this.behavior = new GoblinBehavior(this);
    }

    decideAttack(){
        if(this.behavior !== null) return this.behavior.decideMove();
    }
}

export default Goblin;