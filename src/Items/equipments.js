const armors = [
    {
        name: "Starter Set",
        id: "starter_set",
        description: "A set for you to start out with",

        multipliers: {
            health: 1.1,
            power: 1,
            defense: 1.1,
            energy: 1,
        },

        effects: [

        ]
    },
    {   // Basic armor, just adds some defense
        name: "Chainmail Set",
        id: "chainmail_set",
        description: "Just basic armor",

        multipliers: {
            health: 1,
            power: 1,
            defense: 1.2,
            energy: 1,
        },

        effects: [

        ]
    },
    {
        name: "Obliterator",
        id: "obliterator",
        description: "This is sure to destroy any foe! And I mean DESTROY",

        multipliers: {
            health: 0.5,
            power: 2.5,
            defense: 0.5,
            energy: 1.5,
        },

        effects: [

        ]
    },
    {

    },
    {

    },
]

const weapons = [
    {
        name: "Iron Pole",
        usedBy: ["rougue", "mage"],
        id: "iron_pole",
        description: "The Starter Weapon usuable by all classes",

        multipliers: {
            health: 1,
            power: 1.05,
            defense: 1,
            energy: 1
        }
    }
]

/**
 * Gets the data of the skill by it's name
 * @param {*} name 
 */
function getArmor(id){
    for(const armor of armors){
        if(armor.id === id){
            return armor;
        }
    }

    return {};
}

function getWeapon(id){
    for(const weapon of weapons){
        if(weapon.id === id){
            return weapon;
        }
    }

    return {};
}

export { armors, weapons, getArmor, getWeapon};