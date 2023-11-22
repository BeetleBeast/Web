const Title = document.querySelector('.Quest_Title');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const bar = document.querySelector('.bar');
const extra = document.querySelector('.extras');
const options = document.querySelector('.options');

const fs = require('fs');
import * as fs from 'node:fs/promises';
// vue app
/*
new Vue({
    el: '#app',
    data: {
        questTitle: 'Some Quest Title',
        mainInfo: 'Some main information about the quest.',
        multichoice: 'You have multiple choices',
        choice_1: ' choice',
        choice_2: ' choice',
        choice_3: ' choice',
        choice_4: ' choice',
        choice_5: ' choice'
    },
    mounted() {
        // Your code to manipulate the content-canvas element
    }
});
*/

// initial latest loaded game
    if (! saveFileNum){
        var saveFileNum = '1';
    }else if(saveFileNum){
        console.log('Initial function executed.');
        var last_loaded_game = 'saveFile'+saveFileNum+'.json';
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
// newGame makes the prep for a new game
function newGame(){
    //idk
    console.log('new game');

    var saveFileNum = 1;
    var saveFile = {"saveFileNum" : saveFileNum,"story_Number" : 0, "title_story" : title_story_0, "choices_Made" : []};
    var saveFileNum = prompt('number savefile');
    // localStorage.setItem('saveFileG3 '+saveFileNum, saveFile); // FIXME: after json files made rzmove localstorage 
    var saveFileJSON = JSON.stringify(saveFile)
    fs.writeFile('saveFile'+saveFileNum+'.json', saveFileJSON, (err) => {
        if (err) throw err;
        console.log('JSON data is saved.');
       });

    // start story
    story();
    

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
    //  saves file
    fs.readFile('person.json', 'utf8', (err, data) => {
    if (err) throw err;
        
    let person = JSON.parse(data);
    person.age = 31; // update the age
        
    // now save the updated person object back to the JSON file
    // ...
    });
    // TODO: set json file instead of localstorage (by using stringify and parce)
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
}
const character = new Player({
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
function story(){
    // start of the story
    console.log("start story");

    




    // text dump
    const Intro = "hello world"
    const story_0 = "hello why are you here"
    const title_story_0 = 'Into the new world'
    const title_story_1 = 'Lost in ghe forest'
    const title_story_2 =  'Old cabbin'

    // input in game

    Title.innerHTML = title_story_0;
    main_content.innerHTML = Intro;
    main_section.innerHTML = story_0;

    var saveFile = {"saveFileNumber" : saveFileNum,"storyLine_Number" : 0, "Player_character" : Player, "choices_Made" : {title_story_0:0,title_story_1:0,title_story_2:0}}
    return saveFile
}

document.querySelector('.Open-more').addEventListener('click', function() {
    var open_more = true
    if (open_more == true){
        document.querySelector('.Side-extra').style.opacity = 0.5;
        console.log('open extra side');
        open_more = false;
        return open_more;
    }else if(open_more == false){
        document.querySelector('.Side-extra').style.opacity = 0;
        console.log('close extra side');
        open_more = true;
        return open_more;
    }
});
// instead of local storage use json files
//by using stringify and parce