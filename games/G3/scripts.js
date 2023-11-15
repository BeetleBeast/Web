const Title = document.querySelector('.Quest_Title');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const bar = document.querySelector('.bar');
const extra = document.querySelector('.extras');
const options = document.querySelector('.options');

const fs = require('fs');

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
// if there is no saved files create a new save file
onload = function() {startup(last_loaded_game)};

function startup(latest){

    if (! latest) {
        newGame();
    }
    else {
        LoadGame(latest);
    }
}
// newGame makes the prep for a new game
function newGame(){
    //idk
    console.log('new game');

    var saveFileNum = 1;
    var saveFile = {};
    localStorage.setItem('saveFileG3 '+saveFileNum, saveFile);
    story();
    document.createDocumentFragment
    // TODO: set json file instead of localstorage (by using stringify and parce)

}
// load the latest game (goes to SG file to load and save the game)

function loadGame(latest){
    //idk
    console.log('load game');
    saveFileNum = latest;
    
    localStorage.getItem('saveFileG3 '+saveFileNum);

    last_loaded_game = ''
    return last_loaded_game
    // TODO: set json file instead of localstorage (by using stringify and parce)
}
// save loaded game (goes to SG file to load and save the game)
function savefile(saveFile){
    //idk
    console.log('saving game');
    saveFileNum = prompt('number savefile');
    // localStorage.setItem('saveFileG3 '+saveFileNum, saveFile); // FIXME: after json files made rzmove localstorage 
    var saveFileJSON = JSON.stringify(saveFile)
    fs.writeFile('saveFile'+saveFileNum+'.json', saveFileJSON, (err) => {
        if (err) throw err;
        console.log('JSON data is saved.');
       });
    // TODO: set json file instead of localstorage (by using stringify and parce)
}

// initial latest loaded game
var last_loaded_game = '';
var saveFileNum = 1;

function story(){
    // start of the story
    console.log("start story");



    // text dump
    const Intro = "hello world"
    const story_0 = "hello why are you here"
    const title_story_0 = 'Into the new world'

    // input in game

    Title.innerHTML = title_story_0;
    main_content.innerHTML = Intro;
    main_section.innerHTML = story_0;

    var saveFile = {"saveFileNum" : saveFileNum,"story_Number" : 0, "title_story" : title_story_0, "choices_Made" : []}
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