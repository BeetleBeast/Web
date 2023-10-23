/* if there is no saved files create a new dave file
*/

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
    story()
    

}
// load the latest game
function loadGame(latest){
    //idk
    console.log('load game');
    
    localStorage.getItem('saveFile'+savefileNum)
    
}

// initial latest loaded game



var last_loaded_game = '';
var savefileNum = 1;

function story(){
    // start of the story
    console.log("start story");
}

