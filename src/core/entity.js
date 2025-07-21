class Entity{
    constructor(data){
        this.name = data.name;

        this.health = data.health;
        this.power = data.power;
        this.defense = data.defense;

        this.baseHealth = this.health;
        this.basePower = this.power;
        this.baseDefense = this.defense;

        this.level = data.level;
        // this.skills = null;
    }

    // Takes health from the player by dmg and returns 0 it the health is negative
    takeDamage(output){
        this.health -= output;

        if(this.health < 0){
            this.health = 0;
        }
    }

    heal(output){
        this.health += output;

        if(this.health > this.baseHealth){
            this.health = this.baseHealth;
        }
    }

    // Applies a buff to the entity
    applyBuff(health, power, defense){
        this.health *= health;
        this.power *= power;
        this.defense *= defense;
    }

    // Helper to apply debuff
    applyDebuff(health, power, defense){
        this.health *= health;
        this.power *= power;
        this.defense *= defense;
    }

}

export default Entity;