import Enemy from "../Enemies/base-enemy.js";
import Player from "../Player/player.js";
import Effect from "../Effects/effects.js";

import { effects, getEffectById } from "../Effects/effect-data.js";
/**
 * ====== SKILLS ======
 * 
 *  Skills are ways entities can attack, buff, debuff or heal others.
 *  - Planned to have status effects, debuff, attack damage, and heals
 */

class Skill{
    constructor(data){
        this.name = data.name;
        this.description = data.description;

        this.type = data.type;
        this.output = data.output;
        this.cost = data.cost;
        this.target = data.target

        this.effects = data.effects; // {effect, chance}
        this.isAOE = data.isAOE;
        this.animation = data.animation;

        this.buffs = data.buffs;
        this.debuffs = data.debuffs;
    }

    // Calculates the output of the skill with
    calcOutput(caster){
        const maxVar = 1.2;
        const minVar = 0.8;
        const variation = Math.random() * (maxVar - minVar) + minVar;

        // Change the mod depending on whos attacking
        return Math.round(caster.power * this.output * variation);
    }
}


export default Skill