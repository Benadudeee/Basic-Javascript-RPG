import Player from "./player.js";
import Enemy from "./enemy.js";
import Effect from "./effects.js";
import utils from "./utils.js";

import {enemies, getEnemyByName} from "../data/enemies.js"
import {effects, getEffectById} from "../data/effects.js";


// TODO: Rework update to update select components (userUI, enemyUI) to make 
// Updating more flexible

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

    /**
     * Might make this into a class if things get more complex
     * 
     * PROBABLY GOING TO BE A CLASS AS OF 03/30/2025
     */
    async showOutputIndicator(element, content, type){
        const damageIndicator = document.createElement("p");
        damageIndicator.classList.add("damage-indicator");

        const scale = 0.5;
        const basePx = 16;
        damageIndicator.style.fontSize =  `${basePx + content * scale / 2}px`;

        let color;
        switch (type){
            case "heal":
                color = "green";
            break;

            case "damage":
                color = "red";
            break;

            case "recharge":
                color = "blue";
            break;
        }

        damageIndicator.style.color = color
        damageIndicator.textContent = content;
        element.appendChild(damageIndicator);
        
        setTimeout( () => {
            damageIndicator.remove();
        }, 1000);

        // await utils.wait(1000);
    }
    
    // NOTE: NEED TO REWORK THIS
    renderUI(){
        // this.element.innerHTML = this.player.showStats() + this.player.showSkills() + this.enemy.showStats();
        this.element.innerHTML = this.player.showStats() + `<div class="player-skills-container"> </div>` + this.enemy.showStats();
        
        const playerSkills = document.querySelector(".player-skills-container");
        this.player.skills.forEach( skill => {
            const button = document.createElement("button");
            button.innerHTML = skill.name;

            button.addEventListener("click", () => {
                // Wrap this into a function to reduce clutter
                if(!this.playerEventActive){
                    this.castSkillEvent(skill);
                    this.playerEventActive = true;
                }

            })

            // Plan to add info section
            // button.addEventListener("mouseover", (e) => {
            //     console.log(`Hovering on skill: ${skill.name}`)
            // })

            playerSkills.append(button);
        })

        const rechargeBtn = document.createElement("button");
        rechargeBtn.innerHTML = "Recharge"

        rechargeBtn.addEventListener("click", () => {
            this.playerEventActive = true;
            this.playerRecharge();
        });

        playerSkills.append(rechargeBtn);
    }

    async playerRecharge(){
        const amountRecharged = (this.player.maxEnergy - this.player.energy);

        this.player.recharge();
        this.playerElem.innerHTML = this.player.showStats();

        this.showOutputIndicator(this.playerElem, amountRecharged, "recharge");
        await utils.wait(1000);

        this.enemyAttack();
        await utils.wait(1000);
        
        if(this.battleHasEnded()){
            this.end( () => this.main.selectCharacter());
            return;
        }
    }

    // Whenever a player casts a skill
    // @return If the battle has ended or not (Might return other info later on)
    async castSkillEvent(skill){
        // I'm just using op armor, this will soon be removed
        this.playerAttack(skill);
        await utils.wait(1000);
        
        this.applyEffects(this.player, "player");
        await utils.wait(1000);

        if(this.battleHasEnded()){
            this.end( () => this.main.setPreFight());
            return;
        }
        // this.enemy.attackPattern()
        // We might implement the above later, but for now It will choose randomly
        this.enemyAttack();
        await utils.wait(1000);

        this.applyEffects(this.enemy, "enemy");
        await utils.wait(1000);
        
        if(this.battleHasEnded()){
            this.end( () => this.main.selectCharacter());
            return;
        }
        // this.renderUI();
    }

    async applyEffects(target, name) {
        let totalDmgOutput = 0;
        if(target.effects.length == 0){
            return;
        }

        target.effects = target.effects.filter( (eff) => eff.turns > 0 );
        console.log(`${name} Effects:  ${target.effects}`);

        target.effects.forEach( (eff) => {
            totalDmgOutput += eff.apply();
            eff.turns -= 1;
        } )


        console.log(totalDmgOutput);
        target.health -= totalDmgOutput;
        const element = document.querySelector(`.${name}-stats`);// Change name

        element.innerHTML = target.showStats();

        const indicatorType = (totalDmgOutput < 0)? "heal" : "damage"
        
        this.showOutputIndicator(element, totalDmgOutput, indicatorType);
    }

    playerAttack(skill){
        const skillOutput = skill.execute(this.player, this.enemy, this.difficulty);
        
        this.playerElem.innerHTML = this.player.showStats();
        this.enemyElem.innerHTML = this.enemy.showStats();

        if(skill.type === "damage"){
            this.showOutputIndicator(this.enemyElem, skillOutput.amount, skillOutput.type);
        }else if(skill.type === "heal"){
            this.showOutputIndicator(this.playerElem, skillOutput.amount, skillOutput.type);
        }
    }
    
    /**
     * Helper function for the enemy to attack the player
     * @param {*} e The attacking enemy
     */
    enemyAttack(){
        const enemySkill = this.enemy.skills[Math.floor(Math.random() * this.enemy.skills.length)];
        const skillOutput = enemySkill.execute(this.enemy, this.player, this.difficulty);

        console.log(enemySkill.type);
        this.playerElem.innerHTML = this.player.showStats();

        // Type Checker (When enemy can heal)
        this.showOutputIndicator(this.playerElem, skillOutput.amount, skillOutput.type);
        
        this.playerEventActive = false;
    }

    /**
     * Helper to determine if the battle has ended
     * 
     * @param {*} player 
     * @param {*} enemy 
     * @returns 
     */
    battleHasEnded(){
        if(this.player.health == 0 || this.enemy.health == 0){
            this.isEnd = true;
        }

        return this.isEnd;
    }

    end(callback){
        this.isEnd = true;
        console.log("battle has ended");

        callback();
    }
}


export default Battle;