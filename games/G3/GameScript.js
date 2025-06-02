const Title = document.querySelector('.Quest_Title');
const app = document.querySelector('.app');
const main_section = document.querySelector('.main_section');
const main_content = document.querySelector('.content-canvas');
const choices_section_title = document.querySelector('.choices_section_title');
const choices_section = document.querySelectorAll('.choices_section');
const startScreen = document.querySelector('.startParent');
const Button_Choice1 = document.querySelector('.Sh_1');
const Button_Choice2 = document.querySelector('.Sh_2');
const Button_Choice3 = document.querySelector('.Sh_3');
const Button_Choice4 = document.querySelector('.Sh_4');
const Button_Choice5 = document.querySelector('.Sh_5');
const Button_Choice6 = document.querySelector('.Sh_6');
const Button_Choice7 = document.querySelector('.Sh_7');
const RestartGame = document.getElementById('Reset');
const inventoryItem = document.querySelector('.inventoryItem');
const Side_Menu = document.querySelector('.Side-Menu_Class');   //  influences  (Bar)
const Side_Menu2 = document.querySelector('.Side-Menu2');   //  Character list  (in words)
const Side_Menu3 = document.querySelector('.Side-Menu3');   //  effects    (Debuff)
const Side_Menu4 = document.querySelector('.Side-Menu4');   //  influences  (Bar)
const Side_Menu5 = document.querySelector('.Side-Menu5');   //  Extra buttons
const Side_MenuClass = document.querySelector('.InfluencesAll')
const PainBar = document.querySelector('.Pain');    //  width: 1%;
const FatigueBar = document.querySelector('.Fatigue');  //  width: 1%;
const FearBar = document.querySelector('.Fear');    //  width: 1%;
const StressBar = document.querySelector('.Stress');    //  width: 1%;
const TraumaBar = document.querySelector('.Trauma');    //  width: 1%;
const AddictionBar = document.querySelector('.Addiction');  //  width: 1%;
const SicknessBar = document.querySelector('.Sickness');    //  width: 1%;
const BleedBar = document.querySelector('.Bleed');  //  width: 1%;
const ControlBar = document.querySelector('.Control');  //  width: 100%;
const ControlTitle = document.querySelector('.ControlTitle');
const load_S = document.querySelector('.settings_Load');
const Side_Influences_Title = document.querySelector('.Side-Influences_Title');
const Side_Menu_ColapseButton = document.getElementById('Side-Menu_ColapseButton');


var currentdate = new Date();
var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + "|" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
let valueSTRING = [];   // Initialize the text of the player character set feature 
let valueCOLOR = [];    // Initialize the color of the player character set feature 
let isCurrentlyPrinting = {}; // set true if is printing and false if not
let stopTyping = false;
let previousAmounts = [];
let ResetFile = false;// if true can't save latest as session is reseting
let CurrentPageNumber = 1;
let currentTypingToken = {};

// Function to start up the game
window.onload = function () {
    startup()
    LoadedSaves()
    setEventListener()
};


// Function to start up or load the game
function startup(userConfirmed) {
    userConfirmed === 1 ? console.log('Continue story') : console.log('start new story');
    Title.innerHTML = 'Gatcha tower';
    startScreen.dataset.visible = 'true';
    Side_Menu4.dataset.visible = 'false';
    let SaveForest = JSON.parse(localStorage.getItem('SaveForest')|| '{}');
    let TempLatestSave = JSON.parse(sessionStorage.getItem('TempLatestSave'));
    //load_S.dataset.visible = 'false';
    if ( TempLatestSave == null) {
        if (userConfirmed === 1) {
            console.log("User confirmed to load last save.");
            startScreen.dataset.visible = 'false';
            //load_S.dataset.visible = 'true';
            loadLatestGame(0);
        }else if(userConfirmed === 2){
            console.log("User declined to load last save. Starting a new game.");
            startScreen.dataset.visible = 'false';
            newGame();
        }
    }else{
        console.log('checking last Session')
        loadLatestGame(1)
    }
}
function LoadedSaves() {
    const saveForestString = localStorage.getItem('SaveForest');
    let lastbigesttime = 0;
    let LatestSpan = null;
    if (!saveForestString) console.log('SaveForest does not exist');
    //let saveData = {}; // Initialize saveData object
    let SaveForest = JSON.parse(saveForestString);
    for (let i = 0; i < 6; i++) {
        const sectionSpanName = document.getElementById(`gameName${i}`); // 0 - 5 
        let saveData = SaveForest[`section${i}`];
        if (i > 0 && SaveForest[`section${i}`]) {
            document.querySelector(`.Section${i}_load_game`).disabled = false;
            document.querySelector(`.Section${i}_load_game`).classList.remove('disable');
            sectionSpanName.textContent = `${saveData['name']} | ${saveData['LastSaved']}`;
            console.log('Game data loaded from localStorage('+i+').');
            
            let formattedTime = saveData['LastSaved'].replace(/[/:| ]/g, '');
            let timeAsNumber = parseInt(formattedTime);

            sectionSpanName.style.color = saveData['name'] === "Main" ? 'yellow' : 'purple';
            
            if (timeAsNumber >= lastbigesttime) {
                lastbigesttime = timeAsNumber;
                LatestSpan = sectionSpanName;
            }
            
            

        } else {
            sectionSpanName.innerHTML = ''; // Clear empty slots
            document.querySelector(`.Section${i}_load_game`).disabled = true;
            document.querySelector(`.Section${i}_load_game`).classList.add('disable');
            console.log('No save for '+i+' available');
        }
    }
    if ( LatestSpan) LatestSpan.style.color = 'green';
    
}
function setEventListener(){
    // Add event listener for Side Menu Colapse Button click
    Side_Menu_ColapseButton.addEventListener("click", Side_Menu_ColapseButtonClickHandler);
    Side_Menu_ColapseButton.setAttribute('data-listener-added', 'true');

    // Add event listener for RestartGame click
    RestartGame.addEventListener("click", ResetFileClickHandler);
    RestartGame.setAttribute('data-listener-added', 'true');

    // Remove event listener for RestartGame click
    RestartGame.removeEventListener("click", ResetFileClickHandler);
    RestartGame.removeAttribute('data-listener-added');
}

// Function to load the game from localStorage
function loadLatestGame(userConfirmed) {
    startScreen.dataset.visible = 'false';// 0 = continue == local  1 = load == session
    try {
        let SaveForest = JSON.parse(localStorage.getItem('SaveForest') || '{}');
        let TempLatestSave = JSON.parse(sessionStorage.getItem('TempLatestSave') || '{}');
        let saveData;
        if(userConfirmed == 0){
            saveData = SaveForest['section0'];
        }else if(userConfirmed == 1){
            saveData = TempLatestSave;
        }
        console.log('Loaded save file:', saveData);
        clearButtonContent();
        ResetEffectBarToDefault(saveData);
        // Call the mergeDefaultProperties function to ensure saveData has all expected properties
        mergeDefaultProperties(saveData);
        Render_Scene(saveData, true);
    } catch (error) {
        if(error == TypeError){
            console.error('Error in SaveData:', error);
            Render_Scene(saveData, true);
        }else{
            console.error('Unkown Error by parsing SaveForest:', error);
            newGame(); // Fallback to starting a new game if loading fails
        }
        
        
    }
}

// newGame makes the prep for a new game
function newGame(){
    console.log('new game');
    try{saveData.Player_character = Player;}
    catch(error){console.log('Can\'t set player because ',error);}
    let SaveForest = JSON.parse(localStorage.getItem('SaveForest')|| '{}');
    if (!SaveForest || Object.keys(SaveForest).length === 0) {
        SaveForest = {
            'section0' : {},
            DefaultSaveData : saveData
        };
    }
    else {
        SaveForest.DefaultSaveData = saveData;
    }
    
    //console.log('SaveForest:',JSON.parse(SaveForest))
    localStorage.setItem('SaveForest', JSON.stringify(SaveForest));
    sessionStorage.setItem('TempLatestSave', JSON.stringify(saveData));

    // start story
    ResetEffectBarToDefault(saveData)
    Render_Scene(saveData, true);

}


class Player {
    constructor({ Name, Race, Gender, Age, Profession, Level, Strength, Intelligence, Charisma, Agility, Luck, Health, MaxHealth }) {
        this.Name = Name;
        this.Race = Race;
        this.Gender = Gender;
        this.Age = Age;
        this.Profession = Profession;
        this.Level = Level;
        this.Strength = Strength;
        this.Intelligence = Intelligence;
        this.Charisma = Charisma;
        this.Agility = Agility;
        this.Luck = Luck;
        this.Health = Health;
        this.MaxHealth = MaxHealth;
        this.Debuff_Effects = {};
        this.Buff_Effects = {};
    }
    attack(enemy) {
        // Perform attack logic here
        console.log(`${this.Name} attacks ${enemy}!`);
    }
    getDamage(amount){
        this.Health -= amount;
        if (this.Health <= 0) {
            this.Health = 0;
            console.log(`${this.Name} is dead.`);
            
        }
        console.log(`${this.Name} gets ${amount} damage.`);
    }
    heal(amount) {
        // Perform healing logic here
        this.Health += amount;
        if (this.Health > this.MaxHealth) {
            this.Health = this.MaxHealth;
        }
        console.log(`${this.Name} heals for ${amount} health.`);
    }
    levelUp() {
        // Perform level up logic here
        this.Level++;
        console.log(`${this.Name} levels up to level ${this.Level}!`);
    }
    applyDebuff(effect, amount, saveData, elementId) {
        if(previousAmounts[effect] >= 100){
            console.log('applydebuff amount is over 100')
            this.updateDebuff(effect, 100);
            console.log(`Applying ${100} on debuff: ${effect}`);
            // Update UI element if provided
            if (elementId) {
                const element = document.querySelector(elementId);
                if (element) {
                    this.updateUI(effect, 100, saveData, element);
                }
            }
        }else{
            console.log('UNDER 100 id=155')
            // Apply debuff effect to the player
            this.updateDebuff(effect, amount);
            // If the debuff effect already exists, update its amount
            if (!saveData.Debuff_Effects[effect]) {
                saveData.Debuff_Effects[effect] = { Amount: amount };
            } else {
                saveData.Debuff_Effects[effect].Amount = amount;
            }
            console.log(`Applying ${amount} on debuff: ${effect}`);
            
            // Update UI element if provided
            if (elementId) {
                const element = document.querySelector(elementId);
                if (element) {
                    this.updateUI(effect, amount, saveData, element);
                }
            }
        }
    }
    updateDebuff(effect, amount) {
        // If the debuff effect already exists, update its amount
        if (!this.Debuff_Effects[effect]) {
            this.Debuff_Effects[effect] = { Amount: amount };
        } else {
            this.Debuff_Effects[effect].Amount = amount;
        }
    }
    // TODO fix updateUI it breaks see     function DeBuffParentFunction(effect, amount, saveData, elementId){character.applyDebuff(effect, amount, saveData, elementId)} in story.js
    updateUI(effect, amount, saveData, element) {
        console.log('updateUI is activated id=156')
        // Update UI text to reflect debuff description if available
        if (previousAmounts[effect] >= 100) {
            console.log('updateUI: amount is over 100');
            const existingContent = Side_Menu3.innerHTML.trim();
            const maxEffectDescription = saveData.Debuff_Effects['MAXeffect'].Description;
            
            if (existingContent.includes(maxEffectDescription)) {
                // Update existing description if it's already present
                Side_Menu3.innerHTML = `${maxEffectDescription} ${effect}.`;
            } else {
                // Append a new description with a line break if needed
                let newDescription = `${maxEffectDescription} ${effect}.`;
                if (existingContent !== '') {
                    Side_Menu3.innerHTML += '<br>';
                }
                Side_Menu3.innerHTML += newDescription;
            }
        }else{
            console.log('updateUI amount is under 100 id=157')
            const effectDescription = saveData.Debuff_Effects[effect].Description;
            const newDescription = `${effectDescription}, ${amount}`;
            
            // Calculate the new amount based on the previous amount for this effect
            const previousAmount = previousAmounts[effect] || 0;
            const newAmount = previousAmount + amount;
            previousAmounts[effect] = newAmount;
            const newDescriptionWithPreviousAmount = `${effectDescription}, ${newAmount}`;
            const Side_Menu3 = document.getElementById('Side-Menu3');
            const existingContent = Side_Menu3.innerHTML.trim();

            // Construct a regular expression to match the existing description pattern
            const regex = new RegExp(`${effectDescription}, \\d+`);
            
            if (existingContent.includes(effectDescription)) {
                // Replace the existing content with the updated description containing the new amount
                const updatedContent = existingContent.replace(regex, newDescriptionWithPreviousAmount);
                Side_Menu3.innerHTML = updatedContent;
            } else {
                // Append a line break and the new description if it's not already present
                if (existingContent !== '') {
                    Side_Menu3.innerHTML += '<br>';
                }
                Side_Menu3.innerHTML += newDescription;
            }
        }
    }
    Resurrect(){
        this.Level = -2;
        this.Health = this.MaxHealth;
    }
    rested(amount) {
        // Decrease specific debuff effects when the player rests
        const debuffsToDecrease = [2, 3, 9, 10, 20, 21];
        debuffsToDecrease.forEach(debuffId => {
            if (this.Debuff_Effects[debuffId]) {
                // Decrease the debuff effect
                this.Debuff_Effects[debuffId] -= amount;

                // Check if the debuff effect is completely relieved
                if (this.Debuff_Effects[debuffId] <= 0) {
                    console.log(`${this.Name} has completely relieved the debuff with ID ${debuffId}`);
                    delete this.Debuff_Effects[debuffId]; // Remove the debuff from the debuffEffects object
                } else {
                    console.log(`${this.Name} partially relieves the debuff with ID ${debuffId}`);
                }
            }
        });
    }
}

let character = new Player({
    Level: 0,
    Strength: 0,
    Intelligence: 0,
    Charisma: 0,
    Agility: 0,
    Luck: 0,
    Health: 80,
    MaxHealth: 100,
});

/*
    EXAMPLE 

    character.attack("monster");
    character.heal(20);
    character.levelUp();
    character.rested(amount);
*/



// Function to toggle visibility of the inventory
function toggleInventory() {
    const inventory = document.getElementById('inventory');
    const toggleInventoryText = document.getElementById('toggleInventoryText');
    if (!saveData.IsDead) {
        inventory.style.display = (inventory.style.display === 'none') ? 'block' : 'none';
    } else {
        console.log('Player is dead, inventory cannot be opened.');
    }
}

// Event listener for key press (I key)
handleKeyPress();
function handleKeyPress() {
    const Key = saveData.Settings.Controls.Inventory
    document.addEventListener('keydown', function(event) {
        if (event.key === Key.toLowerCase() || event.key === Key.toUpperCase()) {
            toggleInventory();
        }
    });
}
function openSettings(number) {
    let parent; // Declare parent variable outside the switch statement
    switch (number) {
        case 1:
            parent = document.querySelector('.parentLoad');
            break;
        case 2:
            parent = document.querySelector('.parentGaPla');
            break;
        case 3:
            parent = document.querySelector('.parentGrafic');
            break;
        case 4:
            parent = document.querySelector('.parentMore');
            break;
        default:
            return; // Handle default case or unexpected values
    }
    if (!parent) {
        console.error('Parent element not found.');
        return;
    }
    const isVisible = parent.dataset.visible === 'true';
    parent.classList.toggle('visible');
    parent.dataset.visible = !isVisible;
}
function ResetFileClickHandler(){
    console.log('Resetting File?')
    let confirmed = confirm('Do you want to reset the game( all unsaved actions will be lost! ).');
    if (confirmed){
        sessionStorage.removeItem('TempLatestSave');
        console.log('Removed LatestsaveFile! id=809')
        ResetFile = true;
        window.location.reload();
    }else{
        return;
    }
}
// Function to clear button content
function clearButtonContent() {
    choices_section_title.innerHTML = "";
    [Button_Choice1, Button_Choice2, Button_Choice3, Button_Choice4, Button_Choice5, Button_Choice6, Button_Choice7].forEach(button => {
        button.innerHTML = "";
        button.style.display = 'none';
    });
}
function ResetEffectBarToDefault(saveData) {
    const barIds = ['Pain', 'Fatigue', 'Fear', 'Stress', 'Trauma', 'Addiction', 'Sickness', 'Bleed'];
    barIds.forEach(Bar => {
        DisplayDebuffTextWithColors(saveData, Bar, 0); // Display All bar text with color
    });
    DisplayDebuffTextWithColors(saveData, 'Control', 70); // Display Controlbar text with color
    saveData.Debuff_SpashText_Final = Side_Menu4.innerHTML; // Save the final text of the debuff splash text

}
function DisplayDebuffTextWithColors(saveData, EffectId, BarLength) {
    const titleElement = document.querySelector(`.${EffectId}Title`);
    const EffectBar = document.querySelector(`.${EffectId}`);
    const index = Math.floor(BarLength / (8 + 1/3));
    if (EffectBar && BarLength < 100) {
        EffectBar.style.width = BarLength + '%';
        // EffectBar.dataset.visible = 'true';
    }
    // if ( BarLength == 0) EffectBar.dataset.visible = 'false';
    if (titleElement) {
        titleElement.innerHTML = ''; // Clear previous content
        if (index === 12) {
            titleElement.innerHTML = EffectId + ': ' + saveData.Debuff_SpashText[EffectId].Text[11];
            titleElement.style.color = saveData.Debuff_SpashText[EffectId].color[11];
           // EffectId.dataset.visible = 'true';
        }else if (index > 0 && index < 12) {
            titleElement.innerHTML = EffectId + ': ' + saveData.Debuff_SpashText[EffectId].Text[index - 1];
            titleElement.style.color = saveData.Debuff_SpashText[EffectId].color[index - 1];
         //   EffectId.dataset.visible = 'true';
        }else if (index === 0) {
            titleElement.innerHTML = EffectId + ': ' + saveData.Debuff_SpashText[EffectId].Text[0];
            titleElement.style.color = saveData.Debuff_SpashText[EffectId].color[0];
            //EffectId.dataset.visible = 'false';
        }
    }
    saveData.Debuff_SpashText_Final = Side_Menu4.innerHTML; // Save the final text of the debuff splash text
}
// Utility: Formats the text for spaces and breaks (~ = double break)
function formatText(text) {
    let formatted = '';
    let spaceIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char === ' ') {
            formatted += ' ';
            spaceIndex++;
        } else if (spaceIndex >= 20 && (char === '.' || char === ',') && text[i + 1]) {
            formatted += char + '<br>';
            spaceIndex = 0;
        } else if (char === '~') {
            formatted += '<br><br>';
            spaceIndex = 0;
        } else {
            formatted += char;
        }
    }
    return formatted;
}
// utility:Set element Color
function setElementColor(element, elementId, defaultColor) {
    element.style.color = saveData.IsDead && elementId !== '.Quest_Title' ? 'red' : defaultColor;
}
// utility: print immediately
async function handlePrintImmediately(element, textBlock, elementId) {
    element.innerHTML = formatText(textBlock);
    isCurrentlyPrinting[elementId] = false;
}
// utility: Print Charackters Slowly
async function PrintCharSlow({ textBlock, elementId, element, speed, cursor, currentTypingToken, token, output = ''}) {
    const formattedText = formatText(textBlock);
    for (let i = 0; i < formattedText.length; i++) {
        if (currentTypingToken[elementId] !== token || stopTyping) {
            // If player clicked while printing
            handlePrintImmediately( element, textBlock );
            return;
        }
        let char = formattedText[i];
        output += char;
        element.innerHTML = output;
        element.appendChild(cursor); // Append cursor after each character
        // add a longer pause after dot or comma
        const delayDuration = (char === '.' || char === ',') ? 400 : speed;
        // typingSound.currentTime = 0; // Reset sound to start
        // typingSound.play().catch(() => {}); // Play typing sound
        await new Promise(resolve => setTimeout(resolve, delayDuration)); // Delay next letter
    }
}
// utility: word coloring
function applyWordColoring(element, textBlock, textAndColorArray) {
    let remainingText = textBlock;
    for (let i = 0; i < textAndColorArray.word.length; i++) {
        const word = textAndColorArray.word[i];
        const color = textAndColorArray.color[i];
        const index = remainingText.indexOf(word);
        if (index !== -1) {
            element.append(document.createTextNode(remainingText.substring(0, index)));
            const span = document.createElement("span");
            span.textContent = word;
            span.style.color = color;
            element.append(span);
            remainingText = remainingText.substring(index + word.length);
        }
    }
    if (remainingText.length > 0) {
        element.append(document.createTextNode(remainingText));
    }
}
// utility: delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// utility: clear Cursor
function clearCursor() {
    document.querySelectorAll('.fake-cursor').forEach(c => c.remove());
}
// Utility: Create a fake blinking cursor
function createFakeCursor() {
    const cursor = document.createElement('span');
    cursor.classList.add('fake-cursor');
    cursor.innerHTML = '|';
    /*
    if (!document.getElementById('fake-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'fake-cursor-style';
        style.textContent = `
            .fake-cursor {
                display: inline-block;
                animation: blink 1s step-start infinite;
                color: inherit;
            }
            @keyframes blink {
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    */
    return cursor;
}
// Core Function to simulate slow typing effect for text
async function addTextFullFeature({
    elementId,
    textBlock,
    textAndColorArray = {word : [], color : []}, // array of { word: string, color: string }
    speed = 200, 
    printImmediately = false, 
    replace = false,
    tempColorDuration = 0,
    defaultColor = 'azure',
}) {
    /* TODO
    ** 1. add sound to it just start when isCurrentlyPrinting is true and it will work
    */
    const token = {};
    currentTypingToken[elementId] = token;
    const element = document.querySelector(elementId);
    if (replace) element.innerHTML = ''; // Clear the content for replacement

    // Clear old cursors
    clearCursor();
    // Set text color based on death
    setElementColor( element, elementId, defaultColor );


    // If printing immediately or slow typing disabled
    if (printImmediately || saveData.Settings.SlowTyping === false) {
        handlePrintImmediately( element, textBlock, elementId );
        return;
    }

    // Prepare for typing
    element.innerHTML = '';
    isCurrentlyPrinting[elementId] = true;
    stopTyping = false;

    const cursor = createFakeCursor(); // Create a fake cursor
    if (textAndColorArray.color.length == 0) {
        element.appendChild(cursor)
        // const typingSound = new Audio('path/to/typing-sound.mp3'); // Replace with actual sound file path when implemented
    }

    // If the word "ALL" is found in the textAndColorArray, set the color to textBlock instead of the word
    const allColorEntry = textAndColorArray.word == 'ALL';
    if (allColorEntry) element.style.color = allColorEntry.color;


    // handle text and color array when it is not empty or "ALL" is not found
    if (textAndColorArray.word.length > 0 && textAndColorArray.word[0] !== 'ALL') {
        // Handle text and color array
        applyWordColoring( element, textBlock, textAndColorArray );
        return;
    }
    // Slow typing character by character
    await PrintCharSlow({ textBlock, elementId, element, speed, cursor, currentTypingToken, token })
    


    if ( cursor) element.removeChild(cursor); // Remove cursor after typing
    
    // Typing finished, clear token
    if (currentTypingToken[elementId] === token) {
        delete currentTypingToken[elementId];
        isCurrentlyPrinting[elementId] = false;
    }

    // Reset color after a delay if tempColorDuration is greater than 0
    if(tempColorDuration > 0){
        setTimeout(() => {
            element.style.color = defaultColor;
        }, tempColorDuration);
    }
}
function saveGame(NumSection){
    currentdate = new Date();
    const datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)+ "/" +
        currentdate.getFullYear() + " | " + currentdate.getHours() + ":" + 
        currentdate.getMinutes() +":" + currentdate.getSeconds();
    let SaveForest = JSON.parse(localStorage.getItem('SaveForest') || '{}');
    let saveData = JSON.parse(sessionStorage.getItem('TempLatestSave'));
    const sectionSpanName = document.getElementById(`gameName${NumSection}`);
    const nameChange = document.getElementById('nameChangeIn');
    let NewName = nameChange.value;
    // Update game name display
    if (NewName == 'Main' || NewName == "") {
        sectionSpanName.textContent = `${saveData['name']} | ${datetime}`;
        saveData['LastSaved'] = datetime;
        sectionSpanName.style.color = 'yellow';
        console.log('still default name')
    } else {
        sectionSpanName.textContent = `${NewName} | ${datetime}`;
        saveData['LastSaved'] = datetime;
        saveData['name'] = NewName;
        console.log('new name')
    }
    SaveForest[`section${NumSection}`] = saveData;
    SaveForest['section0'] = saveData;
    SaveForest.DefaultSaveData = saveData;
    localStorage.setItem('SaveForest', JSON.stringify(SaveForest));
    sessionStorage.setItem('TempLatestSave', JSON.stringify(saveData));
    console.log(`Saving game ${saveData['name']}`);
}
function loadGame(NumSection) {
    let SaveForest = JSON.parse(localStorage.getItem('SaveForest') || '{}');
    let saveData = SaveForest[`section${NumSection}`]
    if (!saveData) {
        console.warn(`No save data found for section${NumSection}`);
        return;
    }
    if (CurrentPageNumber == 1) {
        console.log('Loading game id=0', NumSection);
        startScreen.dataset.visible = 'false';
        openSettings(1);
        clearButtonContent();
        ResetEffectBarToDefault(saveData);
        Side_Menu2.innerHTML = "";
        // Call the mergeDefaultProperties function to ensure saveData has all expected properties
        mergeDefaultProperties(saveData);
        Render_Scene(saveData, true);
    }
}
// Function to delete game
function deleteGame(NumSection) {
    let SaveForest = JSON.parse(localStorage.getItem('SaveForest') || '{}');
    if (SaveForest.hasOwnProperty(`section${NumSection}`)) {
        saveData = SaveForest[`section${NumSection}`]
        // Remove game data from localStorage
        delete SaveForest[`section${NumSection}`];
        // Clear UI
        document.getElementById(`gameName${NumSection}`).textContent = '';
        document.querySelector(`.Section${NumSection}_load_game`).disabled = true;
        document.querySelector(`.Section${NumSection}_load_game`).classList.add('disable');

        console.log(`Deleting game ${NumSection}`);
    } else {
        console.warn(`No saved game found in section${NumSection} to delete.`);
    }
}
function mergeDefaultProperties(saveData) {
    // Define default properties with all expected properties and their default values
    let defaultPropertiesForest =  JSON.parse(localStorage.getItem('SaveForest'));
    const defaultProperties = defaultPropertiesForest.DefaultSaveData
    // If saveData does not exist, initialize it with defaultProperties
    if (!saveData) {
        saveData = { ...defaultProperties };
    }
    // Merge default properties with existing properties, but only add missing properties
    for (const prop in defaultProperties) {
        if (!(prop in saveData)) {
            saveData[prop] = defaultProperties[prop];
        } else if (typeof defaultProperties[prop] === 'object') {
            // If the property is an object (e.g., Settings), merge its properties
            for (const subProp in defaultProperties[prop]) {
                if (!(subProp in saveData[prop])) {
                    saveData[prop][subProp] = defaultProperties[prop][subProp];
                }
            }
        }
    }
}
function Side_Menu_ColapseButtonClickHandler(){
    const Side_Menu_Colapse = document.querySelector('.Side_Menu_Colapse');
    const arrowChanger = document.getElementById('arrowChanger');
    const hr = document.querySelectorAll('hr');
    const SideMenus = [Side_Menu_Colapse, Side_Menu2, Side_Menu3, Side_Menu4, Side_Menu5, ...hr]
    if (Side_Menu.style.width == '15em' || Side_Menu.style.width == "") {
        Side_Menu.style.width = '35px';
        arrowChanger.classList.replace('thick-arrow-left', 'thick-arrow-right');
        setTimeout(() => {
            SideMenus.forEach(el => {
                el.dataset.visible = 'false';
            });            
        }, 0);
    } else {
        Side_Menu.style.width = '15em';
        arrowChanger.classList.replace('thick-arrow-right', 'thick-arrow-left');
        setTimeout(() => {
            SideMenus.forEach(el => {
                el.dataset.visible = 'true';
            });
        }, 200);
    }
}