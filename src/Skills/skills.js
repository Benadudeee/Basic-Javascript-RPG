import Enemy from "../Enemies/base.js";
import Player from "../Player/player.js";
import Effect from "../Effects/effects.js";

import { effects, getEffectById } from "../Effects/effect-data.js";
/**
 * ====== SKILLS ======
 * 
 *  Skills are ways entities can attack, buff, debuff or heal others.
 *  - Planned to have status effects, debuff, attack damage, and heals
 */

export class Skill{
    constructor(data){
        this.name = data.name;
        this.description = data.description;
        this.type = data.type;
        this.value = data.value;
        this.cost = data.cost;

        this.effects = data.effects; // {effect, chance}
    }

    calcDamage(self, target, difficulty = null){
        const max = 1.2;
        const min = 0.8;


        const variation = Math.random() * (max - min) + min;

        // Change the mod depending on whos attacking
        if(difficulty !== null && self instanceof Player){
            return Math.round(self.power * this.value * variation * difficulty.enemyDamageMod / target.defense)
        }
        
        if(difficulty !== null && self instanceof Enemy){
            return Math.round(self.power * this.value * variation * difficulty.playerDamageMod / target.defense);
        }

        return Math.round(self.power * this.value * variation / target.defense);
    }

    // Difficulty to implement later

    // Takes the user, target and the difficulty and either heals of attacks
    // execute(self, target, difficulty = null){
    //     let output; 
    //     const appliedEffects = [];

    //     // If the skill has enought mana
    //     if(self instanceof Player){
    //         if(self.energy < this.cost){
    //             return {status: "Not enough mana"};
    //         }

    //         self.energy -= this.cost;
    //     }

    //     if(this.type === "heal"){
    //         output = this.value;
    //         self.health += output;

    //         if(self.health >= self.baseHealth){
    //             self.health = self.baseHealth;
    //         }
    //     }

    //     if(this.type === "damage"){
    //         output = this.calcDamage(self, target, difficulty);
    //         target.health -= output;

    //         if(target.health < 0){
    //             target.health = 0;
    //         }
    //     }

    //     this.effects.forEach(eff => {
    //         let chance = Math.random();

    //         if(chance <= eff.chance){
    //             const newEffect = new Effect(getEffectById(eff.status));
    //             newEffect.turns = eff.turns;

    //             console.log(newEffect);
    //             appliedEffects.push(newEffect);
    //         }
    //     });

    //     target.effects = appliedEffects;

    //     console.log(appliedEffects);

    //     return {type: this.type, name: this.name,  amount: output, effects: appliedEffects};
    // }
}


export class Attack extends Skill{
    constructor(){
        const data = {
            name: "Attack",
            id: "_attack",
            // type: "damage",
            description: "A quick and forceful strike that deals light damage.",
        
            value: 10,
            cost: 3,
        
            effects: [],
            // self_effect: null,
        }

        super(data);
        this.caster = null;
    }

    execute(target=null){
         
        if(target !== null){
            const damage = calcOutput(this.caster, target);

            target.health -= damage;
            return {damage: damage};
        }
        throw new Error(message="Target is null. Make sure to have a target");
    }
}


export class BigAttack extends Skill{
    constructor(){
        const data = {
            name: "Big Attack",
            id: "_big_attack",
            // type: "damage",
            description: "A quick and forceful strike that deals light damage.",
        
            value: 20,
            cost: 3,
            effects: [],
            // self_effect: null,
        }

        super(data);
        this.caster = null;  
    }

    execute(target=null){
        if(target !== null){
            const damage = calcOutput(this.caster, target);
            target.health -= damage;
            
            return {damage: damage};
        }

        throw new Error(message="Target is null. Make sure to have a target");
    }
}

// export default { Skill, Attack, BigAttack };