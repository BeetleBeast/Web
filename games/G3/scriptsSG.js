// hier meat de meeste zijn
// vanaf hier
// Initialize variables
let currentGameIndex = 1;

// Load game data when the page finishes loading
window.addEventListener("load", function () {
    gameLoad();
});

// Function to save game
function saveGame(index) {
    const gameIndex = index - 1; // Adjust index for zero-based arrays
    const gameNameElement = document.getElementById(`gameName${gameIndex + 1}`);

    // Update game name display
    if (gameNameElement) {
        gameNameElement.textContent = `Save ${currentGameIndex}`;
    }

    // Save game data to localStorage
    localStorage.setItem(`SaveFile${gameIndex}`, currentGameIndex);

    // Increment game index for the next save
    currentGameIndex++;

    console.log(`Saving game ${index}`);
}

// Function to load game
function loadGame(index) {
    // Implement game loading logic here
    console.log(`Loading game ${index}`);
}

// Function to delete game
function deleteGame(index) {
    const gameIndex = index - 1; // Adjust index for zero-based arrays

    // Clear game name display
    document.getElementById(`gameName${gameIndex + 1}`).textContent = '';

    // Remove game data from localStorage
    localStorage.removeItem(`SaveFile${gameIndex}`);

    console.log(`Deleting game ${index}`);

    // Check if there are no more saved games to remove stored index
    if (localStorage.length <= 2) {
        localStorage.removeItem('storedI');
    }
}

// Function to load game data from localStorage
function gameLoad() {
    for (let i = 0; i < 5; i++) { // Loop through expected save slots
        const saveData = localStorage.getItem(`SaveFile${i}`);
        const gameNameElement = document.getElementById(`gameName${i + 1}`);

        if (gameNameElement) {
            if (saveData !== null) {
                gameNameElement.textContent = `Save ${saveData}`;
            } else {
                gameNameElement.textContent = ''; // Clear empty slots
            }
        }
    }

    console.log('Game data loaded from localStorage');
}

// Function to navigate back to main menu
function goToMainMenu() {
    // Implement main menu navigation logic here
    console.log('Navigating to Main Menu');
}

// Function to navigate back within the game
function goBack() {
    // Implement back navigation logic here
    console.log('Navigating back');
}
