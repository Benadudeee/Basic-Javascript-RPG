import Enemy from "./enemy.js";
import Player from "./player.js";
import Effect from "./effects.js";

import { effects, getEffectById } from "../data/effects.js";
/**
 * ====== SKILLS ======
 * 
 *  Skills are ways entities can attack, buff, debuff or heal others.
 *  - Planned to have status effects, debuff, attack damage, and heals
 */

class Skill{
    constructor(data){
        this.name = data.name;
        this.type = data.type;
        this.value = data.value;
        this.cost = data.cost;

        this.effects = data.effects; // {effect, chance}
    }

    // critMultiplier(){
    //     let multiplier = 1;

    //     return multiplier;
    // }
    calcDamage(self, target, difficulty = null){
        const max = 1.2;
        const min = 0.8;
        let difficultyMult = 1;


        const randomMultiplier = Math.random() * (max - min) + min;

        // Change the mod depending on whos attacking
        if(difficulty !== null && self instanceof Player){
            return Math.round(self.power * this.value * randomMultiplier * difficulty.enemyDamageMod / target.defense)

        }
        
        if(difficulty !== null && self instanceof Enemy){
            return Math.round(self.power * this.value * randomMultiplier * difficulty.playerDamageMod / target.defense);
        }

        return Math.round(self.power * this.value * randomMultiplier / target.defense);
    }

    // Difficulty to implement later

    // Takes the user, target and the difficulty and either heals of attacks
    execute(self, target, difficulty = null){
        let output; 
        const appliedEffects = [];

        // If the skill has enought mana
        if(self instanceof Player){
            if(self.energy < this.cost){
                return {status: "Not enough mana"};
            }

            self.energy -= this.cost;
        }

        if(this.type === "heal"){
            output = this.value;
            self.health += output;

            if(self.health >= self.baseHealth){
                self.health = self.baseHealth;
            }
        }

        if(this.type === "damage"){
            output = this.calcDamage(self, target, difficulty);
            target.health -= output;

            if(target.health < 0){
                target.health = 0;
            }
        }

        this.effects.forEach(eff => {
            let chance = Math.random();

            if(chance <= eff.chance){
                const newEffect = new Effect(getEffectById(eff.status));
                newEffect.turns = eff.turns;

                console.log(newEffect);
                appliedEffects.push(newEffect);
            }
        });

        target.effects = appliedEffects;

        console.log(appliedEffects);

        return {type: this.type, name: this.name,  amount: output, effects: appliedEffects};
    }
}


export default Skill;