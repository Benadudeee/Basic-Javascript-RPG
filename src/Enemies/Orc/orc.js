import Enemy from "../base-enemy.js";
import { OrcBehavior } from "./orc-behavior.js";

import { getSkillById } from "../../Skills/skill-data.js";
import { getEnemyById } from "../enemy-data.js";

/**
 * Second Enemy in game
 * 
 * More tanky, more damaging.
 */

const data = getEnemyById('_orc');
console.log(data.name)

class Orc extends Enemy{
    constructor(data){
        super(data);
        this.img = "";

        this.skills = {
            attack: new Attack(this),
            bigAttack: new BigAttack(this),
            // revUp : new RevUp(),
        };

        this.behavior = new OrcBehavior(this);
    }

    foo(){
        if(this.behavior !== null) return this.behavior.decideMove();
    }
}

export default Orc;