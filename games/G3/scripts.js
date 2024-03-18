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

var saveFileNum = 0;
var last_loaded_game = '';
var typeOfGame = 'New_Game';

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
        "storyLine_progress" : {
            0 :  {"sceneName": "Start", "playerText": "In the heart of a bustling metropolis lies the foundation of a towering ambition. Welcome to Tower's Edge, where strategic minds converge to erect the mightiest structures the skyline has ever witnessed. Assemble your team, fortify your defenses, and rise above the competition in this thrilling test of engineering prowess and tactical mastery. Will you reach new heights or crumble beneath the weight of your rivals' ascent? The choice is yours in Tower's Edge."},
            1 :  {"sceneName": "First_step", "playerText": "Your first step in Tower's Edge begins with a single blueprint and a vision to reach the heavens. Survey the landscape, choose your plot wisely, and lay the cornerstone of your empire. As construction commences, every decision shapes the fate of your tower, from selecting materials to orchestrating the placement of each floor. With each level you ascend, challenges will emerge, but with cunning strategy and meticulous planning, you'll forge your path towards architectural supremacy. Welcome to the foundation of your legacy in Tower's Edge."},
            /* ADD EXTRA SCENES */
        },
        "Player_character" : Player,
        "Buttons_section_title" : {0 : " ",},
        "AmountOfButtonsForSceneDefault" : 2,
        "AmountOfButtonsForScene" : {
            0: 1, // scene number : amount of buttons in that scene
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
// save loaded game (goes to SG file to load and save the game)
function savefile(saveFile){
    //idk
    console.log('saving game');
    saveFileNum = prompt('Save file number')
    //  saves file 
    let saveFileJSON = JSON.stringify(saveFile);
        localStorage.setItem('saveFile'+saveFileNum,saveFileJSON)
    return saveFileNum
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

    if (saveFile.AmountOfButtonsForScene[curent_storyLine_progress] == 1){
        let Button = Button_Choice5;
        Button.innerHTML = 'Next';
        Button.addEventListener("click", function() {
            nextScene(saveFile);
        })
    }
    if (saveFile.AmountOfButtonsForScene[curent_storyLine_progress] == 2) {
        let Button1 = Button_Choice1;
        let Button2 = Button_Choice5;
        Button2.innerHTML = 'Next';  
        Button1.innerHTML = 'Previously';
        Button1.addEventListener("click", function(){
            previousScene(saveFile);
        })
        Button2.addEventListener("click", function() {
            nextScene(saveFile);
        })
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
    slowTypingText(scene_text,'.main_section', 0, 35);     // Put the content on the left and the place where it needs to go on the right + index + speed
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
function slowTypingText(text, elementId, index = 0, speed = 200) {
    if (index < text.length) {
        document.querySelector(elementId).innerText += text[index];
        index += 1; // update index for the next character

        // If the current character is a space, replace it with a space character
        if (text[index - 1] === " ") {
            setTimeout(() => {
                document.querySelector(elementId).innerText += " "+text[index];
                    index += 1;
                slowTypingText(text, elementId, index, speed);
            }, speed);
        } else {
            setTimeout(() => slowTypingText(text, elementId, index, speed), speed);
        }
    }
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