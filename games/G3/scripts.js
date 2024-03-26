const Title = document.querySelector('.Quest_Title');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const bar = document.querySelector('.bar');
const extra = document.querySelector('.extras');
const options = document.querySelector('.options');
const app = document.querySelector('#app'); // all the app (right and center includin title)
const choices_section_title = document.querySelector('.choices_section_title');
const Button_Choice1 = document.querySelector('.Sh_1');
const Button_Choice2 = document.querySelector('.Sh_2');
const Button_Choice3 = document.querySelector('.Sh_3');
const Button_Choice4 = document.querySelector('.Sh_4');
const Button_Choice5 = document.querySelector('.Sh_5');
const savefileId = document.getElementById('savefileId');

var saveFileNum = 0;
var last_loaded_game = '';
var typeOfGame = 'New_Game';

let isCurrentlyPrinting = false; // set true if is printing and false if not curently printing if true and printImmediately is also true stop slowTypingText and print everything 
let stopTyping = false;
// initial latest loaded game
if (saveFileNum == 0){
    saveFileNum = 1;
}else if(saveFileNum){
    console.log('Initial function executed.');
    last_loaded_game = 'saveFile'+saveFileNum+'.json';
    typeOfGame = 'Continue_Game';
}
 // if there is no saved files create a new save file
 onload = function() {startup(last_loaded_game)};

 function startup(last_loaded_game){

     if (! last_loaded_game || last_loaded_game == '' || last_loaded_game == ' ') {
         newGame();
         console.log('new game!');
     }
     else{
         LoadGame(last_loaded_game);
         console.log('load game!')
     }
 }
/*

// saves a local version instead of a web storage
function Save_LOCAL(saveFile) {
    document.addEventListener('DOMContentLoaded', function() {
        var data = saveFile;
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: 'application/json'});
        var a = document.createElement('a');
        a.download = 'saveFile.json';
        a.href = URL.createObjectURL(blob);
        a.textContent = 'Download saveFile.json';
        a.dataset.downloadurl = ['application/json', a.download, a.href].join(':');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
*/

// newGame makes the prep for a new game
function newGame(saveFileNum){
    console.log('new game');

    let saveFile = {

        "saveFileNumber" : saveFileNum,
        "curent_storyLine_progress" : 0,
        "curent_chapter_progress" : 0,

        "curent_nonlinear_storyLine_progress" : 0,
        "storyLine_progress" : {
            0 :  {"sceneName" : "Start", "playerText": "You wake up in a dark cave, the damp air clinging to your skin as you grope for any semblance of direction. The sound of distant rumbling echoes through the cavern, urging you to explore. With each step, the path twists and turns, revealing ancient ruins and forgotten passages. As you navigate this mysterious labyrinth, the weight of uncertainty presses upon you, yet a flicker of curiosity ignites within."},
            1 :  {"sceneName" : "charachterDefining-0", "playerText" : "Gazing into the rippling surface of a subterranean pool, you catch a glimpse of your own reflection amidst the murky depths. The dim light barely illuminates your features, leaving much to the imagination. Who is this figure staring back at you? The lines of gender blur in the wavering distortion, leaving only a sense of mystery in its wake. Lost in contemplation, you linger in the tranquil embrace of the cave, pondering the journey that lies ahead. With each ripple that disturbs your reflection, a surge of determination propels you forward, ready to embrace the enigma of your own existence. Let us now delve deeper into the story of this mysterious soul, as we unveil the intricate details of Your identity amidst the shadows of the underworld."},
            2 :  {"sceneName" : "charachterDefining-1", "playerText" : "In the dim cavern, Your eyes glimmer like precious gems, reflecting the faint light with an entrancing allure. With each glance, you discern a depth of color, ranging from the azure depths of a tranquil ocean to the earthy warmth of sunlit forests"},
            3 :  {"sceneName" : "charachterDefining-1", "playerText" : "Amidst the shadows, Your hair dances in the gentle breeze, its texture hinting at a story of its own. Whether cascading in ebony rivers, catching the light in shimmering silver strands, or ablaze with the fiery hues of a setting sun, each tress adds to Your mystique"},
            4 :  {"sceneName" : "charachterDefining-2", "playerText" : "Your skin, bathed in the flickering light, revealed a complexion that seemed to hold stories untold. As you observe closely, you notice nuances of color, from the palest porcelain to the richest ebony, each hue adding depth to Your enigmatic presence."},
            5 :  {"sceneName" : "charachterDefining-3", "playerText" : "Your stature, silhouetted against the cavern walls, commands attention with a presence that is both formidable and intriguing. As you study them further, you discern the subtle contours of Your frame, which may lean towards a delicate grace or exude a powerful strength, leaving an indelible impression in the depths of the cavern."},
            6 :  {"sceneName" : "charachterDefining-4", "playerText" : "Your attire, a reflection of your journey through the rugged terrain, appears weathered and worn, bearing the marks of your passage through the cave's unforgiving landscape. You notice that your clothing carries either the rugged authenticity of a seasoned traveler, marked by dirt and grime, or the pristine cleanliness that hints at your recent arrival, untouched by the trials of the cavern."},
            7 :  {"sceneName" : "charachterDefining-5", "playerText" : "Gazing into the rippling waters of the cave's puddle, the figure contemplates their gender, recognizing it as a deeply personal truth. Whether they perceive themselves as aligning with the feminine or masculine, their identity crystallizes as a reflection of their inner self, not merely a narrative waiting to be written."},
            8 :  {"sceneName" : "charachterDefining-6", "playerText" : "As the light begins to dim within the cavern, the figure gazes into the fading reflections of the puddle, contemplating their essence. In the obscurity, their species becomes shrouded in uncertainty, a mysterious aspect of their being that defies classification. Their identity transcends the confines of known races, leaving their true nature obscured in the fading light."},
            9 :  {"sceneName" : "FindingExit-0", "playerText" : "Navigating the damp walls of the cavern, you seek an exit, fingers tracing the rough texture in search of escape. With each step, your determination grows, fueled by the desire to break free from the confines of this underground labyrinth. In this quest for freedom, your identity remains a mystery, obscured by the darkness that envelops you."},
            /* ADD EXTRA SCENES */
            //  :  {"sceneName" : "placeholder", "playerText" : ""},
        },
        "storyLine_nonlinear" :  {
            0 : {"sceneName" : "First_choice", "playerText" : "placeholder placeholder placeholder placeholder placeholder placeholder "},
            1 : {"sceneName" : "Second_choice", "playerText" : "placeholder placeholder placeholder placeholder placeholder placeholder "},
            /* ADD EXTRA nonlinear SCENES */
        },
        "Chapter_num" : {
            // chapter num : scene in chapter num
            0 : [0,1,2,3,4,5,6,7,8,9],
            /*  ADD EXTRA chapters and scene's in chapter*/
        },
        "Choices_Possible" : {
            //  chapter number : { scene number : { Button option : Text }}
            0 : {
                0 : { 7 : "Next"},
                1 : { 1 : "Previously", 7 : "Next"},
                2 : { 1 : "Previously", 2 : "piercing blue", 3 : "deep brown", 4 : "striking green", 5 : "captivating hazel", 6 : "intense grey"},
                3 : { 1 : "Previously", 2 : "cascading waves", 3 : "cropped short", 4 : "braided intricately", 5 : " sophisticated bun", 6 : "left wild and free"},
                4 : { 1 : "Previously", 2 : "Porcelain fair", 3 : "Sun-kissed bronze", 4 : "Olive-toned", 5 : "Rosy-pink", 6 : "Deep ebony"},
                5 : { 1 : "Previously", 2 : "Petite and delicate", 3 : "Tall and statuesque", 4 : "Somewhere in between", 5 : "Lean and athletic", 6 : "Muscular and imposing"},
                6 : { 1 : "Previously", 4 : "Weathered and worn, marked by dirt and grime, reflecting a seasoned traveler", 7 : "Pristine and clean, untouched by the trials of the cavern, hinting at a recent arrival"},
                7 : { 1 : "Previously", 4 : "Feminine", 7 : "Masculine"},
                8 : { 1 : "Previously", 7 : "Next"},
                9 : { 1 : "Previously", 7 : "Next"},
                10 : { 1 : "Previously", 7 : "Next"},




                //  : { 1 : "Previously", 2 : "", 3 : "", 4 : "", 5 : "", 6 : ""},
                //  : { 1 : "Previously", 2 : "", 3 : "", 4 : "", 5 : "", 6 : "", 7 : ""},
                //  : { 1 : "Previously", 2 : "", 3 : "", 4 : "", 5 : "", 6 : "", 7 : "Next"},
                //  : { 1 : "Previously", 7 : "Next"},
            },

        },
        "Choices_Made" : {
            //  chapter number : string of Button NUM Choices made // EXAMPLE 1,5,3 first CH, fith CH , third CH
            0 : [], 
            /*  ADD EXTRA chapters*/
        },
        "Player_character" : Player,
        "Buttons_section_title" : {0 : " ",},
        "AmountOfButtonsForSceneDefault" : 2,
        "AmountOfButtonsForScene" : {
            // scene number : amount of buttons in that scene
            0: 1, 
            1: 2,
            2: 6,
            3: 6,
            4: 6,
            5: 6,
            6: 3,
            7: 3,
            8: 2,
            9: 2,
            10: 2,
        },
        "Buttons" : [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        "current_title_progress" : 0,
        "title_progress" : { 
            0 : { "title_story_0" : 'Into the new world'},
            1 : {'title_story_1' : 'Lost in the forest'}, 
            2 : {'title_story_2' : 'Old cabbin'},
            /* ADD EXTRA TITLES */
        }
    }


    // start story
    story(saveFile);
    
    
}
class Player {
    constructor({name, race, gender, age, profession, level, strength, intelligence, charisma, agility, luck, health, maxHealth}){
        this.name = name, 
        this.race = race, 
        this.gender = gender, 
        this.age = age,
        this.profession = profession, 
        this.level = level, 
        this.strength = strength, 
        this.intelligence = intelligence, 
        this.charisma = charisma, 
        this.agility = agility, 
        this.luck = luck, 
        this.health = health, 
        this.maxHealth = maxHealth
    }
}

    let character = new Player({
        name: 'nana',
        age: '20',
        profession: 'protagonist',
        race: 'human',
        level: '0',
        strength: '0',
        intelligence: '0',
        charisma: '0',
        agility: '0',
        luck: '0',
        health: '0',
        maxHealth: '100'
    });

function story(saveFile){
    console.log("start story");

    console.log("curent progress id=254 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
    const Title = document.querySelector('.Quest_Title');
    const main_section = document.querySelector('.main_section');
    const main_content = document.querySelector('.content-canvas');
    const bar = document.querySelector('.bar');
    const extra = document.querySelector('.extras');
    const options = document.querySelector('.options');
    const app = document.querySelector('#app'); // all the app (right and center includin title)
    const choices_section_title = document.querySelector('.choices_section_title');
    const Button_Choice1 = document.querySelector('.Sh_1');
    const Button_Choice2 = document.querySelector('.Sh_2');
    const Button_Choice3 = document.querySelector('.Sh_3');
    const Button_Choice4 = document.querySelector('.Sh_4');
    const Button_Choice5 = document.querySelector('.Sh_5');
    const Button_Choice6 = document.querySelector('.Sh_6');
    const Button_Choice7 = document.querySelector('.Sh_7');
    const savefileId = document.getElementById('savefileId');
    //const buttonsArray = [Button_Choice1,Button_Choice2,Button_Choice3,Button_Choice4,Button_Choice5,Button_Choice6,Button_Choice7]


    console.log('title_progress',saveFile.title_progress)
    console.log('current_title_progress',saveFile.current_title_progress)
    let current_title_progress = saveFile.current_title_progress        // make a var van dit 
    let current_title = saveFile.title_progress[current_title_progress]
    title_progress(current_title,current_title_progress)

    console.log('storyLine_progress',saveFile.storyLine_progress)
    console.log('curent_storyLine_progress',saveFile.curent_storyLine_progress)
    let curent_storyLine_progress = saveFile.curent_storyLine_progress        // make a var van dit 
    let current_storyLine = saveFile.storyLine_progress[curent_storyLine_progress]
    console.log('current_storyLine',current_storyLine);
    scene_progress(current_storyLine,curent_storyLine_progress)


    choices_section_title.innerHTML = saveFile.Buttons_section_title[0];  // change if needed be
    
    if (saveFile.AmountOfButtonsForScene[curent_storyLine_progress] == saveFile.AmountOfButtonsForSceneDefault){
        let Button1 = Button_Choice1;
        let Button7 = Button_Choice7;
        Button7.innerHTML = 'Next';  
        Button1.innerHTML = 'Previously';
        Button1.addEventListener("click", function(){
            if(isCurrentlyPrinting){
                stopTyping = true
                slowTypingText(current_storyLine['playerText'], '.main_section',undefined,undefined,true)
                slowTypingText(current_title['title_story_'+current_title_progress], '.Quest_Title',undefined,undefined,true)
            }else{
                
                console.log("previous progress id=257 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                saveFile.Choices_Made[saveFile.curent_chapter_progress].pop();
                console.log("curent progress id=258 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                previousScene(saveFile);
            }
        })
        Button7.addEventListener("click", function() {  // FIXME : gets activated imidiatly ????? 
            if(isCurrentlyPrinting){
                stopTyping = true
                slowTypingText(current_storyLine['playerText'], '.main_section',undefined,undefined,true)
                slowTypingText(current_title['title_story_'+current_title_progress], '.Quest_Title',undefined,undefined,true) 
                
            }else{
                console.log("previous progress id=259 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                saveFile.Choices_Made[saveFile.curent_chapter_progress].push(7);
                console.log("curent progress id=260 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                nextScene(saveFile);
                
            }
        })
        return;
    }else{
        ButtonPressed(saveFile)
    }

    // save loaded game (goes to SG file to load and save the game)
    if (savefileId && !savefileId.hasAttribute('data-listener-added')) {
      savefileId.addEventListener("click", function() {
        console.log('Saving game');
        saveFileNum = prompt('Save file number');
    
        if (saveFileNum !== null) {
          console.log('saving game id-1', saveFile);
          savefileId.innerHTML = "Save Succesful";
          let saveFileJSON = saveFile; // You may want to stringify the saveFile object if it's complex
          localStorage.setItem('saveFile' + saveFileNum, JSON.stringify(saveFileJSON));
          console.log('Save file ' + saveFileNum + ' saved');
          return saveFileNum;
        }
      });
    
      savefileId.setAttribute('data-listener-added', 'true');
    }
     else {
        savefileId.removeEventListener("click", savefileId.addEventListener("click"));
    }
    // FIXME code gets repeated such that it gets scrampled up a lot
    function ButtonPressed(saveFile) {
        for (const buttonValue of saveFile.Buttons) {
            const chapter = saveFile.Choices_Possible[saveFile.curent_chapter_progress];
            if (chapter) {
            const scene = chapter[saveFile.curent_storyLine_progress];
            if (scene) {
                const value = scene[buttonValue];
                if (value) {
                const button = document.querySelector('.Sh_' + buttonValue);
                if (button) {
                    button.innerHTML = value;
                    const buttonClickHandler = () => {
                    if (isCurrentlyPrinting) {
                        stopTyping = true
                        //slowTypingText(undefined,undefined, undefined, undefined, true);
                        //slowTypingText(undefined,undefined, undefined, undefined, true);
                        slowTypingText(current_storyLine['playerText'], '.main_section', undefined, undefined, true);
                        slowTypingText(current_title['title_story_' + current_title_progress], '.Quest_Title', undefined, undefined, true);
                        stopTyping = true
                    } else {
                        console.log('isCurrentlyPrinting',isCurrentlyPrinting)
                        console.log('buttonvalue',buttonValue);
                        console.log('typeof',typeof(buttonValue));
                        if (buttonValue == "1") {
                            console.log("test id=253 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].pop();
                            console.log("test id=254 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                        }
                        if (buttonValue == "2"){
                            console.log("test id=261 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].push(2);
                            Choices_calculator(saveFile);
                            console.log("test id=262 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            nextScene(saveFile);
                        }
                        if (buttonValue == "3"){
                            console.log("test id=263 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].push(3);
                            Choices_calculator(saveFile);
                            console.log("test id=264 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            nextScene(saveFile);
                        }
                        if (buttonValue == "4"){
                            console.log("test id=265 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].push(4);
                            Choices_calculator(saveFile);
                            console.log("test id=266 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            nextScene(saveFile);
                        }
                        if (buttonValue == "5"){
                            console.log("test id=267 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].push(5);
                            Choices_calculator(saveFile);
                            console.log("test id=268 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            nextScene(saveFile);
                        }
                        if (buttonValue == "6"){
                            console.log("test id=269 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].push(6);
                            Choices_calculator(saveFile);
                            console.log("test id=270 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            nextScene(saveFile);
                        }
                        if (buttonValue == "7") {
                            console.log("test id=255 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            saveFile.Choices_Made[saveFile.curent_chapter_progress].push(7);
                            console.log("test id=256 ", saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                            nextScene(saveFile);
                        } else {
                            console.log('else buttonvalue', buttonValue);
                            //previousScene(saveFile);
                            return;
                        }
                    }
                    };
                    
                    button.removeEventListener("click", buttonClickHandler); // Remove previous listener to avoid duplicates
                    button.addEventListener("click", buttonClickHandler);
                    
                }
                }
            }
            }
        }
    }
    

    function title_progress(current_title,current_title_progress) {
        let title_story = current_title['title_story_'+current_title_progress]
        slowTypingText(title_story,'.Quest_Title');         // Put the content on the left and the place where it needs to go on the right
        console.log('title_story',title_story)
        console.log('current_title',current_title);
    }
    function scene_progress(current_storyLine,curent_storyLine_progress,AmountOfButtonsForScene) {
        let title_scene = current_storyLine['sceneName']
        let scene_text = current_storyLine['playerText']
        slowTypingText(scene_text,'.main_section',undefined, 35);     // Put the content on the left and the place where it needs to go on the right + index + speed
        console.log('title_scene',title_scene)                          
        console.log('scene_text',scene_text)
        console.log('current_storyLine',current_storyLine);

    }
    function nextScene(saveFile){
        saveFile.curent_storyLine_progress++ ;
        Title.innerHTML = " ";
        main_section.innerHTML = " ";
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        console.log('before pressed story')
        story(saveFile);
        console.log('nextScene "after pressed story"');
    }
    function  previousScene(saveFile){
        saveFile.curent_storyLine_progress-- ;
        Title.innerHTML = " ";
        main_section.innerHTML = " ";
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        console.log('before pressed story')
        story(saveFile);
        console.log('previousScene "after pressed story"');
    }
    function nextchapter(saveFile){
        saveFile.curent_storyLine_progress++ ;
        saveFile.current_title_progress++ ;
        Title.innerHTML = " ";
        main_section.innerHTML = " ";
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        story(saveFile);
        console.log('nextChapter');
    }
    function  previouschapter(saveFile){
        saveFile.curent_storyLine_progress-- ;
        saveFile.current_title_progress-- ;
        Title.innerHTML = " ";
        main_section.innerHTML = " ";
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";
        Button_Choice2.innerHTML = " ";
        Button_Choice3.innerHTML = " ";
        Button_Choice4.innerHTML = " ";
        Button_Choice5.innerHTML = " ";
        Button_Choice6.innerHTML = " ";
        Button_Choice7.innerHTML = " ";
        story(saveFile);
        console.log('previousChapter');
    }
    
    function Choices_calculator(saveFile){      
        let chapter = saveFile.Choices_Possible[saveFile.curent_chapter_progress];
        let scene = chapter[saveFile.curent_storyLine_progress];
        let listOfChoiceNUM = saveFile.Choices_Made[saveFile.curent_chapter_progress].length;   // NUM of objects in array
        listOfChoiceNUM = listOfChoiceNUM -1 ;
        let ButtonPressed = saveFile.Choices_Made[saveFile.curent_chapter_progress][listOfChoiceNUM]; //    wich button was pressed (num)
        let value = scene[ButtonPressed];    // the final value
        console.log(character);
        console.log(typeof(listOfChoiceNUM));
        if (listOfChoiceNUM <= 8 ){ // only charachter creation
            if (listOfChoiceNUM == 2) {
                character.eye_Color = value;
            }if (listOfChoiceNUM == 3) {
                character.hair_style = value;
            }if (listOfChoiceNUM == 4) {
                character.skin_complexion = value;
            }if (listOfChoiceNUM == 5) {
                character.stature = value;
            }if (listOfChoiceNUM == 6) {
                character.attire = value;
            }if (listOfChoiceNUM == 7) {
                character.gender = value;
            }else {
                // Handle any other cases if needed
            }
            console.log(typeof(listOfChoiceNUM));
            console.log(typeof(2));
            console.log(listOfChoiceNUM + 2);
        }
        
        
    }

    return saveFile
}
//isCurrentlyPrinting = true

function slowTypingText(text, elementId, index = 0, speed = 200, printImmediately = false) {
    
    if (printImmediately) {
        ///isCurrentlyPrinting = true; // Set printing flag
        document.querySelector(elementId).innerText = ''; // Clear the element before printing
        // Immediately print the entire text
        ///document.querySelector(elementId).innerHTML = text.replace(/\n/g, '<br>'); // Replace newline characters with <br> tags
        // Reset printing flag
        //isCurrentlyPrinting = false;

        document.querySelector(elementId).innerText = text; // Set the text immediately
        return;
    }

    if (isCurrentlyPrinting) {
        // If currently printing, stop the ongoing printing process
        stopTyping = true;
    }

    isCurrentlyPrinting = true; // Set printing flag

    function printCharacter() {
        if (index < text.length) {
            // Print each character with a delay
            let char = text[index];
            if (char === " ") {
                // For space character, include it in the output string with an extra space
                document.querySelector(elementId).innerText += String.fromCharCode(160) ; // + (char1 - char1);
            } else {
                document.querySelector(elementId).innerText += char;
            }
            index++;
            setTimeout(printCharacter, speed);
        } else {
            // If all characters have been printed, reset printing flag
            isCurrentlyPrinting = false;
        }
    }

    // Start printing characters
    printCharacter();
}
// Set CSS to allow text wrapping
//document.querySelector('.main_section').style.whiteSpace = 'pre-wrap';
//document.querySelector('.main_section').style.wordWrap = 'break-word';






INIT()
function INIT(){
    
    if (typeOfGame == 'New_Game'){
        newGame();
    }
    else if(typeOfGame == 'Continue_Game'){
        LoadGame(last_loaded_game);
        console.log('load game!')
    }else{
        alert("Error: Invalid Game Type");
    }
    return saveFileNum
}