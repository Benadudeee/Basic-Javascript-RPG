import Skill from "../scripts/skill.js";

const skills = [
    {
     name: "Attack",
     type: "damage",
     description: "A quick and forceful strike that deals light damage.",
  
     value: 10,
     cost: 3,
  
     effects: [],
     self_effect: null,
  
    },
    {
      name: "Smash",
      type: "damage",
      description: "A quick and forceful strike that deals light damage.",

      value: 15,
      cost: 3,

      effects: [],
      self_effect: null,

    },
    {
      name: "Heal",
      type: "heal",
      description: "Heal yourself",

      value: 25,
      cost: 10,

      effects: [],
      self_effect: null,

    },
    {
      name: "Barrage",
      type: "damage",
      description: "A flurry of rapid attacks that deals moderate damage.",

      value: 20,
      cost: 7,

      effects: [],
      self_effect: null,

    },
    {
      name: "Fireball",
      type: "damage",
      description: "Launch a blazing fireball that scorches enemies for heavy damage.",

      value: 35,
      cost: 12,

      effects: [],
      self_effect: null,

    },
    {
      name: "Thunder",
      type: "damage",
      description: "Call down a bolt of lightning that deals damage and may stun the target.",

      value: 10,
      cost: 8,

      effects: [
        { status: "stunned", chance: 0.2, turns: 1 }
      ],
      self_effect: null,

    },
    {
      name: "Annihilation",
      type: "damage",
      description: "Unleash devastating power that deals massive damage and may afflict the enemy with a deadly curse.",

      value: 70,
      cost: 25,

      effects: [
        { status: "calamity2", chance: 0.4, turns: 3 }
      ],
      self_effect: null
    }
  ]

/**
 * Gets the data of the skill by it's name
 * @param {*} name 
 */
function getSkillByName(name){
    for(const skill of skills){
        if(skill.name === name){
            return new Skill(skill);
        }
    }

    return {err: "no skill found"};
}

export {skills , getSkillByName};