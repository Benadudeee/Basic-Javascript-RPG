//TODO: Actually make this

/*This object boosts the power of your character 
depending on the boost it has by a multiple*/

// Formula for reference Addition = (current weapon) / (current weapon + base)
class Weapon{
    constructor(data){
        this.name = data.name;
        this.usedBy = data.usedBy;

        this.healthMultiplier = data.multipliers.health;
        this.powerMultiplier = data.multipliers.power;
        this.defenseMutiplier = data.multipliers.defense;
        this.energyMultiplier = data.multipliers.energy;

        this.effects = data.effects;
    }

    statBoost(player){
        player.health = player.baseHealth * this.healthMultiplier
        player.power = player.basePower * this.powerMultiplier;
        player.defense = player.baseDefense * this.defenseMutiplier;
        player.energy = player.baseEnergy * this.energyMultiplier;
    }
}

/*This object boost the defense of your chracter 
depending on the boost it has by a multiple*/

// Formula for reference Reduction = (current armor) / (current armor + base)
class Armor{
    constructor(data){
        this.name = data.name;

        this.healthMultiplier = data.multipliers.health;
        this.powerMultiplier = data.multipliers.power;
        this.defenseMutiplier = data.multipliers.defense;
        this.energyMultiplier = data.multipliers.energy;

        this.effects = data.effects;
    }

    statBoost(player){
        player.health = Math.round(player.baseHealth * this.healthMultiplier);
        player.power = Math.round(player.basePower * this.powerMultiplier);
        player.defense = Math.round(player.baseDefense * this.defenseMutiplier);
        player.energy = Math.round(player.baseEnergy * this.energyMultiplier);
        
        player.maxHealth = Math.round(player.baseHealth * this.healthMultiplier);
        player.maxPower = Math.round(player.basePower * this.powerMultiplier);
        player.maxDefense = Math.round(player.baseDefense * this.defenseMutiplier);
        player.maxEnergy = Math.round(player.baseEnergy * this.energyMultiplier);
    }

    // changeEquip = function(armorname){
    //     curArmor = armorname;
    //     armor.statBoost();

    //     sys.setPreFight(curPlayer, area);    
    // }

}

export { Weapon, Armor }