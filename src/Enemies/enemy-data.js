import { getSkillById, skills } from "../Skills/skill-data.js";
import { DamageSkill, HealSkill } from "../Skills/skills.js";

const enemies = [
    {
        name: "goblin",
        id: "_goblin",
        health: 110,
        power: 15,
        defense: 10,
        level: 1,

        skills: {
            attack: getSkillById("_attack"),
            bigAttack: getSkillById("_big_attack")
        }
    },
    {
        name: "orc",
        i: "_orc",
        health: 315,
        power: 25,
        defense: 22,
        level: 1,

        skills: {
            attack: getSkillById("_attack"),
            bigAttack: getSkillById("_big_attack")
        }
    }
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