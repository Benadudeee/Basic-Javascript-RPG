import Player from "../Player/player.js";
import Enemy from "../Enemies/enemy.js";
import Effect from "../effects.js";
import utils from "../Utilities/utils.js";

import {enemies, getEnemyByName} from "../../data/enemies.js"
import {effects, getEffectById} from "../../data/effects.js";


// TODO: Rework update to update select components (userUI, enemyUI) to make 
// Updating more flexible
class BattleAnimations {

};

class TurnManager {

}


class Battle{
    constructor(){
        this.main;
        this.element;

        this.player;
        this.enemy;
        this.difficulty;

        this.isEnd = false;

        this.region = "plains";
        this.playerElem = null,
        this.enemyElem = null

        this.playerEventActive = false; // If the player choose a move. Prevents spamming
    }

    init(main, element, player, difficulty){
        const enemy = new Enemy(enemies[Math.floor(Math.random() * enemies.length)]);

        this.main = main;
        this.player = player;
        this.enemy = enemy;
        this.difficulty = difficulty;
        this.element = element;

        this.renderUI();
        this.playerElem = document.querySelector(".player-stats");
        this.enemyElem = document.querySelector(".enemy-stats");
    }

    
    // NOTE: NEED TO REWORK THIS
    renderUI(){
        // this.element.innerHTML = this.player.showStats() + this.player.showSkills() + this.enemy.showStats();
        this.element.innerHTML = this.player.showStats() + `<div class="player-skills-container"> </div>` + this.enemy.showStats();
        
        const playerOptions = document.querySelector(".player-skills-container");

        this.renderSkillBtns(playerOptions);
        this.renderRechargeBtn(playerOptions);
        this.renderHoverEffects();
    }

    renderSkillBtns(elem){
        this.player.skills.forEach( skill => {
            const button = document.createElement("button");
            button.innerHTML = skill.name;
            
            button.addEventListener("click", () => {
                // Wrap this into a function to reduce clutter
                if(!this.playerEventActive){
                    this.startTurnCycle(skill);
                    this.playerEventActive = true;
                }
                
            })
            
            elem.append(button);
        })
    }

    renderRechargeBtn(elem){
        const rechargeBtn = document.createElement("button");
        rechargeBtn.innerHTML = "Recharge"
        
        rechargeBtn.addEventListener("click", () => {
            this.playerEventActive = true;
            this.playerRecharge();
        });

        elem.append(rechargeBtn);
    }
    
    renderHoverEffects(){
        const buttons = document.querySelectorAll(".player-skills-container button");
        // Plan to do something with this.
        buttons.forEach( (button, i) => button.addEventListener("mouseover", (e) =>  console.log(`Hovering on skill: ${this.player.skills[i].name}`)));
    }
    
    /**
     * Might make this into a class if things get more complex
     * 
     * PROBABLY GOING TO BE A CLASS AS OF 03/30/2025
     */
    showOutput(element, content, type){
        const damageIndicator = document.createElement("p");
        damageIndicator.classList.add("damage-indicator");

        const scale = 0.5;
        const basePx = 16;
        damageIndicator.style.fontSize =  `${basePx + content * scale / 2}px`;

        const colorMap = {
            "heal": "green",
            "damage" : "red",
            "recharge" : "blue"
        }

        damageIndicator.style.color = colorMap[type];

        damageIndicator.textContent = content;
        element.appendChild(damageIndicator);

        damageIndicator.addEventListener("animationend", () => damageIndicator.remove());

        // await utils.wait(1000);
    }
    
    async playerRecharge(){
        const amountRecharged = (this.player.maxEnergy - this.player.energy);
        
        this.player.recharge();
        this.playerElem.innerHTML = this.player.showStats();
        
        this.showOutput(this.playerElem, amountRecharged, "recharge");
        await utils.wait(1000);

        this.enemyMove();
        await utils.wait(1000);
        
        this.checkBattleHasEnded();
    }

    
    getTotalOutput(effects){
        let total = 0;
        effects.forEach(eff => total += eff.apply());
        
        return total;
    }
    async applyEffects(target, type) {
        let totalDmgOutput = 0;
        if(target.effects.length == 0){
            return;
        }
        
        target.effects = target.effects.filter( (eff) => eff.turns > 0 );
        target.health -= totalDmgOutput;
        
        const element = document.querySelector(`.${type}-stats`);
        element.innerHTML = target.showStats();
        
        const indicatorType = (totalDmgOutput < 0)? "heal" : "damage";
        
        this.showOutput(element, totalDmgOutput, indicatorType);
        await utils.wait(1000);
        this.checkBattleHasEnded();
    }

    async playerMove(skill){
        const skillOutput = skill.execute(this.player, this.enemy, this.difficulty);
        
        this.playerElem.innerHTML = this.player.showStats();
        this.enemyElem.innerHTML = this.enemy.showStats();

        if(skill.type === "damage"){
            this.showOutput(this.enemyElem, skillOutput.amount, skillOutput.type);
        }else if(skill.type === "heal"){
            this.showOutput(this.playerElem, skillOutput.amount, skillOutput.type);
        }

        await utils.wait(1000);
        this.checkBattleHasEnded();
    }
    
    /**
     * Helper function for the enemy to attack the player
     * @param {*} e The attacking enemy
     */
    async enemyMove(){
        const enemySkill = this.enemy.skills[Math.floor(Math.random() * this.enemy.skills.length)];
        const skillOutput = enemySkill.execute(this.enemy, this.player, this.difficulty);

        this.playerElem.innerHTML = this.player.showStats();

        // Type Checker (When enemy can heal)
        this.showOutput(this.playerElem, skillOutput.amount, skillOutput.type);
        this.playerEventActive = false;

        await utils.wait(1000);
        this.checkBattleHasEnded();
    }
    
    // Whenever a player casts a skill
    // @return If the battle has ended or not (Might return other info later on)
    async startTurnCycle(skill){
        // I'm just using op armor, this will soon be removed
        await this.playerMove(skill);
        await this.applyEffects(this.player, "player");
 
        await this.enemyMove();
        await this.applyEffects(this.enemy, "enemy");
 
        // this.renderUI();
    }

    /**
     * Helper to determine if the battle has ended
     * 
     * @param {*} player 
     * @param {*} enemy 
     * @returns 
    */
    checkBattleHasEnded(){
        if(this.player.health == 0 || this.enemy.health == 0){
            this.isEnd = true;
            
            if(this.player.health == 0){
    
                this.main.selectCharacter();
    
            }
            if(this.enemy.health == 0){
                
                this.main.setPreFight();

            }
        }
    }
}


export default Battle;