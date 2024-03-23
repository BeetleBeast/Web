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
            1 :  {"sceneName" : "charachterDefining-0", "playerText" : "Gazing into the rippling surface of a subterranean pool, you catch a glimpse of your own reflection amidst the murky depths. The dim light barely illuminates your features, leaving much to the imagination. Who is this figure staring back at you? The lines of gender blur in the wavering distortion, leaving only a sense of mystery in its wake. Lost in contemplation, you linger in the tranquil embrace of the cave, pondering the journey that lies ahead. With each ripple that disturbs your reflection, a surge of determination propels you forward, ready to embrace the enigma of your own existence. Let us now delve deeper into the story of this mysterious soul, as we unveil the intricate details of their identity amidst the shadows of the underworld."},
            2 :  {"sceneName" : "charachterDefining-1", "playerText" : "Their eyes shimmered with a color that held steadfast"},
            3 :  {"sceneName" : "charachterDefining-1", "playerText" : "Their hair framed their face in a style that could be described as"},
            4 :  {"sceneName" : "charachterDefining-2", "playerText" : ""},
            5 :  {"sceneName" : "charachterDefining-3", "playerText" : ""},
            6 :  {"sceneName" : "charachterDefining-4", "playerText" : ""},
            7 :  {"sceneName" : "charachterDefining-5", "playerText" : ""},
            /* ADD EXTRA SCENES */
        },
        "storyLine_nonlinear" :  {
            0 : {"sceneName" : "First_choice", "playerText" : "placeholder placeholder placeholder placeholder placeholder placeholder "},
            1 : {"sceneName" : "Second_choice", "playerText" : "placeholder placeholder placeholder placeholder placeholder placeholder "},
            /* ADD EXTRA nonlinear SCENES */
        },
        "Chapter_num" : {
            // chapter num : scene in chapter num
            0 : [0,1,2,3,4,5,6,7],
            /*  ADD EXTRA chapters and scene's in chapter*/
        },
        "Choices_Possible" : {
            //  chapter number : { scene number : { Button option : Text }}
            0 : {
                0 : { 7 : "Next"},       //FIXME change all options from 5 to 7
                1 : { 1 : "Previously", 7 : "Next",},
                2 : { 1 : "Previously", 2 : "piercing blue", 3 : "deep brown", 4 : "striking green", 5 : "captivating hazel", 6 : "intense grey", 7 : "Next",}
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
        },
        "current_title_progress" : 0,
        "title_progress" : { 
            0 : { "title_story_0" : 'Into the new world'},
            1 : {'title_story_1' : 'Lost in the forest'}, 
            2 : {'title_story_2' : 'Old cabbin'},
            /* ADD EXTRA TITLES */
        }
    }
    
    // localStorage.setItem('saveFileG3 '+saveFileNum, saveFile); // FIXME: after json files made remove localstorage 
    /*
    var saveFileJSON = JSON.stringify(saveFile)
    ('saveFile'+saveFileNum+'.json', saveFileJSON)
        .then(() => console.log('File saved.'))
        .catch(err => console.error('Error saving file:', err));
    */

    // start story
    story(saveFile);
    
    
}
// load the latest game (goes to SG file to load and save the game)
/*
function LoadGame(last_loaded_game){
    //idk
    console.log('load game');
    saveFileNum = last_loaded_game;

    fs.readFile(last_loaded_game, 'utf8', (err, data) => {
        if (err) throw err;
            
        let Player_ = JSON.parse(data);
        Player_.Player.age = 22;
        console.log(Player_.Player.age)
                
    // now save the updated person object back to the JSON file
    // ...
    });
    
   

    last_loaded_game = ''
    return last_loaded_game
    // TODO: set json file instead of localstorage (by using stringify and parce)
}
*/



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

    character = new Player({
        name: 'nana',
        race: 'human',
        gender: 'Male',
        age: '20',
        profession: 'protagonist',
        level: '0',
        strength: '0',
        intelligence: '0',
        charisma: '0',
        agility: '0',
        luck: '0',
        health: '0',
        maxHealth: '100'
    })
}

function story(saveFile){
    console.log("start story");
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
                slowTypingText(current_storyLine['playerText'], '.main_section',undefined,undefined,true)
                slowTypingText(current_title['title_story_'+current_title_progress], '.main_section',undefined,undefined,true)
            }else{
                console.log("test id=257 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                saveFile.Choices_Made[saveFile.curent_chapter_progress].pop();
                console.log("test id=258 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                previousScene(saveFile);
            }
        })
        Button7.addEventListener("click", function() {
            if(isCurrentlyPrinting){
                slowTypingText(current_storyLine['playerText'], '.main_section',undefined,undefined,true)
                slowTypingText(current_title['title_story_'+current_title_progress], '.main_section',undefined,undefined,true)
            }else{
                console.log("test id=259 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                saveFile.Choices_Made[saveFile.curent_chapter_progress].push(5);
                console.log("test id=260 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                nextScene(saveFile);
                
            }
        })

    }else{
        ButtonPressed(saveFile)
    }
    
    /*
    NOTES
            "Chapter_num" : {
            0 : [0,1],  // chapter num : scene in chapter num
        },
        "Choices_Made" : {

         0 : [], //  chapter number : string of Button NUM Choices made // EXAMPLE 1,5,3 first CH, fith CH , third CH
        },
    */

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
    /* else {
        savefileId.removeEventListener("click", savefileId.addEventListener("click"));
    }
    */

    

    /*
    NOTES
    saveFile = {
        "saveFileNumber" : saveFileNum,
        "curent_storyLine_progress" : 0,
        "storyLine_progress" : {
            0 :  {"sceneName": "Start",
    */
       /*
        "AmountOfButtonsForSceneDefault" : 2,
        "AmountOfButtonsForScene" : {
            // scene number : amount of buttons in that scene
            0: 1, 
            1: 2,
        },
        "Choices_Possible" : {
        //  chapter number : { scene number : { Button option : Text }}
        0 : {
            0 : { 7 : "Next"},       //FIXME change all options from 5 to 7
            1 : { 1 : "Previously", 7 : "Next",},
            2 : { 1 : "Previously", 2 : "piercing blue", 3 : "deep brown", 4 : "striking green", 5 : "captivating hazel", 6 : "intense grey", 7 : "Next",}
        },

        },
    */

    function ButtonPressed(saveFile){
        if (saveFile.AmountOfButtonsForScene[curent_storyLine_progress] == 1){
            let Button7 = Button_Choice7;
            Button7.innerHTML = 'Next';
            Button7.addEventListener("click", function() {
                if(isCurrentlyPrinting){
                    slowTypingText(current_storyLine['playerText'], '.main_section',undefined,undefined,true)
                    slowTypingText(current_title['title_story_'+current_title_progress], '.main_section',undefined,undefined,true)
                }else{
                    console.log("test id=255 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                    saveFile.Choices_Made[saveFile.curent_chapter_progress].push(5);
                    console.log("test id=256 ",saveFile.Choices_Made[saveFile.curent_chapter_progress]);
                    nextScene(saveFile);
                    
                }
            })
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
        Button_Choice5.innerHTML = " ";
        story(saveFile);
        console.log('nextScene');
    }
    function  previousScene(saveFile){
        saveFile.curent_storyLine_progress-- ;
        Title.innerHTML = " ";
        main_section.innerHTML = " ";
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";  
        Button_Choice5.innerHTML = " ";
        story(saveFile);
        console.log('previousScene');
    }
    function nextchapter(saveFile){
        saveFile.curent_storyLine_progress++ ;
        saveFile.current_title_progress++ ;
        Title.innerHTML = " ";
        main_section.innerHTML = " ";
        choices_section_title.innerHTML = " ";
        Button_Choice1.innerHTML = " ";  
        Button_Choice5.innerHTML = " ";
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
        Button_Choice5.innerHTML = " ";
        story(saveFile);
        console.log('previousChapter');
    }


    return saveFile
}

function slowTypingText(text, elementId, index = 0, speed = 200, printImmediately = false) {
    if (printImmediately) {
        document.querySelector(elementId).innerText = text;
        isCurrentlyPrinting = false;
        return;
    }
    if (index < text.length) {
        document.querySelector(elementId).innerText += text[index];
        index++;
        // replace it with a space character
        if (text[index - 1] === " ") {
            isCurrentlyPrinting = true;
            setTimeout(() => {
                document.querySelector(elementId).innerText += " "+text[index];
                    index += 1;
                slowTypingText(text, elementId, index, speed);
            }, speed);
        } else {
            setTimeout(() => slowTypingText(text, elementId, index, speed), speed);
            isCurrentlyPrinting = true;
        }
    }
    if (index == text.length){
        isCurrentlyPrinting = false;
    }
    return isCurrentlyPrinting;
}

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