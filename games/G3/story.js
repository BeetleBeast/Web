

// Render_Scene(saveData, true);

function Render_Scene(saveData, isNew = false) {
    if ( isNew ) impromptuSave(saveData) /* save the game from latest version of saveData */
    saveData = JSON.parse(sessionStorage.getItem('TempLatestSave'));

    const current_storyLine_progress = saveData.currentScene.split('_')[1] || 0;
    const current_chapter_progress = saveData.currentScene.split('_')[0] || 0;
    const current_title_progress = current_chapter_progress;
    const DeathReason = saveData.DeathReason;
    const Choices_Possible = saveData.scenes[saveData.currentScene].options; // its different
    //const Buttons_section_title = saveData.scenes[i].ButtonTitle;
    const Choices_Made = saveData.Choices_Made[current_chapter_progress];
    const CurrentDebuffBar = saveData.Debuff_SpashText_Final;
    const isDead = saveData.isDead;

    const currentSceneText = saveData.scenes[saveData.currentScene].sceneText;
    const currentSceneName = saveData.scenes[saveData.currentScene].sceneName;
    const currentTitle = saveData.scenes[saveData.currentScene].chapterTitle;
    const currentSectionTitle = saveData.scenes[saveData.currentScene].ButtonTitle;
    
    // --- UI Rendering ---
    // Render content in order
    ButtonRender(saveData, false); // 1. Button's text , actions and visibility
    manageHiddenInfo(saveData, false); // 2. Hide or show buttons
    title_progress(currentTitle, current_title_progress); // 3. Title
    scene_progress(currentSceneText, currentSceneName); // 4. Text content
    section_title_progress(currentSectionTitle); // 5. button's title
    character_Description(saveData, Choices_Made); // 6. Character description if applicable
    Effect_Bar_progress(saveData, CurrentDebuffBar); // 7. Effect bar if applicable
    populateInventory(saveData, 1); // 8. Inventory ( only first page )
    Side_Menu3.dataset.visible = isDead ? 'false' : 'true'; // 9. Side menu ( show or hide the effects (debuffs) bar )
    //DisplayDebuffTextWithColors(saveData,)
    return saveData;
}
function impromptuSave(saveData) {
    //  make a save of latest version of saveData
    if(!ResetFile){
        let SaveForest = JSON.parse(localStorage.getItem('SaveForest') || '{}');
        SaveForest.section0 = saveData;
        SaveForest.DefaultSaveData = saveData; // optionally keep DefaultSaveData updated
        sessionStorage.setItem('TempLatestSave',JSON.stringify(saveData));
        localStorage.setItem('SaveForest', JSON.stringify(SaveForest));
    }
}
function ButtonRender(saveData, ISALT = false) {
    const container = document.querySelector('.choices_section_choices');
    const buttonValues = getButtonValues(saveData, ISALT);

    // Clear previously created dynamic buttons (those beyond preset .Sh_1 to .Sh_7)
    container.querySelectorAll('div[class^="Sh_"]').forEach(btn => {
        const value = parseInt(btn.className.split('_')[1]);
        if (value > 7) btn.remove();
    });

    for (const buttonValue of buttonValues) {
        let button;
        if (buttonValue.Value <= 7 ) {
            button = document.querySelector('.Sh_' + buttonValue.Value);
        }
        if (buttonValue.Value > 7 ) {
            button = document.createElement('div');
            button.classList.add('Sh_' + buttonValue.Value);
            container.appendChild(button);
        }
        if (button) {            
            button.innerHTML = buttonValue.Text;
            button.style.display = 'inline-block';

            const handler = ClickHandler(buttonValue.Value, saveData);
            button.removeEventListener("click", button.handlerReference);
            button.addEventListener("click", handler);
            button.handlerReference = handler;
        }
    }
    console.log('Buttons Rendered ' + buttonValues); // Logging the addition of event listener
}
/**
 * 
 * @param {Object} saveData
 * @param {boolean} ISALT - If true, retrieves values from ALT_options instead of options
 * @returns values inside the button(s) of the current scene
 * @description This function retrieves the button values from the saveData object for the current scene.
 */
function getButtonValues(saveData, ISALT = false) {
    const buttonValues = [];
    const options = saveData.scenes[saveData.currentScene][ISALT ? 'ALT_options' : 'options'];
    for (const key in options) {
        if ( options[key]?.ButtonText ) {
            buttonValues.push({
                Value: options[key]?.ButtonNumber,
                Text: options[key]?.ButtonText,
            });
        }
    }
    return buttonValues;
}
function ClickHandler(buttonValue, saveData) {
    return () => {
        console.log('Button ' + buttonValue + ' pressed'); // Log button press
        if (!isCurrentlyPrinting[".main_section"]) {
            // stopTyping = false;
            if (buttonValue === 1) {
                saveData.Choices_Made[saveData.currentScene.split('_')[0]].pop();
                console.log( 'ClickHandler Back button ', saveData.Choices_Made[saveData.currentScene.split('_')[0]])
                previousScene(saveData);
            } else {
                saveData.Choices_Made[saveData.currentScene.split('_')[0]].push(buttonValue);
                console.log( 'ClickHandler Forward button ', saveData.Choices_Made[saveData.currentScene.split('_')[0]])
                nextScene(saveData);
            }
        } else {
            // stopTyping = true;
            console.log('ClickHandler printImmediately, scene ', saveData.currentScene.split('_')[1]);
            addTextFullFeature({
                textBlock : saveData.scenes[saveData.currentScene].sceneText,
                elementId : '.main_section',
                printImmediately : true,
            })
            addTextFullFeature({
                textBlock : saveData.scenes[saveData.currentScene].chapterTitle,
                elementId : '.Quest_Title',
                printImmediately : true,
            })
            isCurrentlyPrinting[".main_section"] = false;
            
        }
    }
}
function manageHiddenInfo(saveData, revealInfo, HiddenTextID, ItemID) {
    const current_storyLine = saveData.currentScene.split('_')[1];
    const current_chapter = saveData.currentScene.split('_')[0];
    const itemDiscoveryText = getItemDiscoveryText(ItemID);
    // Check if Buttons_Hidden data exists for the current chapter and story line
    const Buttons_Hidden = saveData.Buttons_Hidden[current_chapter]?.[current_storyLine];
    if (Buttons_Hidden) {
        // Iterate over the hidden button values for the current scene
        Buttons_Hidden.forEach(buttonValue => {
            const button = document.querySelector('.Sh_' + buttonValue);
            if(saveData.Uncoverded.HiddenButton[buttonValue]){
                button.style.display = "block";
                return;
            }
            if (button) {
                // Set button display based on revealInfo condition
                button.style.display = revealInfo ? "block" : "none";
                saveData.Uncoverded.HiddenButton[buttonValue] = !!revealInfo;
            }
        });
    } else {
        console.log(`No hidden buttons defined for chapter ${current_chapter} and scene ${current_storyLine}`);
    }
    if(HiddenTextID){
        const Text_Hidden = saveData.HiddenStoryLine[current_chapter][current_storyLine];
        if(!saveData.Uncoverded.HiddenText[HiddenTextID]) {
            addTextFullFeature({
                elementId : '.main_section',
                textBlock : Text_Hidden[HiddenTextID],
                replace : false,
                textAndColorArray : { word : 'ALL', color : 'blue'},
            })
            saveData.Uncoverded.HiddenText[HiddenTextID] = true;
        }else{
            //main_section.textContent += Text_Hidden[HiddenTextID];
        }
    }
    if(ItemID){
        //  add the item to the inventory and show the text if it is not already discovered
        if (itemDiscoveryText && !saveData.Uncoverded.Items[ItemID]) {
            addItemToInventory(saveData, ItemID, 1);
            addTextFullFeature({
                elementId : '.main_section',
                textBlock : itemDiscoveryText.Discoverytext,
                replace : false,
                textAndColorArray : { word : 'ALL', color : itemDiscoveryText.color},
            })
            saveData.Uncoverded.Items[ItemID] = true;
        }
    }
}
function damageAndDeath(amount, method, instaKill = false) {
    const isDead = instaKill || character.Health - amount <= 0;
    if (isDead) {
        handleDeath(method);
    } else {
        character.getDamage(amount);
    }
}
function handleDeath(reason = "unknown") {
    console.warn(`Player died: ${reason}`);

    saveData.isDead = true;
    saveData.deathReason = reason;

    // Store where the player died
    saveData.AtDeathScreen = {
        AtDeath_storyLine_progress: saveData.currentScene.split('_')[1],
        AtDeath_Chapter_progress: saveData.currentScene.split('_')[0],
        AtDeath_Title_progress: saveData.currentScene.split('_')[0],
    };

    const deathScene = saveData.scenes["Death"];
    deathScene.sceneText = `You died because ${reason}`;
    deathScene.options[1].next_scene = saveData.LastSafeScene;

    // Reset health if needed
    if (typeof character?.Resurrect === "function") {
        character.Resurrect();
    }

    // Move to the death screen
    saveData.currentScene = "Death";

    clearButtonContent();
    Render_Scene(saveData, true);
}

function InventoryItemClickedHandler(item_id){
    switch(item_id){
        case 1:
            console.log('you died id=500')
            damageAndDeath(undefined,'you used the soul redeemer',true)
            break;
        case 4:
            //  a green gemstone something
            break;
    }
}
function character_Description(saveData, Choices_Made){
    //  check wat in Side-Menu2 is, if not the same as character_Description_Text_Final replace it with It
    Side_Menu2.dataset.visible = saveData.isDead ? 'false' : 'true'; //  show or hide the character description
    if (Side_Menu2.innerHTML !== saveData.character_Description_Text_Final && ( saveData.currentScene.split('_')[1] >= 3 || saveData.currentScene.split('_')[0] >=1 )){
        Side_Menu2.innerHTML = saveData.character_Description_Text_Final;
        console.log('saveData.character_Description_Text_Final', saveData.character_Description_Text_Final);
    }
}
function Effect_Bar_progress(saveData, CurrentDebuffBar){
    //  check wat in Side-Menu4 is, if not the same as Debuff_SpashText_Final replace it with It 
    Side_Menu4.dataset.visible = saveData.isDead ? 'false' : 'true'; //  show or hide the debuff bar
    if (Side_Menu4.innerHTML !== saveData.Debuff_SpashText_Final) {
        Side_Menu4.innerHTML = saveData.Debuff_SpashText_Final;
        console.log('CurrentDebuffBar', saveData.Debuff_SpashText_Final);
    }
}
function populateInventory(saveData,pageNumber) {
    // Function to populate inventory grid based on current page
    let number = 1;
    const inventoryItems = saveData.Inventory;
    const pageSize = 16; // Number of items per page (adjust based on grid size)

    const pageContainer = document.getElementById(`page${pageNumber}`);
    pageContainer.innerHTML = ''; // Clear previous items

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, inventoryItems.length);
    const itemsToShow = inventoryItems.slice(startIndex, endIndex);

    itemsToShow.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('inventoryItem');
        itemElement.textContent = `${item.Name} x${item.quantity}`;

        itemElement.id = `item-${number} itemType-${item.id}`;

        // Add click event listener to each item
        itemElement.addEventListener('click', () => {
            // Call the click handler function passing the item id or class
            InventoryItemClickedHandler(item.id); // Example: Passing item id
        });

        pageContainer.appendChild(itemElement);
        number++;
    });
    if (saveData.isDead) document.getElementById('inventory').style.display = 'none'; // Hide inventory if player is dead
}
function addItemToInventory(saveData, itemId, newQuantity = 1) {
    // Find the item in Items by itemId
    const itemToAdd = saveData.Items.find(item => item.id === itemId);
    if (itemToAdd) {
        // Check if the item is already in the Inventory
        const existingItemIndex = saveData.Inventory.findIndex(item => item.id === itemId);
        if (existingItemIndex !== -1) {
            // If the item already exists in the Inventory, update its quantity
            saveData.Inventory[existingItemIndex].quantity += newQuantity;
        } else {
            // If the item is not in the Inventory, add it with the specified quantity
            saveData.Inventory.push({
                id: itemToAdd.id,
                Name: itemToAdd.Name,
                quantity: newQuantity,
                color: itemToAdd.color,
                quality: itemToAdd.quality
            });
        }
        // Call function to update the inventory display
        populateInventory(saveData, 1);
    } else {
        console.error(`Item with id ${itemId} not found in Items.`);
    }
}
const effectHandlers = {
    Blinded: ([_, amount, element]) => { element.style.opacity = amount / 100; },
    pacified: () => {
            // not able to be agressief
            character.applyDebuff(pacified, undefined, saveData, elementId);
        },
    Confusion: ([_, __, ___, Confused_Text, Confused_Title]) => {
        // change text to confused text
        console.log('activate confusion')
        addTextFullFeature({
            textBlock : Confused_Text,
            elementId : '.main_section',
            speed : 35,
        })
        addTextFullFeature({
            textBlock : Confused_Title,
            elementId : '.Quest_Title',
        })
        ButtonRender(saveData, true); //  re-render buttons
    },
    Weakened : () => {},
    Slowed : () => {},
    // Confused : () => {},
    Silenced : () => {},
    Crippled : () => {},
    Vulnerable : () => {},
    Disarmed : () => {},
    Diseased : () => {},
    Fear : () => {},
    Stunned : () => {},
    Hexed : () => {},
    Drained : () => {},
    Sapped : () => {},
    Marked : () => {},
    Burning : () => {},
    Chilled : () => {},
    Rooted : () => {},
    Cursed : () => {},
    Fatigue : () => {},
    MAXeffect : () => {}
};
function section_title_progress(current_section_title) {
    // choices_section_title.innerHTML = current_section_title;// print current scection title
    addTextFullFeature({
        textBlock : current_section_title,
        elementId : '.choices_section_title', // force error correct is elementId : '.choices_section_title',
        printImmediately: true,
    })
    console.log('current_section_title', current_section_title);
}
function title_progress(current_title,current_title_progress) {
    addTextFullFeature({
        textBlock : current_title,
        elementId : '.Quest_Title',
    })
    console.log('current_title',current_title);
    console.log('current_title_progress', current_title_progress);
}
function scene_progress(currentSceneText,currentSceneName) {
    addTextFullFeature({
        textBlock : currentSceneText,
        elementId : '.main_section',
        speed : 35,
    })
    saveData.DeathReason = undefined;
    console.log('currentSceneName', currentSceneName);
    console.log('currentSceneText', currentSceneText);
}
function navigateStory(saveData, { direction = 'next', level = 'scene'}) {
    let [chapter, scene] = saveData.currentScene.split('_').map(Number);
    if (chapter !== 'Death') {
        chapter = parseInt(chapter);
        scene = parseInt(scene);
    }
    // death handling
    if (saveData.isDead) {
        const [safeChapter, safeScene] = saveData.LastSafeScene.split('_').map(Number);
        saveData.currentScene = saveData.LastSafeScene || "0_0";
        Object.keys(saveData.Choices_Made).forEach((chapterKey) => {
            const chapterNum = Number(chapterKey);
            if (chapterNum > safeChapter) {
                saveData.Choices_Made[chapterKey] = [];
            } else if (chapterNum === safeChapter) {
                // Optional: trim choices from the same chapter
                saveData.Choices_Made[chapterKey] = saveData.Choices_Made[chapterKey].slice(0, safeScene);
            }
        });
        saveData.isDead = false;
        saveData.deathReason = null;
        saveData.AtDeathScreen = ''
        clearButtonContent();
        Render_Scene(saveData, true);
        return;
    }
    // SaveScene handling
    if (saveData.currentScene == saveData.safeScenes?.[saveData.currentScene]) saveData.LastSafeScene = `${chapter}_${scene}`;

    let lastChoiceIndex = saveData.Choices_Made[chapter].length - 1;
    let LastButtonPressed = direction === 'next' ? saveData.Choices_Made[chapter][lastChoiceIndex] : 1;


    const sceneKeys = Object.keys(saveData.scenes)
        .filter(key => key.startsWith(`${chapter}_`))
        .map(key => parseInt(key.split('_')[1]))
        .sort((a, b) => a - b);

    if (level === 'scene') {
        const sceneData = saveData.scenes[saveData.currentScene];
        const options = Object.values(saveData.scenes[saveData.currentScene].options)?.find(b => b.ButtonNumber === LastButtonPressed);
        if ((!Object.values(sceneData?.options)?.find(b => b.ButtonNumber === LastButtonPressed)) && direction !="previous") {
            console.warn("No valid options available.");
            return;
        }
        let currentIndex = sceneKeys.indexOf(scene);
        
        if (direction === 'next') {
            if (!options.next_scene && options.next_scene !== undefined) {
                // if its an end point only do the action if it exist and go no-where
                if (options.action) performSceneAction(options.action, saveData);
                return;
            }
            if (currentIndex < sceneKeys.length - 1) {
                // Move to the next scene
                scene = options.next_scene? options.next_scene.split('_')[1] : sceneKeys[currentIndex + 1];
                // Perform custom action if specified
                if (options.action) performSceneAction(options.action, saveData);
            } else {
                return navigateStory(saveData, { direction: 'next', level: 'chapter' });
            }
        } else if (direction === 'previous') {
            if (!options.next_scene && options.next_scene !== undefined) {
                // if its an end point only do the action if it exist and go no-where
                if (options.action) performSceneAction(options.action, saveData);
                return;
            } else if (options.next_scene && options.next_scene !== undefined) {
                scene = options.next_scene? options.next_scene.split('_')[1] : sceneKeys[currentIndex - 1];
                if (options.action) performSceneAction(options.action, saveData);
            } else {
                return navigateStory(saveData, { direction: 'previous', level: 'chapter' });
            }
        }

        saveData.currentScene = `${chapter}_${scene}`;
        saveData.current_storyLine_progress = scene;
    }

    if (level === 'chapter') {
        if (direction === 'next' && chapter < Object.keys(saveData.scenes).length - 1) {
            chapter += 1;
            scene = 0;
        } else if (direction === 'previous' && chapter > 0) {
            chapter -= 1;
            scene = 0;
        } else {
            console.log('No more chapters in this direction.');
            return;
        }

        saveData.current_chapter_progress = chapter;
        saveData.current_storyLine_progress = scene;
        saveData.currentScene = `${chapter}_${scene}`;
    }

    clearButtonContent();
    Render_Scene(saveData, true);
}
function nextScene(saveData) {
    navigateStory(saveData, { direction: 'next', level: 'scene' });
}

function previousScene(saveData) {
    navigateStory(saveData, { direction: 'previous', level: 'scene' });
}

function nextChapter(saveData) {
    navigateStory(saveData, { direction: 'next', level: 'chapter'});
}

function previousChapter(saveData) {
    navigateStory(saveData, { direction: 'previous', level: 'chapter' });
}
function getItemDiscoveryText(id){
    return saveData.Items.find(entry => entry.id === id);
}
function characterMaker(saveData, lastChoiceIndex, value, valueS){
    //  Update class value
    const characterKeys = {
        2: 'eye_Color',
        3: 'hair_style',
        4: 'skin_complexion',
        5: 'stature',
        6: 'attire',
        7: 'gender'
    };
    
    const keyToUpdate = characterKeys[lastChoiceIndex];
    if (keyToUpdate) {
        character[keyToUpdate] = value;
    }

    // Update the value arrays
    valueSTRING.push(value);
    valueCOLOR.push(valueS);

    // Get template string
    const templateString = saveData.character_Description_Text[lastChoiceIndex].charachterDefining;

    // Evaluate it as a template literal
    const charachterDefining = new Function('value', 'valueSTRING', `return \`${templateString}\`;`)(value, valueSTRING);

    //  Display text to Side Menu
    Side_Menu2.innerHTML = charachterDefining;

    addTextFullFeature({
        elementId: '.Side-Menu2', 
        textBlock: charachterDefining, 
        textAndColorArray: { word : valueSTRING, color : valueCOLOR},
        replace : true,
    })
    saveData.character_Description_Text_Final = Side_Menu2.innerHTML;
}
function performSceneAction(actionObj, saveData) {
    // get chapter and scene
    const [ChapterStr, SceneStr] =  saveData.currentScene.split('_');
    const SplashText_Final = saveData.Debuff_SpashText_Final
    const SplashText = saveData.Debuff_SpashText;
    const Effect_Applied = saveData.CurrentDebuff_Effects;
    const Effect_Debuff = saveData.Debuff_Effects;
    const Effect_Buff = saveData.Buff_Effects;
    const Items = saveData.Items;

    const [{ type, effect, strength, value, target, tag, show, textID, itemID, text, instaKill }] = actionObj;
    //  
    const options = Object.values(saveData.scenes[saveData.currentScene].options).find(a => a.action === actionObj);
    const optionsBtnNum = options?.ButtonNumber;
    const ALT_options = Object.values(saveData.scenes[saveData.currentScene].ALT_options).find(BtnNum => BtnNum.ButtonNumber === optionsBtnNum);
    const ALT_Text = saveData.scenes[saveData.currentScene].ALT_Text;
    const ALT_Name = saveData.scenes[saveData.currentScene].ALT_Name;

    switch (type) {
        case 'characterMaker':
            characterMaker(saveData, SceneStr, options?.ButtonText, ALT_options?.ButtonText)
            break;
        case 'rested':
            character.rested(value);
            break;
        case 'DeBuffParentFunction':
            if (effect && strength && target) {
                // 0 effect, 1 amount, 2 element, 3 ConfusedText, 4 ConfusedTitle
                const handler = effectHandlers[effect];
                const argsList = [ effect, strength, target, ALT_Text, ALT_Name ];
                if (handler) handler(argsList);
                else console.log("Unknown effect: " + effect);
            }
            break;
        case 'createElement':
            if (tag) {
                main_section.appendChild(document.createElement(tag));
            }
            break;
        case 'manageHiddenInfo':
            if (show) {
                manageHiddenInfo( saveData, show, textID, itemID );
            }
            break;
        case 'damageAndDeath':
            if (text && ( value || instaKill )) {
                damageAndDeath( value, text, instaKill );
            }
            break;
    }
    // Handle chained actions if needed
    if (actionObj.length > 1) {
        for (let i = 1; i < actionObj.length; i++) {
            const RemovedAction = actionObj.shift();
            performSceneAction(actionObj, saveData);
        }
    }
    // options.forEach(action => performSceneAction(action, saveData));
}
/**
 * Helper to know Story actions
 * chapter _ scene
 * // TODO: make 1_7 and further
 * Death => do death scene
 * 0_2
 * 0_3
 * 0_4
 * 0_5
 * 0_6
 * 0_7 => characterMaker(saveData, lastChoiceIndex, value, valueS)
 * 1_6 => 
        Btn 2:
            //  Investigate the hidden alcove
            nextScene(saveData);//  I.E. scene 12
        Btn 3:
            character.rested(10);
            DeBuffParentFunction('Pacified', 20, saveData, ".choices_section")
            DeBuffParentFunction('Confusion', 20, saveData, ".choices_section")
            //  Listen to the soothing melody of the flower
        Btn 4:
            //  Continue exploring the passage
            nextScene(saveData);
        Btn 5:
            character.rested(20)
        Btn 6:
            //  Feel the texture of the moss beneath your fingertips
            main_section.appendChild(document.createElement('br'));
            manageHiddenInfo(saveData, true, 0)
 * 1_7 =>
        Btn 2:
            //  you fall in the water and die if requirement is not activated if it is aquire mysterious figure
        Btn 3:
            //  nothing happens
        Btn 4:
            //  the stone disolves in the water
        Btn 5:
            //  get silence back
        Btn 6:
            //  get damage
            damageAndDeath(15,'of an ambiguous pond of glazend color')
 * 1_8 =>
        Btn 2:
            //  feel drouwsy as not anouth mana ( player will not get info as comprehencion is to low )
        Btn 3:
            //  comprencion too low
        Btn 4:
            //  nextcene
            nextScene(saveData);
        Btn 5:
            //  +? in theoretical int
        Btn 6:
            //  +? in practical int
 * 1_9 =>
        Btn 2:
            //  Follow the stream to its source
            nextScene(saveData);
        Btn 3:
            //  
        Btn 4:
            //  
        Btn 5:
            //  
        Btn 6:
            //  
 * 1_10 =>
        Btn 2:
            //  
        Btn 3:
            //  
        Btn 4:
            //  
        Btn 5:
            //  
        Btn 6:
            //  
 * 1_11 =>
        Btn 2:
 * 1_12 =>
        Btn 2:
            //
        Btn 6:
            manageHiddenInfo(saveData, undefined, undefined, 4)



            // add special sircumstances for 7 to 10 (sometimes go to other scene or add to inventory )
            
            //    7 : { 1 : "Leave the area undisturbed", 2 : "Approach the figure cautiously.", 3 : "Sit quietly by the pool and observe.", 4 : "Cast a stone into the pool.", 5 : "Attempt to communicate with the figure.", 6 : "Feel the cool crystal walls with your hands."},
            //    8 : { 1 : "Leave the area undisturbed", 2 : "Reach out to touch the ancient runes.", 3 : "Atempt to read the chant or incantation.", 4 : "Continue down the corridor.", 5 : "Meditate in front of the runes.", 6 : "Feel the texture of the walls for any irregularities."},
            //    9 : { 1 : "Leave the area undisturbed", 2 : "Follow the stream to its source.", 3 : "Offer a small offering of food to the fish.", 4 : "Take a moment to admire the surroundings.", 5 : "Feel the water with your hands.", 6 : "Listen to the soothing sound of the rushing stream."},
            //    10 : { 1 : "Leave the area undisturbed", 2 : "Sit amongst the mushrooms and observe.", 3 : "Reach out to touch the mushrooms.", 4 : "Inhale deeply, breathing in the aroma.", 5 : "Feel the texture of the ground beneath your feet.", 6 : "Listen for any sounds emanating from the grove."},
            
 */