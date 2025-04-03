import Entity from "./entity.js";
import { characters, getCharacterByRole } from "../data/characters.js";

class Player extends Entity{
    constructor(data){
        super(data);
        this.energy = data.energy;
        this.baseEnergy = data.energy;

        this.gold = 100;

        // Max HP (Changes when equipment is changed)
        this.maxHealth = data.health;
        this.maxPower = data.power;
        this.maxDefense = data.defense;
        this.maxEnergy = data.energy;

        // To implement later
        this.weapons = [];
        this.armour = [];
        this.items = []; 

        this.currentWeapon;
        this.currentArmor;
    }

    recharge(){
        this.energy = this.baseEnergy;
    }

    showStats(){
        return (
        `   <section class="player-stats">
                <h3>${this.name}</h3>
                <p>Health: ${this.health} / ${this.maxHealth}</p>
                <p>Energy: ${this.energy} / ${this.maxEnergy}</p>
                <p>Power: ${this.power}</p>
                <p>Defense: ${this.defense}</p>
            </section>`)
    }

    /**
     * Simple helper function to reset players base stats
     */
    resetBaseStats(){
        this.health = this.baseHealth;
        this.power = this.basePower;
        this.defense = this.baseDefense;
        this.energy = this.baseEnergy;
    }

    equipWeapon(weapon){
        if(weapon.usedBy.includes(this.name)){
            // Add 
            this.resetBaseStats();

            weapon.statBoost(this);

            return this;
        }

        return {error: `Class cannot use ${weapon.name}`};
    }

    equipArmor(armor){
        this.armor = armor;

        // Reset stats function? TODO: Reimplement
        this.resetBaseStats();

        armor.statBoost(this);

        return this;
    }

    // showSkills(){
    //     return this.skills.map(skill => `<button class="skill-option">${skill.name}</button>`).join("") 
    //             +  `<button class="skill-recharge"> Recharge </button>`
    // }
}

export default Player;