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
let isCurrentlyPrinting = false; // set true if is printing and false if not
let stopTyping = false;
let previousAmounts = [];
let ResetFile = false;// if true can't save latest as session is reseting
let CurrentPageNumber = 1;


/*
try{
    localStorage.getItem('SaveForest');
}
catch(error){
    let SaveForest = {
        'section0' : {},
    };
    let saveData = saveData;
    console.log('Can this be removed? id=2525')
}
*/

// Function to start up the game
window.onload = function () {
    startup()
    LoadedSaves()
    setEventListener()
};


// Function to start up or load the game
function startup(userConfirmed) {
    (typeof(userConfirmed)) == 1 ? console.log('Continue story') : console.log('start new story');
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
    let lastbigesttime=0;
    if (saveForestString) {
        SaveForest = JSON.parse(saveForestString);
        for (let i = 0; i < 6; i++) {
            const sectionSpanName = document.getElementById(`gameName${i}`); // 0 - 5 
            //saveData = SaveForest[`section${i}`];
            if (i > 0 && SaveForest[`section${i}`]) {
                document.querySelector(`.Section${i}_load_game`).disabled = false;
                document.querySelector(`.Section${i}_load_game`).classList.remove('disable');
                sectionSpanName.textContent = `${saveData['saveDataName']} | ${saveData['saveDataTime']}`;
                console.log('Game data loaded from localStorage('+i+').');
                if (saveData['saveDataName'] === "Main") {
                    sectionSpanName.style.color = 'yellow';
                } else {
                    let formattedTime = saveData['saveDataTime'].replace(/[/:| ]/g, '');
                    let timeAsNumber = parseInt(formattedTime);
                
                    if (timeAsNumber >= lastbigesttime) {
                        lastbigesttime = timeAsNumber;
                        sectionSpanName.style.color = 'green';
                    } else {
                        sectionSpanName.style.color = 'purple';
                    }
                }                
            } else {
                sectionSpanName.innerHTML = ''; // Clear empty slots
                document.querySelector(`.Section${i}_load_game`).disabled = true;
                document.querySelector(`.Section${i}_load_game`).classList.add('disable');
                console.log('No save for '+i+' available');
            }
        }
    } else {
        console.log('SaveForest does not exist');
        //let saveData = {}; // Initialize saveData object
    }
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
        SaveForest = JSON.parse(localStorage.getItem('SaveForest'));
        TempLatestSave = JSON.parse(sessionStorage.getItem('TempLatestSave'));
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
        story(saveData);
    } catch (error) {
        if(error == TypeError){
            console.error('Error in SaveData:', error);
            story(saveData);
        }else{
            console.error('Unkown Error by parsing SaveForest:', error);
            newGame(saveData); // Fallback to starting a new game if loading fails
        }
        
        
    }
}

// newGame makes the prep for a new game
function newGame(){
    console.log('new game');
    try{saveData.Player_character = Player;}
    catch(error){console.log('Can\'t set player because ',error);}
    SaveForest.DefaultSaveData = saveData;
    //console.log('SaveForest:',JSON.parse(SaveForest))
    localStorage.setItem('SaveForest', JSON.stringify(SaveForest));

    // start story
    ResetEffectBarToDefault(saveData)
    story(saveData);

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
    if (inventory.style.display === 'none') {
        inventory.style.display = 'block';
        
    } else {
        inventory.style.display = 'none';
        
    }
}
// Event listener for key press (I key)
document.addEventListener('keydown', function(event) {
    if (event.key === 'i' || event.key === 'I') {
        toggleInventory();
    }
});
function addTextWithTempColor(elementId, text, Color, Replace = true, temp = true, defaultColor = 'azure') {
    const element = document.querySelector(elementId);
    
    // Change text content
    if(Replace){
        element.textContent = text;
    }else{
        element.textContent += text;
    }
    // Temporarily change text color using the provided color
    element.style.color = Color;
    // Reset color after a delay (simulating temporary color change)
    if(temp){
        setTimeout(() => {
            element.style.color = defaultColor; // Reset to default color (azure)
        }, 1000); // Adjust delay time (in milliseconds) as needed
    }
}
function addTextWithTempColorS(elementId,textBlock, textValue, textValuePast, textColorPast = [], amountOfPastTextValue, color, replace  = true, temporary = true, defaultColor = 'azure') {
    // elementId, textBlock, textValue, textValuePast, color, replace = true, temporary = true, defaultColor = 'azure'
    const element = document.querySelector(elementId);
    if (replace) {
        element.innerHTML = ""; // Clear the content for replacement
    }
    //  color = saveData.ALT_Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed];
    // Handle past text values
    if (amountOfPastTextValue > 0 && textValuePast.length > 0) {
        for (let i = 0; i < Math.min(amountOfPastTextValue, textValuePast.length); i++) {
            const textPartsPast = textBlock.split(textValuePast[i]); // Split around textValuePast
            element.append(document.createTextNode(textPartsPast[0])); // Add first part
            const spanPast = document.createElement("span");
            spanPast.textContent = textValuePast[i];
            spanPast.style.color = textColorPast[i];
            element.append(spanPast); // Add past text
            textBlock = textPartsPast.slice(1).join(spanPast); // Update remaining textBlock
        }
    }

    // Handle the main text value
    const textParts = textBlock.split(textValue); // Split around textValue
    element.append(document.createTextNode(textParts[0])); // Add first part
    if (textParts.length > 1) {
        const span = document.createElement("span");
        span.textContent = textValue;
        span.style.color = color;
        element.append(span); // Add colored text
    }
    if (textParts.length > 1) {
        element.append(document.createTextNode(textParts.slice(1).join(span))); // Add remaining parts
    }

    // Reset color after a delay if temporary is true
    if (temporary) {
        setTimeout(() => {
            span.style.color = defaultColor;
        }, 1000); // 1-second delay
    }
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
function slowTypingText(saveData,text, elementId, index = 0, speed = 200, printImmediately = false, events = false) {
    let spaceIndex = 0; // Reset space counter
    function printCharacterImmediately(type) {
        let output = ""; // Store the output in a temporary variable for better performance
        
        let element = document.querySelector(elementId);
        if (type == 1) {
            while (index < text.length) {
                let char = text[index];

                if (char === " ") {
                    output += "&nbsp;";
                    spaceIndex++;
                } else if (spaceIndex >= 20 && char === "."| char === ",") {
                    output += char + "<br>"; // Use <br> for new lines
                    spaceIndex = 0;
                } else {
                    output += char;
                }

                index++;
            }

            element.innerHTML = output; // Set innerHTML once for efficiency
            isCurrentlyPrinting = false; // Mark printing as complete
            return;
        }else if (type == 2){
            isCurrentlyPrinting = true;
            if (index < text.length && !stopTyping) {
                let char = text[index];
    
                if (char === " ") {
                    element.innerHTML += "&nbsp;";
                    spaceIndex++;
                } else if (spaceIndex >= 20 && char === "."| char === ",") {
                    element.innerHTML += char + "<br>"; // Use <br> for new lines
                    spaceIndex = 0;
                } else {
                    element.innerHTML += char;
                }
    
                index++;
                setTimeout(() => {
                    printCharacterImmediately(2)
                }, speed);// Schedule next character print
            } else {
                isCurrentlyPrinting = false; // Mark printing as complete
                return;
            }
        }
    }

    // Check if the text has already been printed
    if (document.querySelector(elementId).innerText == text) {
        return;
    }
    // Set text color based on `IsDead` status
    document.querySelector(elementId).style.color = saveData.IsDead && elementId !== '.Quest_Title' ? 'red' : 'white';

    if (printImmediately || saveData.Settings.SlowTyping == false) {
        // Clear the element before printing and print immediately
        document.querySelector(elementId).innerHTML = '';  
        // Start printing characters
        printCharacterImmediately(1);
        return;
    }
    // Set printing flag before starting to print
    isCurrentlyPrinting = true;

    function FakeCursor() {
        // Create the fake insertion point
        const cursor = document.createElement('span');
        cursor.classList.add('fake-cursor');
        cursor.innerHTML = '|';
        cursorT1 = ['\\', '|', '/', '-'];
        cursorT2 = ['.'];
        document.querySelector(".main_section").appendChild(cursor);

        // Add a blinking effect to the cursor using CSS
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .fake-cursor {
                display: inline-block;
                animation: blink 1s step-start infinite;
                color: inherit;
            }
            @keyframes blink {
                50% {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(cursorStyle);
    }
    /*
    TODO
    
    1. the FakeCursor doesn't work well enouth needs to be revized
    2. add sound to it just start when isCurrentlyPrinting is true and it will work
    */
    // Clear the element before starting to print characters
    document.querySelector(elementId).innerHTML = '';
    // Start printing characters
    printCharacterImmediately(2);
}
function saveGame(NumSection){
    currentdate = new Date();
    var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)+ "/" +
    currentdate.getFullYear() + " | " + currentdate.getHours() + ":" + 
    currentdate.getMinutes() +":" + currentdate.getSeconds();
    saveData = JSON.parse(sessionStorage.getItem('TempLatestSave'));
    const sectionSpanName = document.getElementById(`gameName${NumSection}`);
    const nameChange = document.getElementById('nameChangeIn');
    let NewName = nameChange.value;
    // Update game name display
    if(NewName == 'Main' || NewName == ""){
        sectionSpanName.textContent = `${saveData['saveDataName']} | ${datetime}`;
        saveData['saveDataTime'] = datetime;
        sectionSpanName.style.color = 'yellow';
        console.log('still default name')
    }else{
        sectionSpanName.textContent = `${NewName} | ${datetime}`;
        saveData['saveDataTime'] = datetime;
        saveData['saveDataName'] = NewName;
        console.log('new name')
    }
    SaveForest[`section${NumSection}`] = saveData;
    SaveForest['section0'] = saveData;
    localStorage.setItem('SaveForest', JSON.stringify(SaveForest));
    console.log(`Saving game ${saveData['saveDataName']}`);
}
function loadGame(NumSection) {
    SaveForest = JSON.parse(localStorage.getItem('SaveForest'));
    saveData = SaveForest[`section${NumSection}`]
    if (CurrentPageNumber == 1) {
        console.log('Loading game id=0', NumSection);
        startScreen.dataset.visible = 'false';
        openSettings(1);
        clearButtonContent();
        ResetEffectBarToDefault(saveData);
        Side_Menu2.innerHTML = "";
        // Call the mergeDefaultProperties function to ensure saveData has all expected properties
        mergeDefaultProperties(saveData);
        story(saveData);
    }
}
// Function to delete game
function deleteGame(NumSection) {
    SaveForest = JSON.parse(localStorage.getItem('SaveForest'));
    saveData = SaveForest[`section${NumSection}`]
    // Clear game name display
    document.getElementById(`gameName${NumSection}`).textContent = '';
    // Remove game data from localStorage
    SaveForest[`section${NumSection}`] = undefined;
    localStorage.setItem('SaveForest',JSON.stringify(SaveForest));
    console.log(`Deleting game ${NumSection}`);
}
function mergeDefaultProperties(saveData) {
    // Define default properties with all expected properties and their default values
    // TODO: FT merge prop
    let defaultPropertiesForest =  JSON.parse(localStorage.getItem('SaveForest'));
    const defaultProperties = defaultPropertiesForest.DefaultSaveData
    // If saveData does not exist, initialize it with defaultProperties
    if (!saveData) {
        saveData = { ...defaultProperties };
    } else {
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