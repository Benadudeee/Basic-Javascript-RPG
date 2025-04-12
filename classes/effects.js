/**
 * Notes:
 * 
 * - When you have multiple effects, you should count the total of those 
 * (10 pow dmg effect + 20 pow dmg effect = 40 pow dmg effect)
 * 
 * - On battle.js, status effects should be shown in the player interface
 * 
 * - Effects have types: damage, heal, buff, debuff or both.
 */
class Effect{
    constructor(data){
        this.name = data.name;
        this.turns;
        this.type = data.type;
        this.target;
        this.properties = data.properties;

        /**
         * { health, power, defense, energy }
         */
        this.prevStats = {}
    }

    apply(){
        let output = (this.type === "damage")? this.properties.damage : this.properties.regeneration;
        
        // console.log(output, this.properties.damage);
        return output;

    }

    savePrevStats(){
        this.prevStats = {
            health: this.target.health,
            power: this.target.power,
            defense: this.target.defense
        }
    }
}

export default Effect;