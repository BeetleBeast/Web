const Title = document.querySelector('.Quest_Title');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const choices_section_title = document.querySelector('.choices_section_title');
const choices_section = document.querySelectorAll('.choices_section');
const Button_Choice1 = document.querySelector('.Sh_1');
const Button_Choice2 = document.querySelector('.Sh_2');
const Button_Choice3 = document.querySelector('.Sh_3');
const Button_Choice4 = document.querySelector('.Sh_4');
const Button_Choice5 = document.querySelector('.Sh_5');
const Button_Choice6 = document.querySelector('.Sh_6');
const Button_Choice7 = document.querySelector('.Sh_7');
const savefileId = document.getElementById('savefileId');
const loadfileId = document.getElementById('loadfileId');
const Side_Menu2 = document.getElementById('Side-Menu2');   //  Character list  (in words)
const Side_Menu3 = document.getElementById('Side-Menu3');   //  effects    (Debuff)
const Side_Menu4 = document.getElementById('Side-Menu4');   //  influences  (Bar)

var saveFileNum = 0;    //  TODO : make it usefull
let valueSTRING = [];
let isCurrentlyPrinting = false; // set true if is printing and false if not
let stopTyping = false;
let amount = 0;
let previousAmounts = {};
let IsPacified = false;
let saveFile = {}; // Initialize saveFile object

// Function to start up the game
window.onload = function() {
    startup()
};

// Function to start up or load the game
function startup() {
    // Display a yes/no prompt
    const userConfirmed = confirm("Do you want to play from the last save?");

    if (userConfirmed) {
        console.log("User confirmed to load last save.");
        loadGame();
    } else {
        console.log("User declined to load last save. Starting a new game.");
        newGame(saveFileNum);
    }
}

// Function to load the game from localStorage
function loadGame() {
    let loadedSaveFile = JSON.parse(localStorage.getItem('LatestsaveFile'));

    if (loadedSaveFile) {
        console.log('Loaded save file:', loadedSaveFile);
        saveFile = loadedSaveFile;
        SetinnerHTMLToZero()
        story(saveFile);
    } else {
        console.error('Error: Loaded save file is invalid.');
        newGame(saveFileNum); // Fallback to starting a new game if loading fails
    }
}

// newGame makes the prep for a new game
function newGame(saveFileNum){
    console.log('new game');

    let saveFile = {
        "saveFileNumber" : saveFileNum,
        "current_storyLine_progress" : 0,
        "current_chapter_progress" : 0,
        "current_title_progress" : 0,
        "title_progress" : { 
            //  title / chapter num : { title_story_[current_title_progress] : title}
            0 : { "title_story_0" : 'Into the new world'},
            1 : { "title_story_1" : 'Finding an exit'},
            2 : { "title_story_2" : 'Lost in the forest'}, 
            3 : { "title_story_3" : 'Old cabbin'},
        },
        "storyLine_progress" : {
            //  chapter num : { Scene num : {"sceneName" : "placeholder", "playerText": "placeholder"}, },
            0 : {
                0 :  {"sceneName" : "Start", "playerText": "You wake up in a dark cave, the damp air clinging to your skin as you grope for any semblance of direction. The sound of distant rumbling echoes through the cavern, urging you to explore. With each step, the path twists and turns, revealing ancient ruins and forgotten passages. As you navigate this mysterious labyrinth, the weight of uncertainty presses upon you, yet a flicker of curiosity ignites within."},
                1 :  {"sceneName" : "charachterDefining0", "playerText" : "Gazing into the rippling surface of a subterranean pool, you catch a glimpse of your own reflection amidst the murky depths. The dim light barely illuminates your features, leaving much to the imagination. Who is this figure staring back at you? The lines of gender blur in the wavering distortion, leaving only a sense of mystery in its wake. Lost in contemplation, you linger in the tranquil embrace of the cave, pondering the journey that lies ahead. With each ripple that disturbs your reflection, a surge of determination propels you forward, ready to embrace the enigma of your own existence. Let us now delve deeper into the story of this mysterious soul, as we unveil the intricate details of Your identity amidst the shadows of the underworld."},
                2 :  {"sceneName" : "charachterDefining1", "playerText" : "In the dim cavern, Your eyes glimmer like precious gems, reflecting the faint light with an entrancing allure. With each glance, you discern a depth of color, ranging from the azure depths of a tranquil ocean to the earthy warmth of sunlit forests"},
                3 :  {"sceneName" : "charachterDefining2", "playerText" : "Amidst the shadows, Your hair dances in the gentle breeze, its texture hinting at a story of its own. Whether cascading in ebony rivers, catching the light in shimmering silver strands, or ablaze with the fiery hues of a setting sun, each tress adds to Your mystique"},
                4 :  {"sceneName" : "charachterDefining3", "playerText" : "Your skin, bathed in the flickering light, revealed a complexion that seemed to hold stories untold. As you observe closely, you notice nuances of color, from the palest porcelain to the richest ebony, each hue adding depth to Your enigmatic presence."},
                5 :  {"sceneName" : "charachterDefining4", "playerText" : "Your stature, silhouetted against the cavern walls, commands attention with a presence that is both formidable and intriguing. As you study them further, you discern the subtle contours of Your frame, which may lean towards a delicate grace or exude a powerful strength, leaving an indelible impression in the depths of the cavern."},
                6 :  {"sceneName" : "charachterDefining5", "playerText" : "Your attire, a reflection of your journey through the rugged terrain, appears weathered and worn, bearing the marks of your passage through the cave's unforgiving landscape. You notice that your clothing carries either the rugged authenticity of a seasoned traveler, marked by dirt and grime, or the pristine cleanliness that hints at your recent arrival, untouched by the trials of the cavern."},
                7 :  {"sceneName" : "charachterDefining6", "playerText" : "Gazing into the rippling waters of the cave's puddle, the figure contemplates their gender, recognizing it as a deeply personal truth. Whether they perceive themselves as aligning with the feminine or masculine, their identity crystallizes as a reflection of their inner self, not merely a narrative waiting to be written."},
                8 :  {"sceneName" : "charachterDefining7", "playerText" : "As the light begins to dim within the cavern, the figure gazes into the fading reflections of the puddle, contemplating their essence. In the obscurity, their species becomes shrouded in uncertainty, a mysterious aspect of their being that defies classification. Their identity transcends the confines of known races, leaving their true nature obscured in the fading light."},
                9 :  {"sceneName" : "seekExit", "playerText" : "Navigating the damp walls of the cavern, you seek an exit, fingers tracing the rough texture in search of escape. With each step, your determination grows, fueled by the desire to break free from the confines of this underground labyrinth."},
            },
            1 : {
                0 :  {"sceneName" : "seekExit0", "playerText": "As you wander through the cave's labyrinthine passages, you encounter a variety of pathways, each offering its own unique allure. One path is adorned with vibrant green moss, another lined with glittering crystals, while another disappears into shadowed depths. Further along, you find yourself following the course of an underground stream, and eventually, you stumble upon a cavern illuminated by bioluminescent fungi. Each pathway beckons with its own mysteries, inviting you to explore deeper into the heart of the cave's secrets."},
                1 :  {"sceneName" : "The Mossy Passage", "playerText": "The current area is enveloped in a verdant embrace, with lush green moss covering every surface. The air is cool and fresh, carrying the earthy scent of vegetation. Shafts of dim light filter through the canopy above, casting dappled patterns on the moss-covered ground."},
                2 :  {"sceneName" : "The Crystal Tunnel", "playerText": "In this area, the walls sparkle with the mesmerizing glow of crystals, illuminating the surroundings with a soft, ethereal light. The air feels charged with energy, and the ground beneath your feet shimmers with crystalline formations. Every step echoes softly in the cavernous space, creating a sense of wonder and awe."},
                3 :  {"sceneName" : "The Shadowed Corridor", "playerText": "As you navigate this area, darkness presses in from all sides, enveloping you in an oppressive gloom. The air feels heavy and stifling, and the sound of your own footsteps echoes eerily in the silence. Shapes shift and morph in the shadows, playing tricks on your senses and heightening your sense of unease."},
                4 :  {"sceneName" : "The Subterranean Stream", "playerText": "Here, the area is defined by the presence of a crystal-clear stream that meanders through the cavern. The sound of rushing water fills the air, accompanied by the gentle drip of stalactites above. The walls are slick with moisture, and patches of bioluminescent fungi cast a soft, eerie glow on the surroundings."},
                5 :  {"sceneName" : "he Fungal Grove", "playerText": "In this area, the cavern is alive with the soft glow of bioluminescent fungi, casting an otherworldly light on the surroundings. The air is thick with the earthy scent of mushrooms, and strange shapes loom in the shadows. The ground beneath your feet is spongy with fungal growth, adding to the surreal atmosphere of the grove."},
                6 :  {"sceneName" : "Mossy1", "playerText": "As you traverse the mossy passage, you stumble upon a hidden alcove where a delicate flower blooms amidst the verdant foliage. Its petals shimmer with an otherworldly glow, emitting a faint, melodic hum. The flower seems to beckon to you, offering a sense of peace and serenity amidst the chaos of the cave."},
                7 :  {"sceneName" : "Crystal1", "playerText": "In the heart of the crystal tunnel, you discover a shimmering pool of water, its surface reflecting the myriad hues of the surrounding crystals. As you approach, you notice a faint figure standing at the water's edge, its form obscured by the dancing light."},
                8 :  {"sceneName" : "Shadowed1", "playerText": "Within the shadowed corridor, you come across a series of ancient runes etched into the cavern walls, their meanings lost to time. As you study the intricate symbols, you sense a faint stirring in the darkness, as if the very shadows themselves are alive with unseen energy."},
                9 :  {"sceneName" : "Subterranean1", "playerText": "Along the banks of the subterranean stream, you encounter a family of glowing fish, their scales shimmering with iridescent light as they dart through the crystal-clear waters. They seem to be communicating with one another through a series of intricate patterns and movements, creating a mesmerizing display of aquatic ballet."},
                10 :  {"sceneName" : "Fungal1", "playerText": "Deep within the fungal grove, you stumble upon a cluster of luminous mushrooms, their caps pulsating with a soft, ethereal light. As you approach, you feel a sense of peace wash over you, as if the mushrooms are emitting a calming energy that soothes your weary soul."},
                11 :  {"sceneName" : "Mossy2", "playerText": "placeholder"},
                12 :  {"sceneName" : "Mossy1_hidden_enclove", "playerText": "You have found a hidden alcove tucked away within the mossy passage, concealed by lush greenery. Inside, the alcove opens into a small chamber adorned with shimmering crystals that reflect the dim light filtering through cracks in the ceiling. The air is cool and refreshing, carrying a faint hint of earthiness and mystery. Amidst the crystals, you spot a glimmering object half-buried in the moss—a small, intricately carved wooden box"},
                13 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
                14 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
                15 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
                16 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
                17 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
                18 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
                19 :  {"sceneName" : "placeholder", "playerText": "placeholder"},
            },
        },
        "Choices_Possible" : {
            //  chapter number : { scene number : { Button number : Text }}
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
            }
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
        "Buttons_section_title" : {
            //  chapter num : {   Scene num : text }
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
        "Player_character" : Player,
        "Buttons" : [1,2,3,4,5,6,7],
        "Buttons_Hidden" : {
            //  chapter number : {  scene number  : [  button numbers wich chould be hidden ]  }
            1 : {
                6 : [2],
            },
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
            { id: 4 , Name : "green_gemstone", quantity : 0, quality : "uncommon"},
            { id: 5 , Name : "red_gemstone", quantity : 0, quality : "uncommon"},
            { id: 6 , Name : "blue_gemstone", quantity : 0, quality : "uncommon"},
            { id: 7 , Name : "brown_gemstone", quantity : 0, quality : "uncommon"},
            { id: 8 , Name : "white_gemstone", quantity : 0, quality : "rare"},
            { id: 9 , Name : "dark_gemstone", quantity : 0, quality : "rare"},
            { id: 10 , Name : "purple_gemstone", quantity : 0, quality : "epic"},

           // : {"Nam" : "PlaceHolder","quantity" : "PlaceHolder" , "quality" : "PlaceHolder"},
        ]
    }
    

    // start story
    story(saveFile);
    
    
}
class Player {
    constructor({ Name, Race, Gender, Age, Profession, Level, Strength, Intelligence, Charisma, Agility, Luck, Health, MaxHealth }) {
        this.Name = Name;
        this.Race = Race;
        this.Gender = Gender;
        this.Age = Age;
        this.Profession = Profession;
        this.Level = Level;
        this.Strength = Strength;
        this.Intelligence = Intelligence;
        this.Charisma = Charisma;
        this.Agility = Agility;
        this.Luck = Luck;
        this.Health = Health;
        this.MaxHealth = MaxHealth;
        this.Debuff_Effects = {};
        this.Buff_Effects = {};
    }
    attack(enemy) {
        // Perform attack logic here
        console.log(`${this.Name} attacks ${enemy}!`);
    }
    heal(amount) {
        // Perform healing logic here
        this.Health += amount;
        if (this.Health > this.MaxHealth) {
            this.Health = this.MaxHealth;
        }
        console.log(`${this.Name} heals for ${amount} health.`);
    }
    levelUp() {
        // Perform level up logic here
        this.Level++;
        console.log(`${this.Name} levels up to level ${this.Level}!`);
    }
    applyDebuff(effect, amount, saveFile, elementId) {
        if(previousAmounts[effect] >= 100){
            console.log('applydebuff amount is over 100')
            this.updateDebuff(effect, 100);
            console.log(`Applying ${100} on debuff: ${effect}`);
            // Update UI element if provided
            if (elementId) {
                const element = document.querySelector(elementId);
                if (element) {
                    this.updateUI(effect, 100, saveFile, element);
                }
            }
        }else{
            console.log('UNDER 100 id=155')
            // Apply debuff effect to the player
            this.updateDebuff(effect, amount);
            // If the debuff effect already exists, update its amount
            if (!saveFile.Debuff_Effects[effect]) {
                saveFile.Debuff_Effects[effect] = { Amount: amount };
            } else {
                saveFile.Debuff_Effects[effect].Amount = amount;
            }
            console.log(`Applying ${amount} on debuff: ${effect}`);
            
            // Update UI element if provided
            if (elementId) {
                const element = document.querySelector(elementId);
                if (element) {
                    this.updateUI(effect, amount, saveFile, element);
                }
            }
        }
    }
    updateDebuff(effect, amount) {
        // If the debuff effect already exists, update its amount
        if (!this.Debuff_Effects[effect]) {
            this.Debuff_Effects[effect] = { Amount: amount };
        } else {
            this.Debuff_Effects[effect].Amount = amount;
        }
    }
    updateUI(effect, amount, saveFile, element) {
        console.log('updateUI is activated id=156')
        // Update UI text to reflect debuff description if available
        if (previousAmounts[effect] >= 100) {
            console.log('updateUI: amount is over 100');
            const existingContent = Side_Menu3.innerHTML.trim();
            const maxEffectDescription = saveFile.Debuff_Effects['MAXeffect'].Description;
            
            if (existingContent.includes(maxEffectDescription)) {
                // Update existing description if it's already present
                Side_Menu3.innerHTML = `${maxEffectDescription} ${effect}.`;
            } else {
                // Append a new description with a line break if needed
                let newDescription = `${maxEffectDescription} ${effect}.`;
                if (existingContent !== '') {
                    Side_Menu3.innerHTML += '<br>';
                }
                Side_Menu3.innerHTML += newDescription;
            }
        }else{
            console.log('updateUI amount is under 100 id=157')
            const effectDescription = saveFile.Debuff_Effects[effect].Description;
            const newDescription = `${effectDescription}, ${amount}`;
            
            // Calculate the new amount based on the previous amount for this effect
            const previousAmount = previousAmounts[effect] || 0;
            const newAmount = previousAmount + amount;
            previousAmounts[effect] = newAmount;
            const newDescriptionWithPreviousAmount = `${effectDescription}, ${newAmount}`;
            const Side_Menu3 = document.getElementById('Side-Menu3');
            const existingContent = Side_Menu3.innerHTML.trim();

            // Construct a regular expression to match the existing description pattern
            const regex = new RegExp(`${effectDescription}, \\d+`);
            
            if (existingContent.includes(effectDescription)) {
                // Replace the existing content with the updated description containing the new amount
                const updatedContent = existingContent.replace(regex, newDescriptionWithPreviousAmount);
                Side_Menu3.innerHTML = updatedContent;
            } else {
                // Append a line break and the new description if it's not already present
                if (existingContent !== '') {
                    Side_Menu3.innerHTML += '<br>';
                }
                Side_Menu3.innerHTML += newDescription;
            }
        }
    }
    rested(amount) {
        // Decrease specific debuff effects when the player rests
        const debuffsToDecrease = [2, 3, 9, 10, 20, 21];
        debuffsToDecrease.forEach(debuffId => {
            if (this.Debuff_Effects[debuffId]) {
                // Decrease the debuff effect
                this.Debuff_Effects[debuffId] -= amount;

                // Check if the debuff effect is completely relieved
                if (this.Debuff_Effects[debuffId] <= 0) {
                    console.log(`${this.Name} has completely relieved the debuff with ID ${debuffId}`);
                    delete this.Debuff_Effects[debuffId]; // Remove the debuff from the debuffEffects object
                } else {
                    console.log(`${this.Name} partially relieves the debuff with ID ${debuffId}`);
                }
            }
        });
    }
}

let character = new Player({
    Level: 0,
    Strength: 0,
    Intelligence: 0,
    Charisma: 0,
    Agility: 0,
    Luck: 0,
    Health: 80,
    MaxHealth: 100,
});


/*
    EXAMPLE 

    character.attack("monster");
    character.heal(20);
    character.levelUp();
    character.rested(amount);
*/


function story(saveFile){
    //const Title = document.querySelector('.Quest_Title');
    const main_section = document.querySelector('.main_section');
    const main_content = document.querySelector('.content-canvas');
    const choices_section_title = document.querySelector('.choices_section_title');
    const choices_section = document.querySelectorAll('.choices_section');
    const Button_Choice1 = document.querySelector('.Sh_1');
    const Button_Choice2 = document.querySelector('.Sh_2');
    const Button_Choice3 = document.querySelector('.Sh_3');
    const Button_Choice4 = document.querySelector('.Sh_4');
    const Button_Choice5 = document.querySelector('.Sh_5');
    const Button_Choice6 = document.querySelector('.Sh_6');
    const Button_Choice7 = document.querySelector('.Sh_7');
    const savefileId = document.getElementById('savefileId');
    const loadfileId = document.getElementById('loadfileId');
    const Side_Menu2 = document.getElementById('Side-Menu2');
    const Side_Menu3 = document.getElementById('Side-Menu3');
    const Side_Menu4 = document.getElementById('Side-Menu4');

    let LatestsaveFile = saveFile;
    
    // Save file click handler function
    function saveFileClickHandler() {
        console.log('Saving game');
        // TODO: Implement save logic based on your requirements
        saveFileNum = 0;

        if (saveFileNum !== null) {
            console.log('Saving game id=1', saveFile);
            savefileId.innerHTML = "Save Successful";
            let saveFileJSON = saveFile;
            localStorage.setItem('saveFile' + saveFileNum, JSON.stringify(saveFileJSON));
            localStorage.setItem('LatestsaveFile', JSON.stringify(LatestsaveFile));
            console.log('Save file ' + saveFileNum + ' saved');
            saveFileNum++;
            return saveFileNum;
        }
    }

    // Load file click handler function
    function loadFileClickHandler() {
        console.log('Loading game');
        let saveFileNum = prompt('Which Save file number (type "latest" if unsure)');

        if (saveFileNum !== null && saveFileNum !== 'latest') {
            console.log('Loading game id=0', saveFileNum);
            loadfileId.innerHTML = "Load Successful";
            let loadedSaveFile = JSON.parse(localStorage.getItem('saveFile' + saveFileNum));
            console.log('Save file ' + saveFileNum + ' loaded');

            // Update saveFile with loaded data
            if (loadedSaveFile) {
                Object.assign(saveFile, loadedSaveFile);
                console.log('Save file updated:', saveFile);
                clearButtonContent();
                story(saveFile);
            } else {
                console.error('Error: Loaded save file is invalid');
            }
        } else if (saveFileNum === 'latest') {
            console.log('Loading latest game id=1');
            loadfileId.innerHTML = "Load Successful";
            let loadedSaveFile = JSON.parse(localStorage.getItem('LatestsaveFile'));
            console.log('Latest save file loaded');

            // Update saveFile with loaded data
            if (loadedSaveFile) {
                Object.assign(saveFile, loadedSaveFile);
                console.log('Save file updated:', saveFile);
                clearButtonContent();
                story(saveFile);
            } else {
                console.error('Error: Loaded save file is invalid');
            }
        }
    }

    // Add event listener for save file click
    if (savefileId && !savefileId.hasAttribute('data-listener-added')) {
        savefileId.addEventListener("click", saveFileClickHandler);
        savefileId.setAttribute('data-listener-added', 'true');
    } else {
        savefileId.removeEventListener("click", saveFileClickHandler);
    }

    // Add event listener for load file click
    if (loadfileId && !loadfileId.hasAttribute('data-listener-added')) {
        loadfileId.addEventListener("click", loadFileClickHandler);
        loadfileId.setAttribute('data-listener-added', 'true');
    } else if (loadfileId && loadfileId.hasAttribute('data-listener-added')) {
        loadfileId.removeEventListener("click", loadFileClickHandler);
    }

    // Function to clear button content
    function clearButtonContent() {
        choices_section_title.innerHTML = "";
        [Button_Choice1, Button_Choice2, Button_Choice3, Button_Choice4, Button_Choice5, Button_Choice6, Button_Choice7].forEach(button => {
            button.innerHTML = "";
        });
    }

    console.log("Begin of story");
        

    //  Start of story by initialising progress/
    let current_storyLine_progress = saveFile.current_storyLine_progress
    let current_title_progress = saveFile.current_title_progress
    let current_storyLine = saveFile.storyLine_progress[saveFile.current_chapter_progress][current_storyLine_progress]
    let current_title = saveFile.title_progress[current_title_progress]

    //  make a save of latest version of saveFile
    localStorage.setItem('LatestsaveFile', JSON.stringify(LatestsaveFile));

    ButtonPressed(saveFile, saveFile.Choices_Possible);    //  print current Buttons
    manageHiddenInfo(saveFile, false);  //  hides info if need be
    title_progress(current_title,current_title_progress)    //  print current title
    scene_progress(current_storyLine,current_storyLine_progress)    //  print current scene text
    choices_section_title.innerHTML = saveFile.Buttons_section_title[saveFile.current_chapter_progress][saveFile.current_storyLine_progress];// print current scection title
    
    function getButtonValues(saveFile) {
        const buttonValues = [];
        for (const buttonValue of saveFile.Buttons) {
            const chapter = saveFile.Choices_Possible[saveFile.current_chapter_progress];
            const scene = chapter[saveFile.current_storyLine_progress];
            const value = scene[buttonValue];
            if (value) {
                console.log('value id=12',value)
                buttonValues.push(buttonValue);
            }
        }
        return buttonValues;
    }
    
    function buttonClickHandler(buttonValue, saveFile) {
        return () => {
            console.log('Button ' + buttonValue + ' pressed'); // Log button press
            if (!isCurrentlyPrinting) {
                //console.log('Pressed button ', buttonValue, ' with value ', value);
                console.log('Starting new scene id=4');
                stopTyping = false;
                switch (buttonValue) {
                    case 1:
                        console.log("Choices_Made before change id=253 ", saveFile.Choices_Made[saveFile.current_chapter_progress]);
                        saveFile.Choices_Made[saveFile.current_chapter_progress].pop();
                        console.log("Choices_Made after change id=254 ", saveFile.Choices_Made[saveFile.current_chapter_progress]);
                        previousScene(saveFile);
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        console.log("Choices_Made before change id=261 ", saveFile.Choices_Made[saveFile.current_chapter_progress]);
                        saveFile.Choices_Made[saveFile.current_chapter_progress].push(buttonValue);
                        Choices_calculator(saveFile);
                        console.log("Choices_Made after change id=262 ", saveFile.Choices_Made[saveFile.current_chapter_progress]);
                        break;
                    case 7:
                        console.log("Choices_Made before change id=255 ", saveFile.Choices_Made[saveFile.current_chapter_progress]);
                        saveFile.Choices_Made[saveFile.current_chapter_progress].push(buttonValue);
                        console.log("Choices_Made after change id=256 ", saveFile.Choices_Made[saveFile.current_chapter_progress]);
                        nextScene(saveFile);
                        break;
                }
            } else {
                stopTyping = true;
                console.log('current_storyLine_progress id=8', saveFile.current_storyLine_progress);
                slowTypingText(saveFile.storyLine_progress[saveFile.current_chapter_progress][saveFile.current_storyLine_progress]['playerText'], '.main_section', undefined, undefined, true);
                slowTypingText(saveFile.title_progress[saveFile.current_title_progress]['title_story_' + saveFile.current_title_progress], '.Quest_Title', undefined, undefined, true);
                isCurrentlyPrinting = false;
                console.log('Print everything for scene number ', saveFile.current_storyLine_progress);
                
            }
        }
    }
    function ButtonPressed(saveFile, infogetter) {
        const buttonValues = getButtonValues(saveFile);
        for (const buttonValue of buttonValues) {
            const button = document.querySelector('.Sh_' + buttonValue);
            if (button) {
                // Get the value of the button from the scene
                const chapter = infogetter[saveFile.current_chapter_progress];
                const scene = chapter[saveFile.current_storyLine_progress];
                const value = scene[buttonValue];
                // Set the inner HTML of the button
                button.innerHTML = value;
                // Add event listener to the button
                const handler = buttonClickHandler(buttonValue, saveFile);
                button.removeEventListener("click", button.handlerReference); // Remove previous listener to avoid duplicates
                button.addEventListener("click", handler);
                button.handlerReference = handler; // Store the reference to the handler function
                console.log('Event listener added for button ' + buttonValue); // Logging the addition of event listener
            }
        }
    }
    function manageHiddenInfo(saveFile, revealInfo) {
        const current_storyLine = saveFile.current_storyLine_progress;
        const current_chapter = saveFile.current_chapter_progress;
        // Check if Buttons_Hidden data exists for the current chapter and story line
        const Buttons_Hidden = saveFile.Buttons_Hidden[current_chapter]?.[current_storyLine];
        if (Buttons_Hidden) {
            // Iterate over the hidden button values for the current scene
            Buttons_Hidden.forEach(buttonValue => {
                const button = document.querySelector('.Sh_' + buttonValue);
                if (button) {
                    // Set button display based on revealInfo condition
                    button.style.display = revealInfo ? "block" : "none";
                }
            });
        } else {
            console.log(`No hidden buttons defined for chapter ${current_chapter} and scene ${current_storyLine}`);
        }
    }
    function DeBuffParentFunction(effect, amount, saveFile, elementId){
        character.applyDebuff(effect, amount, saveFile, elementId)
        deBuffEffectHandler(effect, amount, saveFile, elementId);
    }
    function deBuffEffectHandler(effect, amount, saveFile, element){
        let Confused_Text = saveFile.storyLine_progress_Confused[saveFile.current_chapter_progress][saveFile.current_storyLine_progress]["sceneText"];
        let Confused_Title = saveFile.storyLine_progress_Confused[saveFile.current_chapter_progress][saveFile.current_storyLine_progress]["sceneTitle"];
        switch(effect){
            case 'Weakened':
                break;
            case 'Slowed':
                break;
            case `Blinded`:
                element.style.opacity = amount / 100;
                break;
            case 'Confused':
                break;
            case 'Silenced':
                break;
            case 'Crippled':
                break;
            case 'Vulnerable':
                break;
            case 'Disarmed':
                break;
            case 'Diseased':
                break;
            case 'Fear':
                break;
            case 'Stunned':
                break;
            case 'Hexed':
                break;
            case 'Drained':
                break;
            case 'Sapped':
                break;
            case 'Marked':
                break;
            case 'Burning':
                break;
            case 'Chilled':
                break;
            case 'Rooted':
                break;
            case "pacified":
                // not able to be agressief
                IsPacified = true;
                break;
            case 'Cursed':
                break;
            case 'Fatigue':
                break;
            case 'Confusion':
                // change text to confused text
                console.log('activate confusion')            
                slowTypingText(Confused_Text, '.main_section', undefined, 35);
                slowTypingText(Confused_Title, '.Quest_Title');
                ButtonPressed(saveFile, saveFile.Choices_Possible_Confused);
                break;
            case 'MAXeffect':
                break;
        }
    }
    function title_progress(current_title,current_title_progress) {
        let title_story = current_title['title_story_'+current_title_progress]
        slowTypingText(title_story,'.Quest_Title');       // Put the content on the left and the place where it needs to go on the right
        console.log('title Chapter',title_story)
        console.log('current_title',current_title);
        console.log('current_title_progress', current_title_progress);
    }
    function scene_progress(current_storyLine,current_storyLine_progress) {
        let title_scene = current_storyLine['sceneName']
        let scene_text = current_storyLine['playerText']
        slowTypingText(scene_text,'.main_section',undefined, 35);     // Put the content on the left and the place where it needs to go on the right + index + speed
        console.log('title Scene',title_scene)                          
        //console.log('scene_text',scene_text)
        console.log('current_storyLine',current_storyLine);
        console.log('current_storyLine_progress', current_storyLine_progress);
    }
    function nextScene(saveFile) {
        // Increment the current scene progress only if there are more scenes available
        // current place > next place
        let lastChoiceIndex = saveFile.Choices_Made[saveFile.current_chapter_progress].length - 1;
        let LastButtonPressed = saveFile.Choices_Made[saveFile.current_chapter_progress][lastChoiceIndex];
        if (saveFile.current_storyLine_progress < Object.keys(saveFile.storyLine_progress[saveFile.current_chapter_progress]).length - 1 && saveFile.current_chapter_progress == 0) {
            saveFile.current_storyLine_progress++;
            console.log('pressed NextScene id=5')
        }else if(saveFile.current_storyLine_progress < Object.keys(saveFile.storyLine_progress[saveFile.current_chapter_progress]).length - 1 && saveFile.current_chapter_progress == 1){
            switch(saveFile.current_storyLine_progress){
                case 0:
                    saveFile.current_storyLine_progress = LastButtonPressed - 1; //from 1 to 5 are scene other area
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    saveFile.current_storyLine_progress += 5;
                    break;
                case 6:
                    if(LastButtonPressed == 2){
                        saveFile.current_storyLine_progress += 6;                    
                    }else {
                        saveFile.current_storyLine_progress += 5;
                    }
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                    saveFile.current_storyLine_progress += 5;
                    break;
            }
        } else {
            // Handle the case when there are no more scenes in the current chapter
            console.log('No more scenes available in this chapter');
            nextChapter(saveFile)
            return;
        }
        // Re-render the story with updated saveFile
        console.log('id=9')
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        story(saveFile);
    }
    
    function previousScene(saveFile) {
        // Decrement the current scene progress only if it's not the first scene
        if (saveFile.current_storyLine_progress > 0 && saveFile.current_chapter_progress == 0) {
            saveFile.current_storyLine_progress--;
            console.log('pressed previousScene')
        }else if(saveFile.current_storyLine_progress > 0 && saveFile.current_chapter_progress == 1){
            switch(saveFile.current_storyLine_progress){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    saveFile.current_storyLine_progress = 0;
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    saveFile.current_storyLine_progress -= 5;
                    break;
            }
                
        }else {
            // Handle the case when it's already the first scene
            console.log('Already at the beginning of the chapter');
            previousChapter();
        }
        // Re-render the story with updated saveFile
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        story(saveFile);
    }
    
    function nextChapter(saveFile) {
        // Increment the current chapter progress only if there are more chapters available
        if (saveFile.current_chapter_progress < Object.keys(saveFile.storyLine_progress).length - 1) {
            saveFile.current_storyLine_progress = 0; // Reset the scene progress to start of the new chapter
            saveFile.current_chapter_progress++;
            saveFile.current_title_progress++;
            console.log('Next Chapter');
        } else {
            // Handle the case when there are no more chapters
            console.log('No more chapters available');
        }
        // Re-render the story with updated saveFile
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        story(saveFile);
    }
    
    function previousChapter(saveFile) {
        // Decrement the current chapter progress only if it's not the first chapter
        if (saveFile.current_chapter_progress > 0) {
            saveFile.current_chapter_progress--;
            saveFile.current_title_progress--;
            saveFile.current_storyLine_progress = 0; // Reset the scene progress to start of the previous chapter
            console.log('Previous Chapter');
        } else {
            // Handle the case when it's already the first chapter
            console.log('Already at the beginning of the story');
        }
        // Re-render the story with updated saveFile
        story(saveFile);
    }
    

    function Choices_calculator(saveFile){
        let current_storyLine_progress = saveFile.current_storyLine_progress;
        let current_chapter = saveFile.current_chapter_progress;
        let lastChoiceIndex = saveFile.Choices_Made[saveFile.current_chapter_progress].length - 1;
        let LastButtonPressed = saveFile.Choices_Made[saveFile.current_chapter_progress][lastChoiceIndex];
        let value = saveFile.Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed];
        let Choices_Possible = saveFile.Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed]
        switch (current_chapter){
            case 0:
                switch (lastChoiceIndex) {
                    case 2:
                        character.eye_Color = value;
                        Side_Menu2.innerHTML = "Your "+value+" eyes reveal a captivating depth, while the rest of your features remain undisclosed, shrouded in mystery."
                        valueSTRING.push(value);
                        break;
                    case 3:
                        character.hair_style = value;
                        Side_Menu2.innerHTML = "Your "+valueSTRING[0]+" eyes and your "+value+" stylish hair reveal a captivating essence, yet the remainder of you remains veiled in mystery."
                        valueSTRING.push(value);
                        break;
                    case 4:
                        character.skin_complexion = value;
                        Side_Menu2.innerHTML = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, and your "+value+" complexion exude a captivating essence, leaving the rest of you shrouded in mystery."
                        valueSTRING.push(value);
                        break;
                    case 5:
                        character.stature = value;
                        Side_Menu2.innerHTML = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, your "+valueSTRING[2]+" complexion, and your "+value+" stature combine to present a captivating essence, yet the remainder of you remains shrouded in mystery."
                        valueSTRING.push(value);
                        break;
                    case 6:
                        character.attire = value;
                        Side_Menu2.innerHTML = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, your "+valueSTRING[2]+" complexion, your "+valueSTRING[3]+" stature, and your "+value+" attire collectively emanate a captivating essence, leaving the rest of you unexplored."
                        valueSTRING.push(value);
                        break;
                    case 7:
                        character.gender = value;
                        Side_Menu2.innerHTML = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, your "+valueSTRING[2]+" complexion, your "+valueSTRING[3]+" stature, and your "+valueSTRING[4]+" attire collectively emanate a captivating essence. While your gender is "+value+", your race remains a mystery, awaiting discovery."
                        valueSTRING.push(value);
                        break;
                }
                nextScene(saveFile);
                break;
            case 1:
                switch(current_storyLine_progress){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        nextScene(saveFile)
                        break;
                    case 6:
                        switch(LastButtonPressed){
                            case 2:
                                //  Investigate the hidden alcove
                                nextScene(saveFile);//  I.E. scene 12
                                break;
                            case 3:
                                character.rested(10);
                                DeBuffParentFunction('Pacified', 20, saveFile, ".choices_section")
                                DeBuffParentFunction('Confusion', 20, saveFile, ".choices_section")
                                //  Listen to the soothing melody of the flower
                                break;
                            case 4:
                                //  Continue exploring the passage
                                nextScene(saveFile);
                                break;
                            case 5:
                                character.rested(20)
                                break;
                            case 6:
                                //  Feel the texture of the moss beneath your fingertips
                                main_section.appendChild(document.createElement('br'));
                                //addTextWithTempColor('.main_section',"You have discovered a hidden alcove nestled within the mossy passage, its entrance partially obscured by verdant foliage.",'blue',false)
                                main_section.innerHTML += "You have discovered a hidden alcove nestled within the mossy passage, its entrance partially obscured by verdant foliage.";
                                manageHiddenInfo(saveFile, true)
                                break;
                        }
                        break;
                    case 7:
                        switch(LastButtonPressed){
                            case 2:
                                //  you fall in the water and die if requirement is not activated if it is aquire mysterious figure
                                break;
                            case 3:
                                //  nothing happens
                                break;
                            case 4:
                                //  the stone disolves in the water
                                break;
                            case 5:
                                //  get silence back
                                break;
                            case 6:
                                //  get damage
                                break;
                        }
                        break;
                    case 8:
                        switch(LastButtonPressed){
                            case 2:
                                //  feel drouwsy as not anouth mana ( player will not get info as comprehencion is to low )
                                break;
                            case 3:
                                //  comprencion too low
                                break;
                            case 4:
                                //  nextcene
                                nextScene(saveFile);
                                break;
                            case 5:
                                //  +? in theoretical int
                                break;
                            case 6:
                                //  +? in practical int
                                break;
                        }
                        break;
                    case 9:
                        switch(LastButtonPressed){
                            case 2:
                                //  Follow the stream to its source
                                nextScene(saveFile);
                                break;
                            case 3:
                                //  
                                break;
                            case 4:
                                //  
                                break;
                            case 5:
                                //  
                                break;
                            case 6:
                                //  
                                break;
                        }
                        break;
                    case 10:
                        switch(LastButtonPressed){
                            case 2:
                                //  
                                break;
                            case 3:
                                //  
                                break;
                            case 4:
                                //  
                                break;
                            case 5:
                                //  
                                break;
                            case 6:
                                //  
                                break;
                        }
                        break;
                    case 11:
                        break;
                    case 12:
                        addItemToInventory(4,1);
                        main_section.innerHTML += 'You have found an uncommon green gemstone nestled within the intricately carved wooden box. Its hue is vibrant and captivating, catching the dim light with a mesmerizing sparkle. This discovery adds a unique and valuable treasure to your journey through the mossy passage.';
                    break;
                }
                break;
                //  TODO add special sircumstances for 7 to 10 (sometimes go to other scene or add to inventory )
                /*
                    7 : { 1 : "Leave the area undisturbed", 2 : "Approach the figure cautiously.", 3 : "Sit quietly by the pool and observe.", 4 : "Cast a stone into the pool.", 5 : "Attempt to communicate with the figure.", 6 : "Feel the cool crystal walls with your hands."},
                    8 : { 1 : "Leave the area undisturbed", 2 : "Reach out to touch the ancient runes.", 3 : "Atempt to read the chant or incantation.", 4 : "Continue down the corridor.", 5 : "Meditate in front of the runes.", 6 : "Feel the texture of the walls for any irregularities."},
                    9 : { 1 : "Leave the area undisturbed", 2 : "Follow the stream to its source.", 3 : "Offer a small offering of food to the fish.", 4 : "Take a moment to admire the surroundings.", 5 : "Feel the water with your hands.", 6 : "Listen to the soothing sound of the rushing stream."},
                    10 : { 1 : "Leave the area undisturbed", 2 : "Sit amongst the mushrooms and observe.", 3 : "Reach out to touch the mushrooms.", 4 : "Inhale deeply, breathing in the aroma.", 5 : "Feel the texture of the ground beneath your feet.", 6 : "Listen for any sounds emanating from the grove."},
                */
        }
    }



    
    const inventoryItems = saveFile.Inventory;
    
    // Function to populate inventory grid based on current page
    function populateInventory(pageNumber) {
        const pageSize = 16; // Number of items per page (adjust based on grid size)

        const pageContainer = document.getElementById(`page${pageNumber}`);
        pageContainer.innerHTML = ''; // Clear previous items

        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, inventoryItems.length);
        const itemsToShow = inventoryItems.slice(startIndex, endIndex);

        itemsToShow.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('inventoryItem');
            itemElement.textContent = `${item.Name} x${item.quantity}`;
            pageContainer.appendChild(itemElement);
        });
    }
    // Initialize the first page of the inventory
    populateInventory(1);


return saveFile
}
// Function to toggle visibility of the inventory
function toggleInventory() {
    const inventory = document.getElementById('inventory');
    const toggleInventoryText = document.getElementById('toggleInventoryText');
    if (inventory.style.display === 'none') {
        inventory.style.display = 'block';
        toggleInventoryText.style.display = 'none'; // Hide "Press I" text when inventory is visible
    } else {
        inventory.style.display = 'none';
        toggleInventoryText.style.display = 'block'; // Show "Press I" text when inventory is hidden
    }
}
// Event listener for key press (I key)
document.addEventListener('keydown', function(event) {
    if (event.key === 'i' || event.key === 'I') {
        toggleInventory();
    }
});
function addTextWithTempColor(elementId, text, tempColor, Replace = true) {
    const element = document.querySelector(elementId);
    
    // Change text content
    if(Replace){
        element.textContent = text;
    }else{
        element.textContent += text;
    }
    // Temporarily change text color using the provided color
    element.style.color = tempColor;
    // Reset color after a delay (simulating temporary color change)
    setTimeout(() => {
        element.style.color = 'azure'; // Reset to default color (azure)
    }, 1000); // Adjust delay time (in milliseconds) as needed
}
function addItemToInventory(itemId, newQuantity) {
    // Function to add an item from ListOfAllItems to Inventory with a specified quantity
    // Find the item in ListOfAllItems by itemId
    const itemToAdd = saveFile.ListOfAllItems.find(item => item.id === itemId);
    if (itemToAdd) {
        // Clone the item from ListOfAllItems and set its quantity
        const newItem = {
            id: itemToAdd.id,
            Name: itemToAdd.Name,
            quantity: newQuantity,
            quality: itemToAdd.quality
        };

        // Add the new item to the Inventory array
        saveFile.Inventory.push(newItem);
    } else {
        console.error(`Item with id ${itemId} not found in ListOfAllItems.`);
    }
}
function SetinnerHTMLToZero() {
    if (choices_section_title)  choices_section_title.innerHTML = " ";
    if (Button_Choice1)         Button_Choice1.innerHTML = " ";
    if (Button_Choice2)         Button_Choice2.innerHTML = " ";
    if (Button_Choice3)         Button_Choice3.innerHTML = " ";
    if (Button_Choice4)         Button_Choice4.innerHTML = " ";
    if (Button_Choice5)         Button_Choice5.innerHTML = " ";
    if (Button_Choice6)         Button_Choice6.innerHTML = " ";
    if (Button_Choice7)         Button_Choice7.innerHTML = " ";
}
function slowTypingText(text, elementId, index = 0, speed = 200, printImmediately = false) {
    // Check if the text has already been printed
    if (document.querySelector(elementId).innerText == text) {
        return;
    }
    if (printImmediately) {
        // Clear the element before printing and print immediately
        document.querySelector(elementId).innerHTML = '';
        document.querySelector(elementId).innerHTML = text;
        return;
    }
    // Set printing flag before starting to print
    isCurrentlyPrinting = true;
    function printCharacter() {
        if (index < text.length && !stopTyping) {
            isCurrentlyPrinting = true;
            // Print each character with a delay
            let char = text[index];
            if (char === " ") {
                // For space character, include it in the output string with an extra space
                document.querySelector(elementId).innerHTML += '&nbsp;';
            } else {
                document.querySelector(elementId).innerHTML += char;
            }
            index++;
            setTimeout(printCharacter, speed);
        } else {
            // If all characters have been printed, reset printing flag
            isCurrentlyPrinting = false;
        }
    }
    // Clear the element before starting to print characters
    document.querySelector(elementId).innerHTML = '';
    // Start printing characters
    printCharacter();
    
}



