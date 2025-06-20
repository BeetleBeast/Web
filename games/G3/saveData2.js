// Will be renamed to saveData.js when its ready
//temp
let saveData = {
    name: "Main",
    LastSaved: "",
    isDead: false,
    deathReason: null,
    LastSafeScene: "0_0", // 0_1 for chapter 0, scene 1
    Player_character : undefined, // Was Player
    currentScene: "0_0", // 0_1 for chapter 0, scene 1
    safeScenes : {
        "0_0": true,
        "0_9": true,
        "2_0": true,
    },
    chapterTitles: {
        //  chapter num : title
        0 : "Into the new world",
        1 : "Cave Exploration",
        2 : "Lost in the forest",
        3 : "Old cabbin",
    },
    scenes: {
        Death : {
            chapterTitle: "Death",
            sceneName: "DeathScreen0",
            sceneText: "You died because ",
            ALT_Text: null,
            sceneID: -1,
            ButtonTitle: "",
            options: {
                1 : {
                    ButtonNumber: 4,
                    ButtonText: "Respawn at last checkpoint",
                    next_scene: '',
                },
            },
            ALT_options: {},
        },
        "0_0": {
            chapterTitle: "Into the new world",
            sceneName: "Start",
            sceneText: "You wake up in a dark cave, the damp air clinging to your skin as you grope for any semblance of direction. The sound of distant rumbling echoes through the cavern, urging you to explore. With each step, the path twists and turns, revealing ancient ruins and forgotten passages. As you navigate this mysterious labyrinth, the weight of uncertainty presses upon you, yet a flicker of curiosity ignites within.",
            ALT_Text: null,
            sceneID: 0,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {},
        },
        "0_1": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining0",
            sceneText: "Gazing into the rippling surface of a subterranean pool, you catch a glimpse of your own reflection amidst the murky depths. The dim light barely illuminates your features, leaving much to the imagination. Who is this figure staring back at you? The lines of gender blur in the wavering distortion, leaving only a sense of mystery in its wake...",
            ALT_Text: null,
            sceneID: 1,
            ButtonTitle: "", 
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {},
        },
        "0_2": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining1",
            sceneText: "In the dim cavern, Your eyes glimmer like precious gems, reflecting the faint light with an entrancing allure. With each glance, you discern a depth of color, ranging from the azure depths of a tranquil ocean to the earthy warmth of sunlit forests.",
            ALT_Text: null,
            sceneID: 2,
            ButtonTitle: "", 
            options: {
                1: { ButtonNumber: 1, ButtonText: "Previously" },
                2: { ButtonNumber: 2, ButtonText: "piercing blue", action: [{ type: 'characterMaker' }]},
                3: { ButtonNumber: 3, ButtonText: "deep brown", action: [{ type: 'characterMaker' }]},
                4: { ButtonNumber: 4, ButtonText: "striking green", action: [{ type: 'characterMaker' }]},
                5: { ButtonNumber: 5, ButtonText: "captivating hazel", action: [{ type: 'characterMaker' }]},
                6: { ButtonNumber: 6, ButtonText: "intense grey", action: [{ type: 'characterMaker' }]},
            },
            ALT_options: {
                1: { ButtonNumber: 2, ButtonText: "blue"},
                2: { ButtonNumber: 3, ButtonText: "brown" },
                3: { ButtonNumber: 4, ButtonText: "green" },
                4: { ButtonNumber: 5, ButtonText: "hazel" },
                5: { ButtonNumber: 6, ButtonText: "lightgrey" },
            },
        },
        "0_3": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining2",
            sceneText: "Amidst the shadows, Your hair dances in the gentle breeze, its texture hinting at a story of its own. Whether cascading in ebony rivers, catching the light in shimmering silver strands, or ablaze with the fiery hues of a setting sun, each tress adds to Your mystique",
            ALT_Text: null,
            sceneID: 3,
            ButtonTitle: "", 
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 2, ButtonText: "cascading waves", action: [{ type: 'characterMaker' }]},
                3: {ButtonNumber: 3, ButtonText: "cropped short", action: [{ type: 'characterMaker' }]},
                4: {ButtonNumber: 4, ButtonText: "braided intricately", action: [{ type: 'characterMaker' }]},
                5: {ButtonNumber: 5, ButtonText: "sophisticated bun", action: [{ type: 'characterMaker' }]},
                6: {ButtonNumber: 6, ButtonText: "wild and free", action: [{ type: 'characterMaker' }]}
            },
            ALT_options: {
                1: {ButtonNumber: 2, ButtonText: "lightblue"},
                2: {ButtonNumber: 3, ButtonText: "darkblue"},
                3: {ButtonNumber: 4, ButtonText: "lightyellow"},
                4: {ButtonNumber: 5, ButtonText: "orange"},
                5: {ButtonNumber: 6, ButtonText: "firebrick"}
            }
        },
        "0_4": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining3",
            sceneText: "Your skin, bathed in the flickering light, revealed a complexion that seemed to hold stories untold. As you observe closely, you notice nuances of color, from the palest porcelain to the richest ebony, each hue adding depth to Your enigmatic presence.",
            ALT_Text: null,
            sceneID: 4,
            ButtonTitle: "", 
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 2, ButtonText: "porcelain fair", action: [{ type: 'characterMaker' }]},
                3: {ButtonNumber: 3, ButtonText: "sun-kissed bronze", action: [{ type: 'characterMaker' }]},
                4: {ButtonNumber: 4, ButtonText: "Olive-toned", action: [{ type: 'characterMaker' }]},
                5: {ButtonNumber: 5, ButtonText: "Rosy-pink", action: [{ type: 'characterMaker' }]},
                6: {ButtonNumber: 6, ButtonText: "Deep ebony", action: [{ type: 'characterMaker' }]}
            },
            ALT_options: {
                1:  {ButtonNumber: 2, ButtonText: "beige"},
                2:  {ButtonNumber: 3, ButtonText: "bronze"},
                3:  {ButtonNumber: 4, ButtonText: "Olive"},
                4:  {ButtonNumber: 5, ButtonText: "pink"},
                5:  {ButtonNumber: 6, ButtonText: "lightbrown"}
            }
        },
        "0_5": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining4",
            sceneText: "Your stature, silhouetted against the cavern walls, commands attention with a presence that is both formidable and intriguing. As you study them further, you discern the subtle contours of Your frame, which may lean towards a delicate grace or exude a powerful strength, leaving an indelible impression in the depths of the cavern.",
            ALT_Text: null,
            sceneID: 5,
            ButtonTitle: "",
            options : {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 2, ButtonText: "Petite and delicate", action: [{ type: 'characterMaker' }]},
                3: {ButtonNumber: 3, ButtonText: "Tall and statuesque", action: [{ type: 'characterMaker' }]},
                4: {ButtonNumber: 4, ButtonText: "Somewhere in between", action: [{ type: 'characterMaker' }]},
                5: {ButtonNumber: 5, ButtonText: "Lean and athletic", action: [{ type: 'characterMaker' }]},
                6: {ButtonNumber: 6, ButtonText: "Muscular and imposing", action: [{ type: 'characterMaker' }]}
            },
            ALT_options: {
                1: {ButtonNumber: 2, ButtonText: "lightpink"},
                2: {ButtonNumber: 3, ButtonText: "darkblue"},
                3: {ButtonNumber: 4, ButtonText: "green"},
                4: {ButtonNumber: 5, ButtonText: "lightblue"},
                5: {ButtonNumber: 6, ButtonText: "brown"}
            }
        },
        "0_6": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining5",
            sceneText: "Your attire, a reflection of your journey through the rugged terrain, appears weathered and worn, bearing the marks of your passage through the cave's unforgiving landscape. You notice that your clothing carries either the rugged authenticity of a seasoned traveler, marked by dirt and grime, or the pristine cleanliness that hints at your recent arrival, untouched by the trials of the cavern.",
            ALT_Text: null,
            ButtonTitle: "",
            sceneID: 6,
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 4, ButtonText: "Weathered and worn, marked by dirt and grime, reflecting a seasoned traveler", action: [{type: 'characterMaker'}]},
                3: {ButtonNumber: 7, ButtonText: "Pristine and clean, untouched by the trials of the cavern, hinting at a recent arrival", action: [{type: 'characterMaker'}]},
            },
            ALT_options: {
                1: {ButtonNumber: 4, ButtonText: "darkgrey"},
                2: {ButtonNumber: 7, ButtonText: "lightgrey"}
            }
        },
        "0_7": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining6",
            sceneText: "Gazing into the rippling waters of the cave's puddle, the figure contemplates their gender, recognizing it as a deeply personal truth. Whether they perceive themselves as aligning with the feminine or masculine, their identity crystallizes as a reflection of their inner self, not merely a narrative waiting to be written.",
            ALT_Text: null,
            sceneID: 7,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 4, ButtonText: "Feminine", action: [{type: 'characterMaker'}]},
                3: {ButtonNumber: 7, ButtonText: "Masculine", action: [{type: 'characterMaker'}]}
            },
            ALT_options: {
                1: {ButtonNumber: 4,  ButtonText: "pink"},
                2: {ButtonNumber: 7,  ButtonText: "blue"}
            }
        },
        "0_8": {
            chapterTitle: "Into the new world",
            sceneName: "charachterDefining7",
            sceneText: "As the light begins to dim within the cavern, the figure gazes into the fading reflections of the puddle, contemplating their essence. In the obscurity, their species becomes shrouded in uncertainty, a mysterious aspect of their being that defies classification. Their identity transcends the confines of known races, leaving their true nature obscured in the fading light.",
            ALT_Text: null,
            sceneID: 8,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 7, ButtonText: "Next"}
            },
            ALT_options: {}
        },
        "0_9": {
            chapterTitle: "Into the new world",
            sceneName: "seekExit",
            sceneText: "Navigating the damp walls of the cavern, you seek an exit, fingers tracing the rough texture in search of escape. With each step, your determination grows, fueled by the desire to break free from the confines of this underground labyrinth.",
            ALT_Text: null,
            sceneID: 9,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 7, ButtonText: "Next"}
            },
            ALT_options: {}
        },
        "1_0": {
            chapterTitle: "Cave Exploration",
            sceneName: "seekExit0",
            sceneText: "As you wander through the cave's labyrinth like passages, you encounter a variety of pathways, each offering its own unique allure. One path is adorned with vibrant green moss, another lined with glittering crystals, while another disappears into shadowed depths. Further along, you find yourself following the course of an underground stream, and eventually, you stumble upon a cavern illuminated by bioluminescent fungi. Each pathway beckons with its own mysteries, inviting you to explore deeper into the heart of the cave's secrets.",
            ALT_Text: null,
            sceneID: 10,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously", next_scene: "0_9"},
                2: {ButtonNumber: 2, ButtonText: "The Mossy Passage", next_scene: "1_1"},
                3: {ButtonNumber: 3, ButtonText: "The Crystal Tunnel", next_scene: "1_2"},
                4: {ButtonNumber: 4, ButtonText: "The Shadowed Corridor", next_scene: "1_3"},
                5: {ButtonNumber: 5, ButtonText: "The Subterranean Stream", next_scene: "1_4"},
                6: {ButtonNumber: 6, ButtonText: "The Fungal Grove", next_scene: "1_5"},
            },
            ALT_options: {}
        },
        "1_1": {
            chapterTitle: "Cave Exploration",
            sceneName: "The Mossy Passage",
            sceneText: "The current area is enveloped in a verdant embrace, with lush green moss covering every surface. The air is cool and fresh, carrying the earthy scent of vegetation. Shafts of dim light filter through the canopy above, casting dappled patterns on the moss-covered ground.",
            ALT_Text: null,
            sceneID: 11,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously", next_scene: "1_0"},
                2: {ButtonNumber: 7, ButtonText: "Next", next_scene: "1_6"},
            },
            ALT_options: {}
        },
        "1_2": {
            chapterTitle: "Cave Exploration",
            sceneName: "The Crystal Tunnel",
            sceneText: "In this area, the walls sparkle with the mesmerizing glow of crystals, illuminating the surroundings with a soft, ethereal light. The air feels charged with energy, and the ground beneath your feet shimmers with crystalline formations. Every step echoes softly in the cavernous space, creating a sense of wonder and awe.",
            ALT_Text: null,
            sceneID: 12,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously", next_scene: "1_0"},
                2: {ButtonNumber: 7, ButtonText: "Next", next_scene: "1_7"},
            },
            ALT_options: {}
        },
        "1_3": {
            chapterTitle: "Cave Exploration",
            sceneName: "The Shadowed Corridor",
            sceneText: "As you navigate this area, darkness presses in from all sides, enveloping you in an oppressive gloom. The air feels heavy and stifling, and the sound of your own footsteps echoes eerily in the silence. Shapes shift and morph in the shadows, playing tricks on your senses and heightening your sense of unease.",
            ALT_Text: null,
            sceneID: 13,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously", next_scene: "1_0"},
                2: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {}
        },
        "1_4": {
            chapterTitle: "Cave Exploration",
            sceneName: "The Subterranean Stream",
            sceneText: "Here, the area is defined by the presence of a crystal-clear stream that meanders through the cavern. The sound of rushing water fills the air, accompanied by the gentle drip of stalactites above. The walls are slick with moisture, and patches of bioluminescent fungi cast a soft, eerie glow on the surroundings.",
            ALT_Text: null,
            sceneID: 14,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously", next_scene: "1_0"},
                2: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {}
        },
        "1_5": {
            chapterTitle: "Cave Exploration",
            sceneName: "The Fungal Grove",
            sceneText: "In this area, the cavern is alive with the soft glow of bioluminescent fungi, casting an otherworldly light on the surroundings. The air is thick with the earthy scent of mushrooms, and strange shapes loom in the shadows. The ground beneath your feet is spongy with fungal growth, adding to the surreal atmosphere of the grove.",
            ALT_Text: null,
            sceneID: 15,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously", next_scene: "1_0"},
                2: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {}
        },
        "1_6": {
            chapterTitle: "Cave Exploration",
            sceneName: "Mossy1",
            sceneText: "As you traverse the mossy passage, you stumble upon a hidden alcove where a delicate flower blooms amidst the verdant foliage. Its petals shimmer with an otherworldly glow, emitting a faint, melodic hum. The flower seems to beckon to you, offering a sense of peace and serenity amidst the chaos of the cave.",
            ALT_Name: "Finding an exit?",
            ALT_Text: {
                default : "As you traverse the mossy passage, you stumble upon a hidden alcove where a delicate flower blooms amidst the verdant foliage. Its petals shimmer with an otherworldly glow, emitting a faint, melodic hum. The flower seems to beckon to you, offering a sense of peace and serenity amidst the chaos of the cave.",
                Hidden : "~You have discovered a hidden alcove nestled within the mossy passage, its entrance partially obscured by verdant foliage.",
                Confusion : ""
            },
            sceneID: 16,
            ButtonTitle: "What shall you do",
            Buttons_Hidden: [{
                ButtonNumber: 2,
                Default: 'hidden',
            }],
            options: {
                1: {ButtonNumber: 1, ButtonText: "Leave the area undisturbed", next_scene: "1_1"},
                2: {ButtonNumber: 2, ButtonText: "Investigate the hidden alcove.", next_scene: "1_12"},
                3: {
                    ButtonNumber: 3,
                    ButtonText: "Listen to the soothing melody of the flower.",
                    next_scene: false,
                    action : [{
                            type: 'rested',
                            value: '10',
                        },
                        {
                            type: 'DeBuffParentFunction',
                            effect: 'Pacified',
                            strength: '20',
                            target: '.choices_section'
                        },
                        {
                            type: 'DeBuffParentFunction',
                            effect: 'Confusion',
                            strength: '20',
                            target: '.choices_section'
                        }]
                },
                4: {ButtonNumber: 4, ButtonText: "Continue exploring the passage", next_scene: "1_11"},
                5: {ButtonNumber: 5, ButtonText: "Sit quietly and observe the surroundings",
                    next_scene: false,
                    action: [{
                        type: 'rested',
                        value: '20'
                    }],
                },
                6: {
                    ButtonNumber: 6,
                    ButtonText: "Feel the texture of the moss beneath your fingertips.",
                    next_scene: false,
                    action: [{
                        type: 'createElement',
                        tag: 'br'
                    },
                    {
                        type: 'manageHiddenInfo',
                        show: 'true',
                        textID: 0,
                        Btn: [{
                            BtnID: 2,
                            IsVisible: false,
                        }]
                    }],
                }
            },
            ALT_options: {
                1 : {ButtonNumber: 1, ButtonText: "Leave the area disturbed", next_scene: false},
                2 : {ButtonNumber: 2, ButtonText: "Investigate the hidden alcove.", next_scene: false},
                3 : {ButtonNumber: 3, ButtonText: "gain strenght by listening to the soothing melody of the flower.", next_scene: false},
                4 : {ButtonNumber: 4, ButtonText: "Continue exploring the passage", next_scene: false},
                5 : {ButtonNumber: 5, ButtonText: "Sit quietly and observe the surroundings", next_scene: false},
                6 : {ButtonNumber: 6, ButtonText: "gain extra lives by touching the mesmerising moss.", next_scene: false}
            },
        },
        "1_7": {
            chapterTitle: "Cave Exploration",
            sceneName: "Crystal1",
            sceneText: "In the heart of the crystal tunnel, you discover a shimmering pool of water, its surface reflecting the myriad hues of the surrounding crystals. As you approach, you notice a faint figure standing at the water's edge, its form obscured by the dancing light.",
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 17,
            ButtonTitle: "What shall you do",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Leave the area undisturbed", next_scene: "1_2"},
                2: {ButtonNumber: 2, ButtonText: "Approach the figure cautiously.", next_scene: false,},
                3: {ButtonNumber: 3, ButtonText: "Sit quietly by the pool and observe.", next_scene: false,},
                4: {ButtonNumber: 4, ButtonText: "Cast a stone into the pool.", next_scene: false,},
                5: {ButtonNumber: 5, ButtonText: "Attempt to communicate with the figure.", next_scene: false,},
                6: {ButtonNumber: 6, ButtonText: "Feel the cool crystal walls with your hands.",
                    next_scene: false,
                    action: [{
                        type: 'damageAndDeath',
                        value: '15',
                        text: 'of an ambiguous pond of glazend color'
                    }],
                },
            },
            ALT_options: {},
        },
        "1_8": {
            chapterTitle: "Cave Exploration",
            sceneName: "Shadowed1",
            sceneText: "Within the shadowed corridor, you come across a series of ancient runes etched into the cavern walls, their meanings lost to time. As you study the intricate symbols, you sense a faint stirring in the darkness, as if the very shadows themselves are alive with unseen energy.",
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 18,
            ButtonTitle: "What shall you do",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Leave the area undisturbed", next_scene: "1_3"},
                2: {ButtonNumber: 2, ButtonText: "Reach out to touch the ancient runes.", next_scene: false,},
                3: {ButtonNumber: 3, ButtonText: "Atempt to read the chant or incantation.", next_scene: false,},
                4: {ButtonNumber: 4, ButtonText: "Continue down the corridor.", next_scene: false,},
                5: {ButtonNumber: 5, ButtonText: "Meditate in front of the runes.", next_scene: false,},
                6: {ButtonNumber: 6, ButtonText: "Feel the texture of the walls for any irregularities.", next_scene: false,},
            },
            ALT_options: {},
        },
        "1_9": {
            chapterTitle: "Cave Exploration",
            sceneName: "Subterranean1",
            sceneText: "Along the banks of the subterranean stream, you encounter a family of glowing fish, their scales shimmering with iridescent light as they dart through the crystal-clear waters. They seem to be communicating with one another through a series of intricate patterns and movements, creating a mesmerizing display of aquatic ballet.",
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 19,
            ButtonTitle: "What shall you do",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Leave the area undisturbed", next_scene: "1_4"},
                2: {ButtonNumber: 2, ButtonText: "Follow the stream to its source.", next_scene: false,},
                3: {ButtonNumber: 3, ButtonText: "Offer a small offering of food to the fish.", next_scene: false,},
                4: {ButtonNumber: 4, ButtonText: "Take a moment to admire the surroundings.", next_scene: false,},
                5: {ButtonNumber: 5, ButtonText: "Feel the water with your hands.", next_scene: false,},
                6: {ButtonNumber: 6, ButtonText: "Listen to the soothing sound of the rushing stream.", next_scene: false,},
            },
            ALT_options: {},
        },
        "1_10": {
            chapterTitle: "Cave Exploration",
            sceneName: "Fungal1",
            sceneText: "Deep within the fungal grove, you stumble upon a cluster of luminous mushrooms, their caps pulsating with a soft, ethereal light. As you approach, you feel a sense of peace wash over you, as if the mushrooms are emitting a calming energy that soothes your weary soul.",
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 20,
            ButtonTitle: "What shall you do",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Leave the area undisturbed", next_scene: "1_5"},
                2: {ButtonNumber: 2, ButtonText: "Sit amongst the mushrooms and observe.", next_scene: false,},
                3: {ButtonNumber: 3, ButtonText: "Reach out to touch the mushrooms.", next_scene: false,},
                4: {ButtonNumber: 4, ButtonText: "Inhale deeply, breathing in the aroma.", next_scene: false,},
                5: {ButtonNumber: 5, ButtonText: "Feel the texture of the ground beneath your feet.", next_scene: false,},
                6: {ButtonNumber: 6, ButtonText: "Listen for any sounds emanating from the grove.", next_scene: false,},
            },
            ALT_options: {},
        },
        "1_11": {
            chapterTitle: "Cave Exploration",
            sceneName: "Mossy2",
            sceneText: "placeholder",
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 21,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {},
        },
        "1_12": {
            chapterTitle: "Cave Exploration",
            sceneName: "Mossy1_hidden_enclove",
            sceneText: "You have found a hidden alcove tucked away within the mossy passage, concealed by lush greenery. Inside, the alcove opens into a small chamber adorned with shimmering crystals that reflect the dim light filtering through cracks in the ceiling. The air is cool and refreshing, carrying a faint hint of earthiness and mystery. Amidst the crystals, you spot a glimmering object half-buried in the moss—a small, intricately carved wooden box",
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 22,
            ButtonTitle: "With careful hands, you consider the small, intricately carved wooden box half-buried in the moss. You have the option to:",
            Buttons_Hidden: [{
                ButtonNumber: 6,
                Default: 'visible',
            }],
            options: {
                1: {ButtonNumber: 1, ButtonText: "Leave the box undisturbed and leave the alcove", next_scene: "1_6"},
                2: {ButtonNumber: 6, ButtonText: "Pick up the box and examine its contents",
                    next_scene: false,
                    action: [{
                        type: 'manageHiddenInfo',
                        show: 'true',
                        textID: 1,
                        itemID: 4,
                        Btn: [{
                            BtnID: 6,
                            IsVisible: true,
                        }]
                    }],
                }
            },
            ALT_options: {},
        },
        "2_0": {
            chapterTitle: "Lost in the forest",
            sceneName: "FreshAir",
            sceneText: `As the protagonist emerged from the cave's mouth, shrouded in the embrace of night's thick veil, a sense of urgency seized their heart. With every step into the darkness, the chilling embrace of uncertainty tightened its grip. The moon, a mere sliver in the sky, cast feeble light upon the rugged terrain, barely illuminating the path ahead. Each shadow seemed to whisper secrets of hidden dangers, urging caution with every hesitant footfall.
                The wilderness stretched out before them, an endless expanse of tangled undergrowth and looming silhouettes of trees. The rustle of leaves and the distant howl of unseen creatures served as eerie companions on their journey. With no destination in sight, the need for shelter gnawed at their very core, urging them onward in search of refuge from the unforgiving night.
                Their senses heightened, attuned to every sound and movement in the darkness, they pressed forward, driven by the primal instinct for survival. The cool night air kissed their skin, carrying the scent of damp earth and ancient secrets. In the distance, a faint glow beckoned—a beacon of hope amidst the vast unknown.
                With determination etched upon their features, they forged ahead, guided by the flickering light, their quest for shelter a silent prayer in the wilderness of the night.`,
            ALT_Name: null,
            ALT_Text: null,
            sceneID: 23,
            ButtonTitle: "",
            options: {
                1: {ButtonNumber: 1, ButtonText: "Previously"},
                2: {ButtonNumber: 7, ButtonText: "Next"},
            },
            ALT_options: {},
        },
    },
    RandomEvent : { // NOT USED YET
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
    Canvas : {
        //  chapterID_sceneID : {  canvasID : [  canvas elements ]  }
        PlayerPosition : '',// chapterID_sceneID
        map : [
            {
                sceneID: "0_0",
                canvasID: "canvas0",
            }
        ],
    },
    Map : [
        /*
        {
            canvasElement: '.content-canvas',
            canvasPosition: undefined,
            nodes: [
                {status: 'available', id: 1, title: 'Home', x: 50, y: 50},
                {status: 'completed', id: 2, title: 'Home Street', y: 350, x: 250},
                {status: 'locked', id: 3, title: 'Park', x: 600, y: 350}
            ],
            playerProgress: 'scene',
            isClickable: true
        },
        */
        {
            canvasElement: '.map-canvas',
            canvasPosition: {width: 100, height: 1000},
            nodes: [
                {id: 0, title: 'Bottomless-lake', status: 'locked', x: 50, y: 980},
                {id: 1, title: 'Cavern', status: 'completed', x: 50, y: 880},
                {id: 2, title: 'Base', status: 'available', x: 50, y: 780},
                {id: 3, title: 'Broken World', status: 'locked', x: 50, y: 680},
                {id: 4, title: 'Dunguon', status: 'locked', x: 50, y: 580},
                {id: 5, title: 'Step-up', status: 'locked', x: 50, y: 480},
                {id: 6, title: 'New-World', status: 'locked', x: 50, y: 380},
                {id: 7, title: 'Sky-Breaker', status: 'locked', x: 50, y: 280},
                {id: 8, title: '9-sky', status: 'locked', x: 50, y: 180},
                {id: 9, title: 'Heaven?', status: 'locked', x: 50, y: 80}
            ],
            playerProgress: 'chapter',
            isClickable: false
        }
    ],
    Choices_Made : {
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
    Uncoverded : {
        //  type of hidden piece : {    ID of said piece    }
        HiddenText : {
            0 : false,
            1 : true,
        },
        HiddenButton : [
            {
                BtnID: 2,
                Show: false,
                sceneID: 16,
            },{
                BtnID: 6,
                Show: true,
                sceneID : 22,
            }
        ],
        Items : {
            0 : false,
            4 : false,
        },
    },
    character_Description_Text: {
        // scene number : { charachterDefining : "Text"}
        2: {
            charachterDefining: "Your ${value} eyes reveal a captivating depth, while the rest of your features remain undisclosed, shrouded in mystery.",
        },
        3: {
            charachterDefining: "Your ${valueSTRING[0]} eyes and your ${value} stylish hair reveal a captivating essence, yet the remainder of you remains veiled in mystery.",
        },
        4: {
            charachterDefining: "Your ${valueSTRING[0]} eyes, your ${valueSTRING[1]} stylish hair, and your ${value} complexion exude a captivating essence, leaving the rest of you shrouded in mystery.",
        },
        5: {
            charachterDefining: "Your ${valueSTRING[0]} eyes, your ${valueSTRING[1]} stylish hair, your ${valueSTRING[2]} complexion, and your ${value} stature combine to present a captivating essence, yet the remainder of you remains shrouded in mystery.",
        },
        6: {
            charachterDefining: "Your ${valueSTRING[0]} eyes, your ${valueSTRING[1]} stylish hair, your ${valueSTRING[2]} complexion, your ${valueSTRING[3]} stature, and your ${value} attire collectively emanate a captivating essence, leaving the rest of you unexplored.",
        },
        7: {
            charachterDefining: "Your ${valueSTRING[0]} eyes, your ${valueSTRING[1]} stylish hair, your ${valueSTRING[2]} complexion, your ${valueSTRING[3]} stature, and your ${valueSTRING[4]} attire collectively emanate a captivating essence. While your gender is ${value} your race remains a mystery, awaiting discovery.",
        },
    },
    character_Description_Text_Final: undefined,
    Debuff_SpashText_Final: undefined,
    CurrentDebuff_Effects : [
        // "effect" example: "weakened"
    ],
    Debuff_SpashText: {
        // CurrentDebuffBar : Debuff_SpashText_Color
        //  debuff(bar) effect : {  effect number ranging from 0- 100 with increment of 10 expect the last one. example;}
        //  pain : {0 : "0", 1 : "1-10", 2 : "11-20", 3 : "21-30", 4 : "31-40", 5 : "41-50", 6 : "51-60", 7 : "61-70", 8 : "71-80", 9 : "81-90", 10 : "91-99", 11 : "100"}
        Pain: {
            Text: {
                0: "No pain",
                1: "Barely noticeable discomfort",
                2: "Mild twinge or ache",
                3: "Slight discomfort with movement",
                4: "Noticeable discomfort",
                5: "Moderate pain",
                6: "Significant pain",
                7: "Intense pain",
                8: "Severe pain",
                9: "Excruciating pain",
                10: "Agonizing pain",
                11: "Ultimate agony",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)}
            },
        },
        Fatigue: {
            Text: {
                0: "No fatigue",
                1: "Minimal tiredness",
                2: "Slight weariness",
                3: "Noticeable fatigue",
                4: "Moderate tiredness",
                5: "Mild exhaustion",
                6: "Significant fatigue",
                7: "Heavy weariness",
                8: "Severe exhaustion",
                9: "Nearing sleepiness",
                10: "Struggling to stay awake",
                11: "Can fall asleep anytime",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Fear: {
            Text: {
                0: "No fear",
                1: "Slight unease",
                2: "Mild apprehension",
                3: "Noticeable concern",
                4: "Moderate worry",
                5: "Growing anxiety",
                6: "Significant fear",
                7: "Intense dread",
                8: "Severe panic",
                9: "Overwhelming terror",
                10: "Paralyzing fear",
                11: "Absolute terror",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Stress: {
            Text: {
                0: "No stress",
                1: "Minimal tension",
                2: "Mild unease",
                3: "Noticeable stress",
                4: "Moderate pressure",
                5: "Increasing strain",
                6: "Significant stress",
                7: "Intense pressure",
                8: "Severe strain",
                9: "Overwhelming stress",
                10: "Near breaking point",
                11: "Extreme distress",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Trauma: {
            Text: {
                0: "No trauma",
                1: "Mild distress",
                2: "Emotional discomfort",
                3: "Noticeable unease",
                4: "Moderate distress",
                5: "Increasing anxiety",
                6: "Significant trauma",
                7: "Intense emotional pain",
                8: "Severe distress",
                9: "Overwhelming trauma",
                10: "Near-breaking point",
                11: "Extreme anguish",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Addiction: {
            Text: {
                0: "No addiction",
                1: "Mild craving",
                2: "Occasional urges",
                3: "Noticeable dependency",
                4: "Moderate addiction",
                5: "Increasing compulsion",
                6: "Significant dependency",
                7: "Intense craving",
                8: "Severe addiction",
                9: "Overwhelming obsession",
                10: "Near-irresistible urge",
                11: "Extreme dependence",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Sickness: {
            Text: {
                0: "No sickness",
                1: "Mild discomfort",
                2: "Slight illness",
                3: "Noticeable symptoms",
                4: "Moderate sickness",
                5: "Increasing discomfort",
                6: "Significant illness",
                7: "Intense symptoms",
                8: "Severe sickness",
                9: "Overwhelming ailment",
                10: "Critical condition",
                11: "Near death",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Bleed: {
            Text: {
                0: "No bleeding",
                1: "Minor cut or scrape",
                2: "Slow trickle of blood",
                3: "Noticeable bleeding",
                4: "Moderate hemorrhage",
                5: "Increasing blood flow",
                6: "Significant blood loss",
                7: "Heavy bleeding",
                8: "Severe hemorrhaging",
                9: "Critical blood loss",
                10: "Life-threatening bleed",
                11: "Near exsanguination",
            },
            BarLength: "0",
            color: {
              0: "#00FF00", // Nothing (Green)
              1: "#33FF00", // Barely noticeable
              2: "#66FF00", // Mild
              3: "#99FF00", // Slight
              4: "#CCFF00", // Noticeable
              5: "#FFFF00", // Moderate (Yellow)
              6: "#FFCC00", // Significant
              7: "#FF9900", // Intense
              8: "#FF6600", // Severe
              9: "#FF3300", // Excruciating
              10: "#FF0000", // Agonizing (Red)
              11: "#FF0000", // Ultimate  (Red)
            },
        },
        Control: {
            Text: {
                0: "No control",
                1: "Limited restraint",
                2: "Basic discipline",
                3: "Developing control",
                4: "Moderate self-regulation",
                5: "Steady discipline",
                6: "Growing mastery",
                7: "Strong self-control",
                8: "Advanced discipline",
                9: "Near mastery",
                10: "Masterful control",
                11: "Complete mastery",
            },
            BarLength: "100",
            color: {
              0: "#FF0000", // Ultimate  (Red)
              1: "#FF0000", // Agonizing (Red)
              2: "#FF3300", // Excruciating
              3: "#FF6600", // Severe
              4: "#FF9900", // Intense
              5: "#FFCC00", // Significant
              6: "#FFFF00", // Moderate (Yellow)
              7: "#CCFF00", // Noticeable
              8: "#99FF00", // Slight
              9: "#66FF00", // Mild
              10: "#33FF00", // Barely noticeable
              11: "#00FF00", // Nothing (Green)
            },
        },
    },
    Debuff_Effects : {
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
    Buff_Effects : {
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
    Settings : {
        SlowTyping : true,
        DynamicTyping: false,
        IregularSpeed : false,
        Controls : {
            Up : 'ArrowUp',
            Down : 'ArrowDown',
            Left : 'ArrowLeft',
            Right : 'ArrowRight',
            Enter : 'Enter',
            Space : 'Space',
            Escape : 'Escape',
            Inventory : 'I',
        },
    },

    Items : [
        //  { id: "PlaceHolder", Name : "PlaceHolder", DescriptionText : 'PlaceHolder', Discoverytext : "PlaceHolder", quantity : "PlaceHolder" , color : "PlaceHolder", quality : "PlaceHolder"}, choose between common/uncomon/rare/unique/Legendary}
        { id: 1 , Name : "Soul Redeemer", Discoverytext : "You have discovered a Soul Redeemer, a legendary item that holds immense power.", quantity : 0, color : "Yellow", quality : "Legendary"},
        { id: 2 , Name : "rock", Discoverytext : "You have discovered a rock, a common item that can be used for various purposes.", quantity : 0, color : "Grey", quality : "common"},
        { id: 3 , Name : "stick", Discoverytext : "You have discovered a stick, a common item that can be used for various purposes.", quantity : 0, color : "Grey", quality : "common"},
        { 
            id: 4 ,
            Name : "green gemstone",
            DescriptionText : '',
            Discoverytext : "~You have found an uncommon green gemstone nestled within the intricately carved wooden box. Its hue is vibrant and captivating, catching the dim light with a mesmerizing sparkle. This discovery adds a unique and valuable treasure to your journey through the mossy passage.",
            quantity : 0,
            color : "green",
            quality : "uncommon"},
        { id: 5 , Name : "red gemstone", DescriptionText : '', Discoverytext : "You have discovered a red gemstone, an uncommon item that can be used for various purposes.", quantity : 0, color : "Green", quality : "uncommon"},
        { id: 6 , Name : "blue gemstone", DescriptionText : '', Discoverytext : "You have discovered a blue gemstone, an uncommon item that can be used for various purposes.", quantity : 0, color : "Green", quality : "uncommon"},
        { id: 7 , Name : "brown gemstone", DescriptionText : '', Discoverytext : "You have discovered a brown gemstone, an uncommon item that can be used for various purposes.", quantity : 0, color : "Green", quality : "uncommon"},
        { id: 8 , Name : "white gemstone", DescriptionText : '', Discoverytext : "You have discovered a white gemstone, a rare item that can be used for various purposes.", quantity : 0, color : "Blue", quality : "rare"},
        { id: 9 , Name : "dark gemstone", DescriptionText : '', Discoverytext : "You have discovered a dark gemstone, a rare item that can be used for various purposes.", quantity : 0, color : "Blue", quality : "rare"},
        { id: 10 , Name : "purple gemstone", DescriptionText : '', Discoverytext : "You have discovered a purple gemstone, an epic item that can be used for various purposes.", quantity : 0, color : "Purple", quality : "epic"},
    ],
    Inventory : [
        //  ID number : {"Name" : Name of item ,"quantity" : 0,"quality" : "common"}
        //   { id: 0 , Name : "PlaceHolder", quantity : 0, quality : "common"},
        { id: 1 , Name : "Soul Redeemer", quantity : 1, quality : "Legendary"},

    ],
}