/* if there is no saved files create a new dave file
*/

onload = function() {startup(lastLoadedGame)};

function startup(latest_loaded_game):

    if (1+1 == 2) {
        window.close();   
    }
    if (confirm("Close Window?")) {
        window.close();
      }
// newGame makes the prep for a new game
function newGame():
    //idk

let lastLoadedGame = '0';
