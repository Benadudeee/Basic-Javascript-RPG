class Entity{
    constructor(data){
        this.name = data.name;
        this.health = data.health;
        this.power = data.power;
        this.defense = data.defense;
        this.level = data.level;

        this.skills = data.skills;


        this.baseHealth = this.health;
        this.basePower = this.power;
        this.baseDefense = this.defense;


        this.effects = [];
    }

    setBuff(){

    }

    setDebuff(){

    }
    /**
     * Applies the status effects to the player at the start of their turn after it has
     * been applied
     */
    updateStatusEffects(){
        // Group through status effects

        // Apply status effects to the player and decrement them by 1
        // If the effects are finished effect.turns < 1, then remove it from the effects

        // Return the output of the damage. heal, buff, debuff
    }
}

export default Entity;