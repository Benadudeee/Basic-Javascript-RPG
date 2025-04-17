import { skills, getSkillByName } from "./skills.js";

const characters = [
    {
        name: "rouge",
        health: 120,
        energy: 20,
        power: 25,
        defense: 12,
        level: 1,

        skills: [
            getSkillByName("Attack"),
            getSkillByName("Barrage"),
            getSkillByName("Smash")
        ]
    },
    {
        name: "mage",
        health: 105,
        energy: 55,
        power: 25,
        defense: 12,
        level: 1,

        skills: [
            getSkillByName("Heal"),
            getSkillByName("Fireball"),
            getSkillByName("Annihilation"),
            getSkillByName("Thunder"),
        ]
    }
    
]


function getCharacterByRole(role){
    for(const character of characters){
        if(character.name === role){
            return character;
        }
    }
    return {};
}


export {characters, getCharacterByRole}