/**
 * EFFECTS:
 * 
 * - 
 */
const effects = [
    {
        name: "Effect Structure",
        id: "sample_effect",
        icon: "🧨",
        type: "damage",
        
        description: "This is how an effect should look like (At least for now)",

        properties: {
            damage: 20,
            regeneration: 0,
            
            stat_effects: {
                health: 1,
                power: 1,
                defense: 1,
                energy: 1
            },
            
            elemental_resistances: {
                fire: 1,
                water: 1,
                nature: 1,
                light: 1,
                dark: 1
            }
        },
        
        next: null
    },
    {
        name: "Calamity",
        id: "calamity1",
        icon: "🙁",
        description: "Debuffs defense by 10%, takes small damage per turn",
        type: "damage",
        
        properties: {
            damage: 10,
            regeneration: 0,
            
            buff: null,
            
            stat_effects: {
                health: 1,
                power: 1,
                defense: 0.9,
                energy: 1
            },

            elemental_resistances: null,
        },

        next: "calamity2"
    },
    {
        name: "Calamity II",
        id: "calamity2",
        icon: "😟",
        description: "Debuffs defense by 30%, takes large damage per turn",
        type: "damage",
        
        properties: {
            damage: 30,
            regeneration: 0,
            
            stat_effects: {
                health: 1,
                power: 1,
                defense: 0.7,
                energy: 1
            },
            
            elemental_resistances: null
        },
        
        next: "calamity3"
    },
    {
        name: "Calamity III",
        id: "calamity3",
        icon: "😫",
        type: "damage",
        
        description: "Debuffs defense by 50%, takes insane damage per turn",
        properties: {
            damage: 50,
            regeneration: 0,
    
            stat_effects: {
                health: 1,
                power: 1,
                defense: 0.5,
                energy: 1
            },

            elemental_resistances: null,
        },

        next: null
    },
    {
        name: "Dazed",
        id: "daze",
        icon: "🤨",

        description: "Reduces Defense and Attack by 10%",
        properties: {
            damage: 0,
            regeneration: 0,

            stat_effects: {
                health: 1,
                power: 1,
                defense: 1,
                energy: 1
            },

            elemental_resistances : null,
        },

        next: null
    },
    {
        name: "Stunned",
        id: "stunned",
        icon: "😵",
        type: "stun",
        
        description: "Makes either the player or enemy lose a turn",

        properties: {
            damage: 0,
            regeneration: 0,
    
            stat_effects: {
                health: 1,
                power: 1,
                defense: 0.5,
                energy: 1
            },

            elemental_resistances: null,
        },

        next: null
    }
]

function getEffectById(id){
    for(let i = 0; i<effects.length; i++){
        const effectId = effects[i].id;

        if(effectId == id){
            return effects[i];
        }
    }
}

export {effects, getEffectById};