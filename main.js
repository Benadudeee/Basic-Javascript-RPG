import Player from "./classes/player.js";
import Enemy from "./classes/enemy.js";
import {Weapon, Armor} from "./classes/equipment.js";
import Battle from "./classes/battle.js";

import {characters, getCharacterByRole } from "./data/characters.js";
import {enemies, getEnemyByName} from "./data/enemies.js";
import {armors, getArmorByName} from "./data/equipments.js";

const game = document.querySelector(".game");



const difficulties = [
    {
        category: "Cakewalk",
        enemyDamageMod: 1.5,
        playerDamageMod: .5,
    },
    {
        category: "Easy",
        enemyDamageMod: 1.25,
        playerDamageMod: .75,
    },
    {
        category: "Medium",
        enemyDamageMod: 1,
        playerDamageMod: 1
    },
    {
        category: "Hard",
        enemyDamageMod: .75,
        playerDamageMod: 1.25,
    },
    {
        category: "Supreme",
        enemyDamageMod: .75,
        playerDamageMod: 2
    }

]


class Main{
    constructor(){
        this.area = 'Plains';
        this.difficulty = "medium";
        this.player;
        this.enemy;
    }

    selectCharacter(){
        game.innerHTML =   
        `
        <div class="char-container">
        <h1>Select Your Character</h1>
        
        <div class="player-options">${characters.map(p => `<p>${p.name}</p>`).join("")} </div>
        </div>
        `
        
        document.querySelectorAll(".player-options > p").forEach((player, i) => {
            player.addEventListener("click", () => {
                // Equip the obliterator (uncomment for...... Idk)
                const starterSet = new Armor(getArmorByName("Starter Set"));

                this.player = new Player(characters[i]); 
                this.player.equipArmor(starterSet);
                this.selectDifficulty();
            });
        })
    }

    selectDifficulty(){
        
        game.innerHTML =  `
            <div class="difficulty-container">
                <h1> Select Difficulty </h1>
                <div class="difficulty-options"> ${difficulties.map(element => `<p>${element.category}</p>`).join('  ')}</div>
            </div>
        `

        const difficultiesOptions = document.querySelectorAll(".difficulty-options > p");

        difficultiesOptions.forEach((difficulty, i) => {
            difficulty.addEventListener("click", () => {
                this.difficulty = difficulties[i]; 
                
                this.setPreFight();
            });

        })
    }
    /**
     * Showcases
     * 
     * The players stats
     * The players status effects
     * 
     * The players options
     */
    setPreFight(){

        game.innerHTML = this.player.showStats() + `<button class="fight-option button">Fight</button>`;

        const fightBtn = document.querySelector(".fight-option");
        
        fightBtn.addEventListener("click", () => {
            const battle = new Battle();
            battle.init(this, game, this.player, this.difficulty);
        })
    }
}



const main = new Main()
main.selectCharacter();


// console.log("foo");

// Testing if weapons work

// 1. If other roles can't use weapons
const sword = new Weapon(
    {
        name: "sword",
        usedBy: ["rouge"],

        multipliers: {
            health: 1,
            power: 1.05,
            defense: 1,
            energy: 1
        },

        effects: [

        ]
    }
)

const swordUser = new Player(getCharacterByRole("rouge"));
const nonSwordUser = new Player(getCharacterByRole("mage"))

// Should return player object and error object
console.log(swordUser.equipWeapon(sword), nonSwordUser.equipWeapon(sword));