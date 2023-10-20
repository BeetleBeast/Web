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
    console.log('new game')
}
// load the latest game
function loadGame(latest){
    //idk
}

var last_loaded_game = '';
