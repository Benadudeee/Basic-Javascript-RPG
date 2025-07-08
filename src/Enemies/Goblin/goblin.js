import Enemy from "../base.js";
import Entity from "../../core/entity.js";
import { getEnemyById } from "../enemy-data.js";

import { GoblinBehavior } from "./goblin-behavior.js";
import { Attack, BigAttack } from "../../Skills/skills.js";

/**
 * First Enemy in game
 * 
 * Basic Enemy, hits big attack every three turns (Cuz I want to)
 * Buffs self if hp < 50% (To test complexity)
 */

const data = getEnemyById('_goblin');
console.log(data.name)

class Goblin extends Entity{
    constructor(){
        super(data);
        this.img = "";

        this.skills = {
            attack: new Attack(),
            bigAttack: new BigAttack(),
            // revUp : new RevUp(),
        };

        this.behavior = new GoblinBehavior(this);
    }

    foo(){
        if(this.behavior !== null) return this.behavior.decideMove();
    }
}

export default Goblin;