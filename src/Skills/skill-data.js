import {Skill} from "./skills.js";

const skills = [
    {
        name: "Attack",
        id: "_attack",
        type: "damage",
        description: "A quick and forceful strike that deals light damage.",
    
        value: 10,
        cost: 3,
        target: "entity",
        
        effects: [],
  
    },
    {
        name: "Rev Up",
        id: "_big_attack",
        type: "damage",
        description: "A Big attack",

        value: 20,
        cost: 5,
        target: "entity",

        effects: null,
        buffs: null,
        debuffs: null
    },
    {
        name: "Rev Up",
        id: "_rev_up",
        type: "buff",
        description: "Gains 2x the attack",

        value: 0,
        cost: 2,
        target: "self",

        effects: [

        ],
    },
    {
        name: "Heal",
        id: "_heal",
        description: "Heals a good amount of hp",

        value: 30,
        cost: 5,
        target: "self",

        effects: null,
        buffs: null,
        debuffs: null
    }
]

/**
 * Gets the data of the skill by it's name
 * @param {*} name 
 */
function getSkillById(id){
    for(const skill of skills){
        if(skill.id === id){
            return skill;
        }
    }

    return {err: "no skill found"};
}

export {skills , getSkillById};