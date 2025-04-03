import Player from "./player.js";
import Enemy from "./enemy.js";
import utils from "./utils.js";

import {enemies, getEnemyByName} from "../data/enemies.js"

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
    }

    /**
     * Might make this into a class if things get more complex
     * 
     * PROBABLY GOING TO BE A CLASS AS OF 03/30/2025
     */
    showOutputIndicator(element, content, type){
        const scale = 0.5;
        const basePx = 16;

        const damageIndicator = document.createElement("p");
        damageIndicator.classList.add("damage-indicator");
        damageIndicator.style.fontSize =  `${basePx + content * scale / 2}px`;

        if(type == "heal"){
            damageIndicator.style.color = "green"
        }

        if(type == "attack"){
            damageIndicator.style.color = "red"
        }

        if(type == "recharge"){
            damageIndicator.style.color = "blue";
        }

        damageIndicator.textContent = content;
        element.appendChild(damageIndicator);

        setTimeout( () => {
            damageIndicator.remove();
        }, 990)
    }
    
    // NOTE: NEED TO REWORK THIS
    renderUI(){
        // this.element.innerHTML = this.player.showStats() + this.player.showSkills() + this.enemy.showStats();
        this.element.innerHTML = this.player.showStats() + `<div class="player-skills-container"> </div>` + this.enemy.showStats();
        
        const playerSkills = document.querySelector(".player-skills-container");
        this.player.skills.forEach( skill => {
            const button = document.createElement("button");
            button.innerHTML = skill.name;

            button.addEventListener("click", (e) => {
                // Wrap this into a function to reduce clutter
                if(!this.playerEventActive){
                    this.castSkillEvent(skill);

                    this.playerEventActive = true;
                }

            })

            // Plan to add info section
            button.addEventListener("mouseover", (e) => {
                console.log(`Hovering on skill: ${skill.name}`)
            })

            playerSkills.append(button);
        })

        const rechargeBtn = document.createElement("button");
        rechargeBtn.innerHTML = "Recharge"

        rechargeBtn.addEventListener("click", (e) => {
            this.playerEventActive = true;
            this.playerRecharge();
        });

        playerSkills.append(rechargeBtn);
    }

    async playerRecharge(){
        const amountRecharged = (this.player.maxEnergy - this.player.energy);
        console.log(this.player.maxEnergy, this.player.energy, amountRecharged);
        
        this.player.recharge();
        document.querySelector(".player-stats").innerHTML = this.player.showStats();

        this.showOutputIndicator(document.querySelector(".player-stats"), amountRecharged, "recharge");
        await utils.wait(1000);
        
        this.enemyAttack();
        
        if(this.battleHasEnded()){
            this.end( () => this.main.selectCharacter());
            return;
        }

        // this.renderUI();
    }

    // Whenever a player casts a skill
    // @return If the battle has ended or not (Might return other info later on)
    async castSkillEvent(skill){
        // I'm just using op armor, this will soon be removed
        const skillOutput = skill.execute(this.player, this.enemy, this.difficulty);

        console.log("damage indication");
        
        document.querySelector(".player-stats").innerHTML = this.player.showStats();
        document.querySelector(".enemy-stats").innerHTML = this.enemy.showStats();

        if(skill.type === "damage"){
            this.showOutputIndicator(document.querySelector(".enemy-stats"), skillOutput.amount, skillOutput.type);
        }
        
        if(skill.type === "heal"){
            this.showOutputIndicator(document.querySelector(".player-stats"), skillOutput.amount, skillOutput.type);
        }
        await utils.wait(1000);


        if(this.battleHasEnded()){
            this.end( () => this.main.setPreFight());
            return;
        }
        // this.enemy.attackPattern()
        // We might implement the above later, but for now It will choose randomly
        this.enemyAttack();
        
        if(this.battleHasEnded()){
            this.end( () => this.main.selectCharacter());
            return;
        }

        // this.renderUI();
    }
    
    /**
     * Helper function for the enemy to attack the player
     * @param {*} e The attacking enemy
     */
    async enemyAttack(){
        const skill = this.enemy.skills[Math.floor(Math.random() * this.enemy.skills.length)];
        const skillOutput = skill.execute(this.enemy, this.player, this.difficulty);

        document.querySelector(".player-stats").innerHTML = this.player.showStats();

        // Type Checker (When enemy can heal)
        this.showOutputIndicator(document.querySelector(".player-stats"), skillOutput.amount, skillOutput.type);
        await utils.wait(1000);
        
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
        if(this.player.health == 0) {
            this.isEnd = true;
            
        }
        
        if(this.enemy.health == 0){
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