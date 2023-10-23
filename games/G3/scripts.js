const Title = document.getElementsByClassName('Quest_Title');
const main_section = document.getElementsByClassName('main_section');
const main_content = document.getElementsByClassName('content');
const bar = document.getElementsByClassName('bar');
const extra = document.getElementsByClassName('extras');


// if there is no saved files create a new dave file
onload = function() {startup(last_loaded_game)};

function startup(latest){

    if (latest == '') {
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

    savefileNum = 1;
    var saveFile[savefileNum] = [];
    localStorage.setItem('saveFile'+savefileNum, saveFile);
    story();
    

}
// load the latest game
function loadGame(latest){
    //idk
    console.log('load game');
    savefileNum = latest;
    
    localStorage.getItem('saveFile'+savefileNum);
    
}
// save loaded game
function savefile(saveFile){
    //idk
    console.log('save game');
    savefileNum = prompt('number savefile');
    localStorage.setItem('saveFile'+savefileNum, saveFile);
}

// initial latest loaded game
var last_loaded_game = '';
var savefileNum = 1;

function story(){
    // start of the story
    console.log("start story");
}

