
export class OrcBehavior{
    constructor(entity, battle=null){
        this.entity = entity;
        this.battle = battle;
    }

    decideMove(){
        // const healthRatio = this.entity.health / this.entity.baseHealth;
        
        // if(healthRatio < 0.5){
        //     return this.entity.skills.bigAttack;
        // }

        // if(this.battle === null){
        //     return {"data" : "not in battle"}
        // }

        // const turnMod = this.battle.turns % 3;

        // if(turnMod == 0){
        //     return this.entity.skills.attack;
        // }

        return {"data" : "get random skill"};
    }
}

