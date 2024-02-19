const Title = document.querySelector('.Quest_Title');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const bar = document.querySelector('.bar');
const extra = document.querySelector('.extras');
const options = document.querySelector('.options');

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


// newGame makes the prep for a new game
function newGame(saveFileNum){
    //idk
    console.log('new game');

    let saveFile = {
        "saveFileNumber" : saveFileNum,
        "storyLine_Number" : 0,
        "Player_character" : Player,
        "current_title_progress" : 0,
        "title_progress" : { 
            0 : { "title_story_0" : 'Into the new world'},
            1 : {'title_story_1' : 'Lost in the forest'}, 
            2 : {'title_story_2' : 'Old cabbin'}
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
    // start of the story
    console.log("start story");
    // text dump
    const Intro = "hello world"
    const story_0 = "hello why are you here"
    let title_story_0 = 'Into the new world'
    let title_story_1 = 'Lost in the forest'
    let title_story_2 =  'Old cabbin'
    // input in game
    /*
    let saveFile = {
        "saveFileNumber" : saveFileNum,
        "storyLine_Number" : 0,
        "Player_character" : Player,
        "title_progress" : {
            "title_story_0::Into the new world" : 0,
            'title_story_1::Lost in ghe forest' : 0,
            'title_story_2::Old cabbin' : 0
        }
    }
    */
    console.log('title_progress',saveFile.title_progress)
    console.log('current_title_progress',saveFile.current_title_progress)
    let current_title_progress = saveFile.current_title_progress        // make a var van dit 
    let current_title = saveFile.title_progress[current_title_progress]
    title_progress(current_title,current_title_progress)

function title_progress(current_title,current_title_progress) {
    let title_story = current_title['title_story_'+current_title_progress]
    slowTypingText(title_story,'.Quest_Title');
    console.log('title_story',title_story)
    console.log('current_title',current_title);
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