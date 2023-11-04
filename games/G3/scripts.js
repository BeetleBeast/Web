const Title = document.querySelector('.Quest_Title');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const bar = document.querySelector('.bar');
const extra = document.querySelector('.extras');
const options = document.querySelector('.options');


// vue app
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
    

}
// load the latest game (goes to SG file to load and save the game)
function loadGame(latest){
    //idk
    console.log('load game');
    saveFileNum = latest;
    
    localStorage.getItem('saveFileG3 '+saveFileNum);
    
}
// save loaded game (goes to SG file to load and save the game)
function savefile(saveFile){
    //idk
    console.log('saving game');
    saveFileNum = prompt('number savefile');
    localStorage.setItem('saveFileG3 '+saveFileNum, saveFile);
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

}

options.addEventListener('click', function(){
    options.href="./settings.html";
})


// instead of local storage use json files
//by using stringify and parce