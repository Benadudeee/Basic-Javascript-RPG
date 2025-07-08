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
}

export default Entity;