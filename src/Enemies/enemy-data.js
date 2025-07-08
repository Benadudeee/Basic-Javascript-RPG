import { skills } from "../Skills/skill-data.js";

const enemies = [
    {
        name: "goblin",
        id: "_goblin",
        health: 110,
        power: 15,
        defense: 10,
        level: 1,
    },
    // {
    //     name: "cheif goblin",
    //     health: 315,
    //     power: 25,
    //     defense: 22,
    //     level: 1,

    //     skills: [
    //         getSkillByName("Attack"),
    //         getSkillByName("Smash")
    //     ]
    // }
]


function getEnemyById(Id){
    for(const enemy of enemies){
        if(enemy.id === Id){
            return enemy;
        }
    }
    return {};
}

export  {enemies, getEnemyById}