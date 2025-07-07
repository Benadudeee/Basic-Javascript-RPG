import { skills, getSkillByName } from "../Skills/skill-data.js";

const enemies = [
    {
        name: "goblin",
        health: 110,
        power: 15,
        defense: 10,
        level: 1,

        skills: [
            getSkillByName("Attack"),
            getSkillByName("Barrage"),
            getSkillByName("Smash")
        ]
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


function getEnemyByName(name){
    for(const enemy of enemies){
        if(enemy.name === name){
            return enemy;
        }
    }
    return {};
}

export  {enemies, getEnemyByName}