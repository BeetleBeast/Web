const Title = document.getElementsByClassName('Quest_Title');
const main_section = document.getElementsByClassName('main_section');
const main_content = document.getElementsByClassName('content');
const bar = document.getElementsByClassName('bar');
const extra = document.getElementsByClassName('extras');
const options = document.getElementsByClassName('options');


// if there is no saved files create a new dave file
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

    var saveFileNum = int(1);
    var saveFile = [];
    localStorage.setItem('saveFileG3 '+saveFileNum, saveFile);
    story();
    

}
// load the latest game                     unneeded????
function loadGame(latest){
    //idk
    console.log('load game');
    saveFileNum = latest;
    
    localStorage.getItem('saveFileG3 '+saveFileNum);
    
}
// save loaded game
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
    const story_01 = "hello why are you here"
    const title_story_01 = 'Into the new world'
}

options.addEventListener('click', function(){
    options.href="./settings.html";
})

save.addEventListener('click', function(){
    save.href="./Main\options_SG.html.html";
})


