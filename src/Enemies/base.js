import Entity from "../core/entity.js";

// TODO: Implement decision script (If possible)

class Enemy extends Entity{
    constructor(data){
        super(data);
    }
    
    showStats(){
        return `
        <section class="enemy-stats">
            <h3>${this.name}</h3>
            <p>Health: ${this.health} / ${this.baseHealth}</p>
            <p>Power: ${this.power}</p>
            <p>Defense: ${this.defense}</p>
         </section>`
    }
}





export default { Enemy };