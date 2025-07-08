import Player from "../Player/player.js";
import {Weapon, Armor} from "../Items/equipment.js";
import Battle from "../Scenes/Battle/battle.js";
import Dungeon from "../Scenes/dungeon.js";

import {characters, getCharacterByRole } from "../Player/player-data.js";
import {enemies, getEnemyByName} from "../Enemies/enemy-data.js";
import {armors, getArmor, getWeapon} from "../Items/equipments.js";

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

const {category, enemyDamageMod, playerDamageMod} = difficulties[0];

console.log(category, enemyDamageMod, playerDamageMod);

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
                const starterSet = new Armor(getArmor("starter_set"));
                const starterWeapon = new Weapon(getWeapon("iron_pole"))

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
        game.innerHTML = this.player.showStats() + `<button class="fight-option button">Fight</button> <button class="dungeon-option"> Dungeon Demo </button>`;

        const fightBtn = document.querySelector(".fight-option");
        const dungeonBtn = document.querySelector(".dungeon-option");
        
        fightBtn.addEventListener("click", () => {
            const battle = new Battle();
            battle.init(this, game, this.player, this.difficulty);
        })

        dungeonBtn.addEventListener("click", () => {
            const dungeon = new Dungeon(this, game);
            dungeon.init();
        })
    }

    setDungeon(){

    }
}



const main = new Main()
main.selectCharacter();