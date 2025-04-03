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
}

export default Entity;