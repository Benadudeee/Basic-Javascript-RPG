import Goblin from "../Enemies/Goblin/goblin.js";


// TODO: Rework update to update select components (userUI, enemyUI) to make 
// Updating more flexible
class Battle{
    constructor(){
        this.main;
        this.element;

        this.player;
        this.enemy;

        this.isEnd = false;
        this.playerEventActive = false; // If the player choose a move. Prevents spamming

        this.turns;
    }

    init(main, element, player, enemy=null){
        const genEnemy = (enemy === null)? new Goblin() : enemy;
        this.main = main;
        this.player = player;
        this.enemy = genEnemy;
        this.element = element;
    }
}


export default Battle;