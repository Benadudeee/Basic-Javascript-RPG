
export class GoblinBehavior{
    constructor(entity, battle=null){
        this.entity = entity;
        this.battle = battle;
    }

    decideMove(){
        const healthRatio = this.entity.health / this.entity.baseHealth;
        
        if(healthRatio < 0.5){
            return this.entity.skills.bigAttack;
        }

        return this.entity.skills.attack;
    }
}

