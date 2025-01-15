let saveData = {
    "saveDataName" : "Main",
    "saveDataTime" : "",
    "IsDead" : false,
    "DeathReason": undefined,
    "current_storyLine_progress" : 0,
    "LastSafeScene" : 0,
    "current_chapter_progress" : 0,
    "LastSafeChapter" : 0,
    "current_title_progress" : 0,
    "title_progress" : { 
        //  title / chapter num : { title_story_[current_title_progress] : title}
        0 : { "title_story_0" : 'Into the new world'},
        1 : { "title_story_1" : 'Cave Exploration'},
        2 : { "title_story_2" : 'Lost in the forest'}, 
        3 : { "title_story_3" : 'Old cabbin'},
    },
    "storyLine_progress" : {
        //  chapter num : { Scene num : {"sceneName" : "placeholder", "sceneText": "placeholder"}, },
        Death : {
            0 : {"sceneName" : "DeathScreen0", "sceneText": "You died because "},
        },
        0 : {
            0 :  {"sceneName" : "Start", "sceneText": "You wake up in a dark cave, the damp air clinging to your skin as you grope for any semblance of direction. The sound of distant rumbling echoes through the cavern, urging you to explore. With each step, the path twists and turns, revealing ancient ruins and forgotten passages. As you navigate this mysterious labyrinth, the weight of uncertainty presses upon you, yet a flicker of curiosity ignites within."},
            1 :  {"sceneName" : "charachterDefining0", "sceneText" : "Gazing into the rippling surface of a subterranean pool, you catch a glimpse of your own reflection amidst the murky depths. The dim light barely illuminates your features, leaving much to the imagination. Who is this figure staring back at you? The lines of gender blur in the wavering distortion, leaving only a sense of mystery in its wake. Lost in contemplation, you linger in the tranquil embrace of the cave, pondering the journey that lies ahead. With each ripple that disturbs your reflection, a surge of determination propels you forward, ready to embrace the enigma of your own existence. Let us now delve deeper into the story of this mysterious soul, as we unveil the intricate details of Your identity amidst the shadows of the underworld."},
            2 :  {"sceneName" : "charachterDefining1", "sceneText" : "In the dim cavern, Your eyes glimmer like precious gems, reflecting the faint light with an entrancing allure. With each glance, you discern a depth of color, ranging from the azure depths of a tranquil ocean to the earthy warmth of sunlit forests"},
            3 :  {"sceneName" : "charachterDefining2", "sceneText" : "Amidst the shadows, Your hair dances in the gentle breeze, its texture hinting at a story of its own. Whether cascading in ebony rivers, catching the light in shimmering silver strands, or ablaze with the fiery hues of a setting sun, each tress adds to Your mystique"},
            4 :  {"sceneName" : "charachterDefining3", "sceneText" : "Your skin, bathed in the flickering light, revealed a complexion that seemed to hold stories untold. As you observe closely, you notice nuances of color, from the palest porcelain to the richest ebony, each hue adding depth to Your enigmatic presence."},
            5 :  {"sceneName" : "charachterDefining4", "sceneText" : "Your stature, silhouetted against the cavern walls, commands attention with a presence that is both formidable and intriguing. As you study them further, you discern the subtle contours of Your frame, which may lean towards a delicate grace or exude a powerful strength, leaving an indelible impression in the depths of the cavern."},
            6 :  {"sceneName" : "charachterDefining5", "sceneText" : "Your attire, a reflection of your journey through the rugged terrain, appears weathered and worn, bearing the marks of your passage through the cave's unforgiving landscape. You notice that your clothing carries either the rugged authenticity of a seasoned traveler, marked by dirt and grime, or the pristine cleanliness that hints at your recent arrival, untouched by the trials of the cavern."},
            7 :  {"sceneName" : "charachterDefining6", "sceneText" : "Gazing into the rippling waters of the cave's puddle, the figure contemplates their gender, recognizing it as a deeply personal truth. Whether they perceive themselves as aligning with the feminine or masculine, their identity crystallizes as a reflection of their inner self, not merely a narrative waiting to be written."},
            8 :  {"sceneName" : "charachterDefining7", "sceneText" : "As the light begins to dim within the cavern, the figure gazes into the fading reflections of the puddle, contemplating their essence. In the obscurity, their species becomes shrouded in uncertainty, a mysterious aspect of their being that defies classification. Their identity transcends the confines of known races, leaving their true nature obscured in the fading light."},
            9 :  {"sceneName" : "seekExit", "sceneText" : "Navigating the damp walls of the cavern, you seek an exit, fingers tracing the rough texture in search of escape. With each step, your determination grows, fueled by the desire to break free from the confines of this underground labyrinth."},
        },
        1 : {
            0 :  {"sceneName" : "seekExit0", "sceneText": "As you wander through the cave's labyrinthine passages, you encounter a variety of pathways, each offering its own unique allure. One path is adorned with vibrant green moss, another lined with glittering crystals, while another disappears into shadowed depths. Further along, you find yourself following the course of an underground stream, and eventually, you stumble upon a cavern illuminated by bioluminescent fungi. Each pathway beckons with its own mysteries, inviting you to explore deeper into the heart of the cave's secrets."},
            1 :  {"sceneName" : "The Mossy Passage", "sceneText": "The current area is enveloped in a verdant embrace, with lush green moss covering every surface. The air is cool and fresh, carrying the earthy scent of vegetation. Shafts of dim light filter through the canopy above, casting dappled patterns on the moss-covered ground."},
            2 :  {"sceneName" : "The Crystal Tunnel", "sceneText": "In this area, the walls sparkle with the mesmerizing glow of crystals, illuminating the surroundings with a soft, ethereal light. The air feels charged with energy, and the ground beneath your feet shimmers with crystalline formations. Every step echoes softly in the cavernous space, creating a sense of wonder and awe."},
            3 :  {"sceneName" : "The Shadowed Corridor", "sceneText": "As you navigate this area, darkness presses in from all sides, enveloping you in an oppressive gloom. The air feels heavy and stifling, and the sound of your own footsteps echoes eerily in the silence. Shapes shift and morph in the shadows, playing tricks on your senses and heightening your sense of unease."},
            4 :  {"sceneName" : "The Subterranean Stream", "sceneText": "Here, the area is defined by the presence of a crystal-clear stream that meanders through the cavern. The sound of rushing water fills the air, accompanied by the gentle drip of stalactites above. The walls are slick with moisture, and patches of bioluminescent fungi cast a soft, eerie glow on the surroundings."},
            5 :  {"sceneName" : "he Fungal Grove", "sceneText": "In this area, the cavern is alive with the soft glow of bioluminescent fungi, casting an otherworldly light on the surroundings. The air is thick with the earthy scent of mushrooms, and strange shapes loom in the shadows. The ground beneath your feet is spongy with fungal growth, adding to the surreal atmosphere of the grove."},
            6 :  {"sceneName" : "Mossy1", "sceneText": "As you traverse the mossy passage, you stumble upon a hidden alcove where a delicate flower blooms amidst the verdant foliage. Its petals shimmer with an otherworldly glow, emitting a faint, melodic hum. The flower seems to beckon to you, offering a sense of peace and serenity amidst the chaos of the cave."},
            7 :  {"sceneName" : "Crystal1", "sceneText": "In the heart of the crystal tunnel, you discover a shimmering pool of water, its surface reflecting the myriad hues of the surrounding crystals. As you approach, you notice a faint figure standing at the water's edge, its form obscured by the dancing light."},
            8 :  {"sceneName" : "Shadowed1", "sceneText": "Within the shadowed corridor, you come across a series of ancient runes etched into the cavern walls, their meanings lost to time. As you study the intricate symbols, you sense a faint stirring in the darkness, as if the very shadows themselves are alive with unseen energy."},
            9 :  {"sceneName" : "Subterranean1", "sceneText": "Along the banks of the subterranean stream, you encounter a family of glowing fish, their scales shimmering with iridescent light as they dart through the crystal-clear waters. They seem to be communicating with one another through a series of intricate patterns and movements, creating a mesmerizing display of aquatic ballet."},
            10 :  {"sceneName" : "Fungal1", "sceneText": "Deep within the fungal grove, you stumble upon a cluster of luminous mushrooms, their caps pulsating with a soft, ethereal light. As you approach, you feel a sense of peace wash over you, as if the mushrooms are emitting a calming energy that soothes your weary soul."},
            11 :  {"sceneName" : "Mossy2", "sceneText": "placeholder"},
            12 :  {"sceneName" : "Mossy1_hidden_enclove", "sceneText": "You have found a hidden alcove tucked away within the mossy passage, concealed by lush greenery. Inside, the alcove opens into a small chamber adorned with shimmering crystals that reflect the dim light filtering through cracks in the ceiling. The air is cool and refreshing, carrying a faint hint of earthiness and mystery. Amidst the crystals, you spot a glimmering object half-buried in the moss—a small, intricately carved wooden box"},
            13 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
            14 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
            15 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
            16 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
            17 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
            18 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
            19 :  {"sceneName" : "placeholder", "sceneText": "placeholder"},
        },
        2 : {
            0 :  {"sceneName" : `"FreshAir", "sceneText":"As the protagonist emerged from the cave's mouth, shrouded in the embrace of night's thick veil, a sense of urgency seized their heart. With every step into the darkness, the chilling embrace of uncertainty tightened its grip. The moon, a mere sliver in the sky, cast feeble light upon the rugged terrain, barely illuminating the path ahead. Each shadow seemed to whisper secrets of hidden dangers, urging caution with every hesitant footfall.
            The wilderness stretched out before them, an endless expanse of tangled undergrowth and looming silhouettes of trees. The rustle of leaves and the distant howl of unseen creatures served as eerie companions on their journey. With no destination in sight, the need for shelter gnawed at their very core, urging them onward in search of refuge from the unforgiving night.
            Their senses heightened, attuned to every sound and movement in the darkness, they pressed forward, driven by the primal instinct for survival. The cool night air kissed their skin, carrying the scent of damp earth and ancient secrets. In the distance, a faint glow beckoned—a beacon of hope amidst the vast unknown.
            With determination etched upon their features, they forged ahead, guided by the flickering light, their quest for shelter a silent prayer in the wilderness of the night.`
            },
        },
    },
    "Choices_Possible" : {
        //  chapter number : { scene number : { Button number : Text }}
        Death : {
            4 : "Respawn at last checkpoint",

        },
        0 : {
            0 : { 7 : "Next"},
            1 : { 1 : "Previously", 7 : "Next"},
            2 : { 1 : "Previously", 2 : "piercing blue", 3 : "deep brown", 4 : "striking green", 5 : "captivating hazel", 6 : "intense grey"},
            3 : { 1 : "Previously", 2 : "cascading waves", 3 : "cropped short", 4 : "braided intricately", 5 : " sophisticated bun", 6 : "wild and free"},
            4 : { 1 : "Previously", 2 : "Porcelain fair", 3 : "Sun-kissed bronze", 4 : "Olive-toned", 5 : "Rosy-pink", 6 : "Deep ebony"},
            5 : { 1 : "Previously", 2 : "Petite and delicate", 3 : "Tall and statuesque", 4 : "Somewhere in between", 5 : "Lean and athletic", 6 : "Muscular and imposing"},
            6 : { 1 : "Previously", 4 : "Weathered and worn, marked by dirt and grime, reflecting a seasoned traveler", 7 : "Pristine and clean, untouched by the trials of the cavern, hinting at a recent arrival"},
            7 : { 1 : "Previously", 4 : "Feminine", 7 : "Masculine"},
            8 : { 1 : "Previously", 7 : "Next"},
            9 : { 1 : "Previously", 7 : "Next"},
        },
        1 : {
            0 : { 1 : "Previously", 2 : "The Mossy Passage", 3 : "The Crystal Tunnel", 4 : "The Shadowed Corridor", 5 : "The Subterranean Stream", 6 : "he Fungal Grove"},
            1 : { 1 : "Previously", 7 : "Next"},
            2 : { 1 : "Previously", 7 : "Next"},
            3 : { 1 : "Previously", 7 : "Next"},
            4 : { 1 : "Previously", 7 : "Next"},
            5 : { 1 : "Previously", 7 : "Next"},
            6 : { 1 : "Leave the area undisturbed", 2 : "Investigate the hidden alcove.", 3 : "Listen to the soothing melody of the flower.", 4 : "Continue exploring the passage", 5 : "Sit quietly and observe the surroundings", 6 : "Feel the texture of the moss beneath your fingertips."},
            7 : { 1 : "Leave the area undisturbed", 2 : "Approach the figure cautiously.", 3 : "Sit quietly by the pool and observe.", 4 : "Cast a stone into the pool.", 5 : "Attempt to communicate with the figure.", 6 : "Feel the cool crystal walls with your hands."},
            8 : { 1 : "Leave the area undisturbed", 2 : "Reach out to touch the ancient runes.", 3 : "Atempt to read the chant or incantation.", 4 : "Continue down the corridor.", 5 : "Meditate in front of the runes.", 6 : "Feel the texture of the walls for any irregularities."},
            9 : { 1 : "Leave the area undisturbed", 2 : "Follow the stream to its source.", 3 : "Offer a small offering of food to the fish.", 4 : "Take a moment to admire the surroundings.", 5 : "Feel the water with your hands.", 6 : "Listen to the soothing sound of the rushing stream."},
            10 : { 1 : "Leave the area undisturbed", 2 : "Sit amongst the mushrooms and observe.", 3 : "Reach out to touch the mushrooms.", 4 : "Inhale deeply, breathing in the aroma.", 5 : "Feel the texture of the ground beneath your feet.", 6 : "Listen for any sounds emanating from the grove."},
            11 : { 1 : "Previously", 7 : "Next"},
            12 : { 1 : "Leave the box undisturbed and leave the alcove", 6 : "Pick up the box and examine its contents"},
            //  : { 1 : "Previously", 2 : "", 3 : "", 4 : "", 5 : "", 6 : ""},
            //  : { 1 : "Leave the area undisturbed", 2 : "", 3 : "", 4 : "", 5 : "", 6 : ""},
            //  : { 1 : "Previously", 2 : "", 3 : "", 4 : "", 5 : "", 6 : "", 7 : ""},
            //  : { 1 : "Previously", 2 : "", 3 : "", 4 : "", 5 : "", 6 : "", 7 : "Next"},
            //  : { 1 : "Previously", 7 : "Next"},
            // Leave the area undisturbed
        },
        2 : {
            0 : { 1 : "Previously", 7 : "Next"},
        },
    },
    "ALT_Choices_Possible" : {
        //  chapter number : { scene number : { Button number : Text }}
        0 : {
            0 : { 7 : "Next"},
            1 : { 1 : "Previously", 7 : "Next"},
            2 : { 1 : "Previously", 2 : "blue", 3 : "brown", 4 : "green", 5 : "hazel", 6 : "light grey"},
            3 : { 1 : "Previously", 2 : "light blue", 3 : "dark blue", 4 : "light yellow", 5 : "orange", 6 : "firebrick"},
            4 : { 1 : "Previously", 2 : "beige", 3 : "bronze", 4 : "Olive", 5 : "pink", 6 : "light brown"},
            5 : { 1 : "Previously", 2 : "light pink", 3 : "dark blue", 4 : "green", 5 : "light blue", 6 : "brown"},
            6 : { 1 : "Previously", 4 : "dark grey", 7 : "light grey"},
            7 : { 1 : "Previously", 4 : "pink", 7 : "blue"},
        },
        1 : {
            0 : { 1 : "dd"},
        },  
    },
    "storyLine_progress_Confused" : {
        //  chapter number : { Special scene number : { Scene : Text }
        1 : {
            6 : {sceneText : "As you traverse the mossy passage, you stumble upon a hidden alcove where a delicate flower blooms amidst the verdant foliage. Its petals shimmer with an otherworldly glow, emitting a faint, melodic hum. The flower seems to beckon to you, offering a sense of peace and serenity amidst the chaos of the cave.", sceneTitle : "Finding an exit?"}
        }
    },
    "Choices_Possible_Confused" : {
        //  chapter number : { Special scene number : { button number : Text }
        1 : {
            6 : { 1 : "Leave the area disturbed", 2 : "Investigate the hidden alcove.", 3 : "gain strenght by listening to the soothing melody of the flower.", 4 : "Continue exploring the passage", 5 : "Sit quietly and observe the surroundings", 6 : "gain extra lives by touching the mesmerising moss."},
        },
        2 : {

        },
    },
    "RandomEvent" : {
        //  0 must empty, 1 to last gets all R events
        0 : {},
        1 : {
            sceneName : "", sceneText : "",IsActive : false,chanceOfAcurring : 0.01,
            buttonValues : {0:'',1:'',2:'',3:'',4:'',5:'',6:''},
        },
        2 : {},
        3 : {},
        4 : {},
    },
    "Buttons_section_title" : {
        //  chapter num : {   Scene num : text }
        Death : {
            0 : " ",
        },
        0 : {
            0 : " ",
            1 : " ",
            2 : " ",
            3 : " ",
            4 : " ",
            5 : " ",
            6 : " ",
            7 : " ",
            8 : " ",
            9 : " ",
        },
        1 : {
            0 : "Which Dierction shall you chose",
            1 : " ",
            2 : " ",
            3 : " ",
            4 : " ",
            5 : " ",
            6 : "What shall you do",
            7 : "What shall you do",
            8 : "What shall you do",
            9 : "What shall you do",
            10 : "What shall you do",
            11 : " ",
            12 : "With careful hands, you consider the small, intricately carved wooden box half-buried in the moss. You have the option to:",
        }
    },
    "Choices_Made" : {
        //  chapter number : string of num defined by Buttons order
        Death : [],
        0 : [], 
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : [],
        6 : [],
        7 : [],
        8 : [],
        9 : [],

    },
    "Player_character" : undefined,// Was Player
    "Buttons" : [1,2,3,4,5,6,7],
    "Uncoverded" : {
        //  type of hidden piece : {    ID of said piece    }
        "HiddenText" : {
            0 : false,
        },
        "HiddenButton" : {
            2 : false,
        },
        "Items" : {
            0 : false,
        },
    },
    "HiddenStoryLine" : {
        //  chapter : {     scene : {   Id : `PlaceHolder`}}
        1 : {
            6 : {0 : `You have discovered a hidden alcove nestled within the mossy passage, its entrance partially obscured by verdant foliage.`},
        },
    },
    "Buttons_Hidden" : {
        //  chapter number : {  scene number  : [  button numbers wich chould be hidden ]  }
        1 : {
            6 : [2],
        },
    },
    "Debuff_SpashText_Color" : {
        // has changed from nothing to type
        0 : {
            0 : "#00FF00",  // Nothing (Green)
            1 : "#33FF00",  // Barely noticeable
            2 : "#66FF00",  // Mild
            3 : "#99FF00",  // Slight
            4 : "#CCFF00",  // Noticeable
            5 : "#FFFF00",  // Moderate (Yellow)
            6 : "#FFCC00",  // Significant 
            7 : "#FF9900",  // Intense 
            8 : "#FF6600",  // Severe
            9 : "#FF3300",  // Excruciating
            10 : "#FF0000", // Agonizing (Red)
            11 : "#FF0000"  // Ultimate  (Red)
        },
        1 : {
            0 : "#FF0000",  // Ultimate  (Red)
            1 : "#FF0000", // Agonizing (Red)
            2 : "#FF3300",  // Excruciating
            3 : "#FF6600",  // Severe
            4 : "#FF9900",  // Intense
            5 : "#FFCC00",  // Significant
            6 : "#FFFF00",  // Moderate (Yellow)
            7 : "#CCFF00",  // Noticeable
            8 : "#99FF00",  // Slight
            9 : "#66FF00",  // Mild
            10 : "#33FF00",  // Barely noticeable
            11 : "#00FF00",  // Nothing (Green)

        },
    },
    "CurrentDebuffBar" : {
        //  bar : { BarLength : "0"},
        Pain : { BarLength : "0"},
        Fatigue : { BarLength : "0"},
        Fear : { BarLength : "0"},
        Stress : { BarLength : "0"},
        Trauma : { BarLength : "0"},
        Addiction : { BarLength : "0"},
        Sickness : { BarLength : "0"},
        Bleed : { BarLength : "0"},
        Control : { BarLength : "100"},
    },
    "Debuff_SpashText" : {
        //  debuff(bar) effect : {  effect number ranging from 0- 100 with increment of 10 expect the last one. example;}
        //  pain : {0 : "0", 1 : "1-10", 2 : "11-20", 3 : "21-30", 4 : "31-40", 5 : "41-50", 6 : "51-60", 7 : "61-70", 8 : "71-80", 9 : "81-90", 10 : "91-99", 11 : "100"}
        Pain : { 0: "No pain", 1: "Barely noticeable discomfort", 2: "Mild twinge or ache", 3: "Slight discomfort with movement", 4: "Noticeable discomfort", 5: "Moderate pain", 6: "Significant pain", 7: "Intense pain", 8: "Severe pain", 9: "Excruciating pain", 10: "Agonizing pain", 11: "Ultimate agony"},
        Fatigue : { 0: "No fatigue", 1: "Minimal tiredness", 2: "Slight weariness", 3: "Noticeable fatigue", 4: "Moderate tiredness", 5: "Mild exhaustion", 6: "Significant fatigue", 7: "Heavy weariness", 8: "Severe exhaustion", 9: "Nearing sleepiness", 10: "Struggling to stay awake", 11: "Can fall asleep anytime"},
        Fear : { 0: "No fear", 1: "Slight unease", 2: "Mild apprehension", 3: "Noticeable concern", 4: "Moderate worry", 5: "Growing anxiety", 6: "Significant fear", 7: "Intense dread", 8: "Severe panic", 9: "Overwhelming terror", 10: "Paralyzing fear", 11: "Absolute terror"  },
        Stress : { 0: "No stress", 1: "Minimal tension", 2: "Mild unease", 3: "Noticeable stress", 4: "Moderate pressure", 5: "Increasing strain", 6: "Significant stress", 7: "Intense pressure", 8: "Severe strain", 9: "Overwhelming stress", 10: "Near breaking point", 11: "Extreme distress"},
        Trauma : { 0: "No trauma", 1: "Mild distress", 2: "Emotional discomfort", 3: "Noticeable unease", 4: "Moderate distress", 5: "Increasing anxiety", 6: "Significant trauma", 7: "Intense emotional pain", 8: "Severe distress", 9: "Overwhelming trauma", 10: "Near-breaking point", 11: "Extreme anguish"},
        Addiction : { 0: "No addiction", 1: "Mild craving", 2: "Occasional urges", 3: "Noticeable dependency", 4: "Moderate addiction", 5: "Increasing compulsion", 6: "Significant dependency", 7: "Intense craving", 8: "Severe addiction", 9: "Overwhelming obsession", 10: "Near-irresistible urge", 11: "Extreme dependence"},
        Sickness : { 0: "No sickness", 1: "Mild discomfort", 2: "Slight illness", 3: "Noticeable symptoms", 4: "Moderate sickness", 5: "Increasing discomfort", 6: "Significant illness", 7: "Intense symptoms", 8: "Severe sickness", 9: "Overwhelming ailment", 10: "Critical condition", 11: "Near death"},
        Bleed : { 0: "No bleeding", 1: "Minor cut or scrape", 2: "Slow trickle of blood", 3: "Noticeable bleeding", 4: "Moderate hemorrhage", 5: "Increasing blood flow", 6: "Significant blood loss", 7: "Heavy bleeding", 8: "Severe hemorrhaging", 9: "Critical blood loss", 10: "Life-threatening bleed", 11: "Near exsanguination"},            
        Control : { 0: "No control", 1: "Limited restraint", 2: "Basic discipline", 3: "Developing control", 4: "Moderate self-regulation", 5: "Steady discipline", 6: "Growing mastery", 7: "Strong self-control", 8: "Advanced discipline", 9: "Near mastery", 10: "Masterful control", 11: "Complete mastery"},            
    },
    "Debuff_Effects" : {
        Weakened :  {  Description : `Character's strength or attack power is reduced by`},
        Slowed :  {  Description : `Character's movement speed is decreased by`},
        Blinded :  {  Description : `Character's vision is impaired, affecting accuracy or perception by`},
        Confused :  {  Description : `Character's actions become randomized or uncontrollable by`},
        Silenced :  {  Description : `Character is unable to use verbal abilities or spells by`},
        Crippled :  {  Description : `Character's agility or dexterity is decreased, affecting evasion or finesse by`},
        Vulnerable :  {  Description : `Character takes increased damage from attacks by`},
        Disarmed :  {  Description : `Character is unable to use weapons or equipment by`},
        Diseased :  {  Description : `Character suffers from a temporary illness, reducing health or attributes by`},
        Fear :  {  Description : `Character is afflicted with fear, causing them to flee or become hesitant in combat by`},
        Stunned :  {  Description : `Character is temporarily incapacitated, unable to act by`},
        Hexed :  {  Description : `Character is cursed with negative magical effects, such as reduced resistances or altered abilities by`},
        Drained :  {  Description : `Character's energy or mana reserves are depleted, hindering spellcasting or special abilities by`},
        Sapped :  {  Description : `Character's vitality is drained, reducing maximum health temporarily by`},
        Marked :  {  Description : `Character becomes the target of increased aggression from enemies by`},
        Burning :  {  Description : `Character suffers from ongoing fire damage of temperture's of`},
        Chilled :  {  Description : `Character's movement speed is reduced due to extreme cold by`},
        Rooted :  {  Description : `Character is immobilized and unable to move.`},
        Pacified :  {  Description : `Character is unable to use aggressive actions or abilities by`},
        Cursed :  {  Description : `Character is afflicted with a curse that causes various negative effects over time by`},
        Fatigue :  {  Description : `Reduces energy levels and slows down character movement or actions by`},
        Confusion :  {  Description : `Causes disorientation, making character actions unpredictable or uncontrollable by`},
        MAXeffect : {  Description : `you have reacht the maximum amount of` },
    },
    "Buff_Effects" : {
        Strength :  { Description : `Increases physical power and damage output by`},
        Speed :  { Description : `Boosts movement speed, allowing characters to navigate the game world more quickly by`},
        Protection :  { Description : `Provides increased defense or resistance against incoming attacks by`},
        Regeneration :  { Description : `Grants the ability to slowly regain health over time by`},
        Evasion :  { Description : `Improves the chance to dodge or evade incoming attacks by`},
        Attack :  { Description : `Damage Boost: Temporarily increases the damage dealt by attacks by`},
        Critical :  { Description : `Hit Chance: Raises the likelihood of landing critical hits, dealing extra damage by`},
        Healing :  { Description : `Provides instant restoration of health points by`},
        Stamina :  { Description : `Increases endurance and reduces fatigue, allowing for prolonged activity by`},
        Elemental_fire :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as fir by`},
        Elemental_ice :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as ice, or electricity by`},
        Elemental_water :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as wate by`},
        Elemental_electricity :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as electricity by`},
        Elemental_earth :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as eart by`},
        Elemental_holy :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as holy by`},
        Elemental_darkness :  { Description : `Resistance: Grants resistance against specific types of elemental damage, such as darkness by`},
    },
    "Settings" : {
        'SlowTyping' : true,
    },
    "Inventory" : [
        //  ID number : {"Name" : Name of item ,"quantity" : 0,"quality" : "common"}
        //   { id: 0 , Name : "PlaceHolder", quantity : 0, quality : "common"},
        { id: 1 , Name : "Soul Redeemer", quantity : 1, quality : "Legendary"},

    ],
    "ListOfAllItems" : [
        //  { id: numberPlaceHolder , Name : "NamePlaceHolder", quantity : 0, quality : "common"}, choose between common/uncomon/rare/unique/Legendary}
        { id: 1 , Name : "Soul Redeemer", quantity : 0, quality : "Legendary"},
        { id: 2 , Name : "rock", quantity : 0, quality : "common"},
        { id: 3 , Name : "stick", quantity : 0, quality : "common"},
        { id: 4 , Name : "green gemstone", quantity : 0, quality : "uncommon"},
        { id: 5 , Name : "red gemstone", quantity : 0, quality : "uncommon"},
        { id: 6 , Name : "blue gemstone", quantity : 0, quality : "uncommon"},
        { id: 7 , Name : "brown gemstone", quantity : 0, quality : "uncommon"},
        { id: 8 , Name : "white gemstone", quantity : 0, quality : "rare"},
        { id: 9 , Name : "dark gemstone", quantity : 0, quality : "rare"},
        { id: 10 , Name : "purple gemstone", quantity : 0, quality : "epic"},

       // : {"Nam" : "PlaceHolder","quantity" : "PlaceHolder" , "quality" : "PlaceHolder"},
    ]
}
postMessage(saveData)