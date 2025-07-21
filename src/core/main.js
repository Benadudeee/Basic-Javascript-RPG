import Player from "../Player/player.js";
import {Weapon, Armor} from "../Items/equipment.js";
import Battle from "../Battle/battle.js";

import {characters, getCharacterByRole } from "../Player/player-data.js";
import {armors, getArmor, getWeapon} from "../Items/equipments.js";
import Goblin from "../Enemies/Goblin/goblin.js";

const game = document.querySelector(".game");


class Main{
    constructor(){
        this.area = 'Plains';
        // this.difficulty = "medium";
        this.player;
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

    }
}

const starterSet = new Armor(getArmor("starter_set"));
const starterWeapon = new Weapon(getWeapon("iron_pole"));

const player = new Player(characters[0]); // Rougue (TODO: Use selector class)
player.equipArmor(starterSet);
player.equipWeapon(starterWeapon);

const main = new Main();
main.player = player;
