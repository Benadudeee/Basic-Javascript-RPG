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
        this.turns = data.turns;

    }
}