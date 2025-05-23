

Render_Scene(saveData, true);

function Render_Scene(saveData, isNew = false) {
    if (isNew) {
        impromptuSave(saveData);  //  save the game from latest version of saveData
    } else {
        saveData = JSON.parse(sessionStorage.getItem('TempLatestSave'));
    }
    /*
    if (!saveData.ItemID) {
        const {
            current_storyLine_progress,
            current_chapter_progress,
            current_title_progress,
            DeathReason,
            Choices_Possible,
            Buttons_section_title,
            Choices_Made,
            CurrentDebuffBar,
            IsDead
        } = saveData?? 0;

        const currentScene = saveData.storyLine_progress[current_chapter_progress][current_storyLine_progress];
        const currentTitle = saveData.title_progress[current_title_progress];
        const currentSectionTitle = Buttons_section_title[current_chapter_progress][current_storyLine_progress];
    }
    */
    const current_storyLine_progress = saveData.currrentScene.split('_')[1] || 0;
    const current_chapter_progress = saveData.currrentScene.split('_')[0] || 0;
    const current_title_progress = current_chapter_progress;
    const DeathReason = saveData.DeathReason;
    const Choices_Possible = saveData.scenes[saveData.currrentScene].options; // its different
    //const Buttons_section_title = saveData.scenes[i].ButtonTitle;
    const Choices_Made = saveData.Choices_Made[current_chapter_progress];
    const CurrentDebuffBar = saveData.Debuff_SpashText_Final;
    const IsDead = saveData.IsDead;

    const currentSceneText = saveData.scenes[saveData.currrentScene].sceneText;
    const currentSceneName = saveData.scenes[saveData.currrentScene].sceneName;
    const currentTitle = saveData.scenes[saveData.currrentScene].chapterTitle;
    const currentSectionTitle = saveData.scenes[saveData.currrentScene].ButtonTitle;
    
    // --- UI Rendering ---
    // Render content in order
    ButtonPressed(saveData, Choices_Possible); // 1. Button's text , actions and visibility
    manageHiddenInfo(saveData, false); // 2. Hide or show buttons
    title_progress(currentTitle, current_title_progress); // 3. Title
    scene_progress(currentSceneText, currentSceneName); // 4. Text content
    section_title_progress(currentSectionTitle); // 5. button's title
    character_Description(saveData, Choices_Made); // 6. Character description if applicable
    Effect_Bar_progress(saveData, CurrentDebuffBar); // 7. Effect bar if applicable
    populateInventory(saveData, 1); // 8. Inventory ( only first page )
    Side_Menu3.dataset.visible = IsDead ? 'false' : 'true'; // 9. Side menu ( show or hide the effects (debuffs) bar )
    //DisplayDebuffTextWithColors(saveData,)
    return saveData;
}
function impromptuSave(saveData) {
    //  make a save of latest version of saveData
    if(!ResetFile){
        SaveForest['section0'] = saveData;
        sessionStorage.setItem('TempLatestSave',JSON.stringify(saveData));
        localStorage.setItem('SaveForest', JSON.stringify(SaveForest));
    }
}
function getButtonValues(saveData) {
    const buttonValues = [];
    for (const buttonValue of saveData.Buttons) {
        let currentScene = saveData.currrentScene.split('_')[1];
        let currentChapter = saveData.currrentScene.split('_')[0];
        let chapter = saveData.scenes[saveData.currrentScene];
        let scene = chapter.options[buttonValue]?.ButtonText;
        let value;
        if(saveData.isDead){
            value = chapter[buttonValue];
            
        }else{
            value = scene;
        }
        if (value) {
            console.log('value id=12 (buttonValue)',value)
            buttonValues.push(buttonValue);
        }
    }
    return buttonValues;
}

function buttonClickHandler(buttonValue, saveData) {
    return () => {
        console.log('Button ' + buttonValue + ' pressed'); // Log button press
        if (!isCurrentlyPrinting) {
            //console.log('Pressed button ', buttonValue, ' with value ', value);
            console.log('Starting new scene id=4');
            stopTyping = false;
            switch (buttonValue) {
                case 1:
                    console.log("Choices_Made before change id=253 ", saveData.Choices_Made[saveData.currrentScene.split('_')[0]]);
                    saveData.Choices_Made[saveData.currrentScene.split('_')[0]].pop();
                    console.log("Choices_Made after change id=254 ", saveData.Choices_Made[saveData.currrentScene.split('_')[0]]);
                    previousScene(saveData);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    console.log("Choices_Made before change id=261 ", saveData.Choices_Made[saveData.currrentScene.split('_')[0]]);
                    saveData.Choices_Made[saveData.currrentScene.split('_')[0]].push(buttonValue);
                    Choices_calculator(saveData);
                    console.log("Choices_Made after change id=262 ", saveData.Choices_Made[saveData.currrentScene.split('_')[0]]);
                    break;
                case 7:
                    console.log("Choices_Made before change id=255 ", saveData.Choices_Made[saveData.currrentScene.split('_')[0]]);
                    saveData.Choices_Made[saveData.currrentScene.split('_')[0]].push(buttonValue);
                    console.log("Choices_Made after change id=256 ", saveData.Choices_Made[saveData.currrentScene.split('_')[0]]);
                    nextScene(saveData);
                    break;
            }
        } else {
            stopTyping = true;
            console.log('current_storyLine_progress id=8', saveData.currrentScene.split('_')[1]);
            addTextFullFeature({
                textBlock : saveData.scenes[saveData.currrentScene].sceneText,
                elementId : '.main_section',
                printImmediately : true,
            })
            addTextFullFeature({
                textBlock : saveData.scenes[saveData.currrentScene].chapterTitle,
                elementId : '.Quest_Title',
                printImmediately : true,
            })
            isCurrentlyPrinting = false;
            console.log('Print everything for scene number ', saveData.currrentScene.split('_')[1]);
            
        }
    }
}
function ButtonPressed(saveData, infogetter) {
    const buttonValues = getButtonValues(saveData);
    for (const buttonValue of buttonValues) {
        const button = document.querySelector('.Sh_' + buttonValue);
        if (button) {
            // Get the value of the button from the scene
            // let chapter = infogetter[saveData.current_chapter_progress];
            // let scene = chapter[saveData.current_storyLine_progress];
            let chapter = saveData.scenes[saveData.currrentScene];
            let scene = chapter.options[buttonValue]?.ButtonText;
            let value;
            
            let Textvalue = scene;
            let Namevalue = chapter.options[buttonValue]?.ButtonNumber;
            
            // Set the inner HTML of the button
            button.innerHTML = Textvalue;
            button.style.display = 'inline-block'; // Make the button visible
            // Add event listener to the button
            const handler = buttonClickHandler(Namevalue, saveData);
            button.removeEventListener("click", button.handlerReference); // Remove previous listener to avoid duplicates
            button.addEventListener("click", handler);
            button.handlerReference = handler; // Store the reference to the handler function
            console.log('Event listener added for button ' + Namevalue); // Logging the addition of event listener
        }
    }
}
function manageHiddenInfo(saveData, revealInfo, HiddenTextID, ItemID) {
    const current_storyLine = saveData.current_storyLine_progress;
    const current_chapter = saveData.current_chapter_progress;
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
        const Text_Hidden = saveData.HiddenStoryLine[saveData.current_chapter_progress][saveData.current_storyLine_progress];
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
                textBlock : itemDiscoveryText.text,
                replace : false,
                textAndColorArray : { word : 'ALL', color : itemDiscoveryText.color},
            })
            saveData.Uncoverded.ItemDiscovery[ItemID] = true;
        }
    }
}
function damageAndDeathParent(amount, atackMethod, instaKill = false){
    function DeadCalculator() {
        if (character.Health <= 0 || character.Health - amount <= 0 || instaKill) {
            return true;
        }
    }
    if (DeadCalculator()) {
        saveData.DeathReason = atackMethod;
        saveData.IsDead = true;
        saveData.AtDeathScreen.AtDeath_storyLine_progress = saveData.current_storyLine_progress;
        saveData.AtDeathScreen.AtDeath_Chapter_progress = saveData.current_chapter_progress;
        saveData.AtDeathScreen.AtDeath_Title_progress = saveData.current_title_progress;
        stopTyping = true;
        nextScene(saveData);
    } else if(!instaKill){
        character.getDamage(amount);
    }
}
function InventoryItemClickedHandler(item_id){
    switch(item_id){
        case 1:
            console.log('you died id=500')
            damageAndDeathParent(undefined,'you used the soul redeemer',true)
            break;
        case 4:
            //  a green gemstone something
            break;
    }
}
function character_Description(saveData, Choices_Made){
    //  check wat in Side-Menu2 is, if not the same as character_Description_Text_Final replace it with It
    Side_Menu2.dataset.visible = saveData.IsDead ? 'false' : 'true'; //  show or hide the character description
    if (Side_Menu2.innerHTML !== saveData.character_Description_Text_Final && saveData.current_storyLine_progress >= 3 | saveData.current_chapter_progress >=1){
        Side_Menu2.innerHTML = saveData.character_Description_Text_Final;
        console.log('saveData.character_Description_Text_Final', saveData.character_Description_Text_Final);
    }
}
function Effect_Bar_progress(saveData, CurrentDebuffBar){
    //  check wat in Side-Menu4 is, if not the same as Debuff_SpashText_Final replace it with It 
    Side_Menu4.dataset.visible = saveData.IsDead ? 'false' : 'true'; //  show or hide the debuff bar
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
    if (saveData.IsDead) document.getElementById('inventory').style.display = 'none'; // Hide inventory if player is dead
}

function addItemToInventory(saveData, itemId, newQuantity) {
    // Find the item in ListOfAllItems by itemId
    const itemToAdd = saveData.ListOfAllItems.find(item => item.id === itemId);
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
                quality: itemToAdd.quality
            });
        }
        // Call function to update the inventory display
        populateInventory(saveData, 1);
    } else {
        console.error(`Item with id ${itemId} not found in ListOfAllItems.`);
    }
}
function DeBuffParentFunction(effect, amount, saveData, elementId){
    //character.applyDebuff(effect, amount, saveData, elementId)
    deBuffEffectHandler(effect, amount, saveData, elementId);
}
function deBuffEffectHandler(effect, amount, saveData, element){
    let Confused_Text = saveData.storyLine_progress_Confused[saveData.current_chapter_progress][saveData.current_storyLine_progress]["sceneText"];
    let Confused_Title = saveData.storyLine_progress_Confused[saveData.current_chapter_progress][saveData.current_storyLine_progress]["sceneTitle"];
    switch(effect){
        case 'Weakened':
            break;
        case 'Slowed':
            break;
        case `Blinded`:
            element.style.opacity = amount / 100;
            break;
        case 'Confused':
            break;
        case 'Silenced':
            break;
        case 'Crippled':
            break;
        case 'Vulnerable':
            break;
        case 'Disarmed':
            break;
        case 'Diseased':
            break;
        case 'Fear':
            break;
        case 'Stunned':
            break;
        case 'Hexed':
            break;
        case 'Drained':
            break;
        case 'Sapped':
            break;
        case 'Marked':
            break;
        case 'Burning':
            break;
        case 'Chilled':
            break;
        case 'Rooted':
            break;
        case "pacified":
            // not able to be agressief
            let IsPacified = true;
            break;
        case 'Cursed':
            break;
        case 'Fatigue':
            break;
        case 'Confusion':
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

            ButtonPressed(saveData, saveData.Choices_Possible_Confused);
            break;
        case 'MAXeffect':
            break;
    }
}
function section_title_progress(current_section_title) {
    choices_section_title.innerHTML = current_section_title;// print current scection title
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
    let title_scene = currentSceneName;
    let scene_text = currentSceneText;
    addTextFullFeature({
        textBlock : scene_text,
        elementId : '.main_section',
        speed : 35,
    })
    saveData.DeathReason = undefined;
    console.log('currentSceneName', title_scene);
    console.log('currentSceneText', scene_text);
}
function navigateStory(saveData, { direction = 'next', level = 'scene', isDead = false }) {
    let [chapter, scene] = saveData.currrentScene.split('_').map(Number);
    if (chapter !== 'Death') {
        chapter = parseInt(chapter);
        scene = parseInt(scene);
    }
    // death handling
    if (isDead) {
        saveData.currrentScene = saveData.LastSafeScene || "0_0";
        clearButtonContent();
        Render_Scene(saveData, true);
        return;
    }
    // SaveScene handling
    if (saveData.currrentScene == saveData.safeScenes?.[saveData.currrentScene]) saveData.LastSafeScene = `${chapter}_${scene}`;

    let lastChoiceIndex = saveData.Choices_Made[chapter].length - 1;
    let LastButtonPressed = saveData.Choices_Made[chapter][lastChoiceIndex];
    

    const sceneKeys = Object.keys(saveData.scenes)
        .filter(key => key.startsWith(`${chapter}_`))
        .map(key => parseInt(key.split('_')[1]))
        .sort((a, b) => a - b);

    if (level === 'scene') {
        const sceneData = saveData.scenes[saveData.currrentScene];
        if (!Object.values(sceneData?.options)?.find(b => b.ButtonNumber === LastButtonPressed)) {
            console.warn("No valid options available.");
            return;
        }
        let currentIndex = sceneKeys.indexOf(scene);
        const options = Object.values(saveData.scenes[saveData.currrentScene].options)?.find(b => b.ButtonNumber === LastButtonPressed);
        if (direction === 'next') {
            if (currentIndex < sceneKeys.length - 1) {
                
                // Move to the next scene
                scene = options.next_scene? options.next_scene.split('_')[1] : sceneKeys[currentIndex + 1];
                // Perform custom action if specified
                // if (options.action) performSceneAction(options.action, saveData);
                // FIXME: need to fic probelm here with going back or wteverver
            } else {
                return navigateStory(saveData, { direction: 'next', level: 'chapter' });
            }
        } else if (direction === 'previous') {
            if (currentIndex > 0) {
                scene = options.next_scene? options.next_scene.split('_')[1] : sceneKeys[currentIndex + 1];
            } else {
                return navigateStory(saveData, { direction: 'previous', level: 'chapter' });
            }
        }

        saveData.currrentScene = `${chapter}_${scene}`;
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
        saveData.currrentScene = `${chapter}_${scene}`;
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

function nextChapter(saveData, isDead = false) {
    navigateStory(saveData, { direction: 'next', level: 'chapter', isDead });
}

function previousChapter(saveData) {
    navigateStory(saveData, { direction: 'previous', level: 'chapter' });
}

/*
function nextScene(saveData) {
    // Increment the current scene progress only if there are more scenes available
    // current place > next place
    let [ChapterStr, SceneStr] =  saveData.currrentScene.split('_');
    let Chapter = parseInt(ChapterStr);
    let Scene = parseInt(SceneStr);
    let current_storyLine_progress = Scene;
    let current_chapter_progress = Chapter;
    let lastChoiceIndex = saveData.Choices_Made[current_chapter_progress].length - 1;
    let LastButtonPressed = saveData.Choices_Made[current_chapter_progress][lastChoiceIndex];
    if (saveData.safeScenes[saveData.currrentScene]){
        saveData.LastSafeScene = saveData.currrentScene;
    }
    if (saveData.isDead){
        nextChapter(saveData, true);
        return;
    }else if(current_chapter_progress == 'Death'){
        current_chapter_progress = saveData.LastSafeScene.split('_')[0];
        current_storyLine_progress = saveData.LastSafeScene.split('_')[1];
        saveData.currrentScene = saveData.LastSafeScene;
        //saveData.Choices_Made[saveData.LastSafeChapter] = [undefined];    //  unsure about this
        
        character.Resurrect();
        console.log('id=501 Reset to last safe place');
        Render_Scene(saveData, true);
    }
    // DisplayDebuffTextWithColors(saveData, 'Fatigue', -1); // Display Controlbar text with color
    // do check if scene is inside the chapter
    if (saveData.scenes[saveData.currrentScene].sceneID < Object.keys(saveData.scenes).filter(sceneKey => sceneKey.startsWith(`0_`)).length -1 && current_chapter_progress == 0) {
        // FIXME ^ here
        saveData.current_storyLine_progress++;
        saveData.currrentScene = `${current_chapter_progress}_${current_storyLine_progress+1}`;
        console.log('pressed NextScene id=5')
    }else if(saveData.scenes[saveData.currrentScene].sceneID < Object.keys(saveData.scenes).filter(sceneKey => sceneKey.startsWith(`1_`)).length && current_chapter_progress == 1){
        switch(current_storyLine_progress){
            case 0:
                saveData.current_storyLine_progress = LastButtonPressed - 1; //from 1 to 5 are scene other area
                saveData.currrentScene = `${current_chapter_progress}_${LastButtonPressed - 1}`;
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 7:
            case 8:
            case 9:
            case 10:
                saveData.current_storyLine_progress += 5;
                saveData.currrentScene = `${current_chapter_progress}_${current_storyLine_progress+5}`;
                break;
            case 6:
                if(LastButtonPressed == 2){
                    saveData.current_storyLine_progress += 6;
                    saveData.currrentScene = `${current_chapter_progress}_${current_storyLine_progress+6}`;
                }else {
                    saveData.current_storyLine_progress += 5;
                    saveData.currrentScene = `${current_chapter_progress}_${current_storyLine_progress+5}`;
                }
                break;
        }
    } else {
        // Handle the case when there are no more scenes in the current chapter
        console.log('No more scenes available in this chapter');
        nextChapter(saveData);
        return;
    }
    // Re-render the story with updated saveData
    console.log('id=9');
    clearButtonContent();
    Render_Scene(saveData, true);
}

function previousScene(saveData) {
    // Decrement the current scene progress only if it's not the first scene
    let [ChapterStr, SceneStr] =  saveData.currrentScene.split('_');
    let Chapter = parseInt(ChapterStr);
    let Scene = parseInt(SceneStr);
    if (Scene > 0 && Chapter == 0) {
        saveData.currrentScene = Chapter + '_' + ( Scene -1 );
        console.log('pressed previousScene')
    }else if(Scene > 0 && Chapter == 1){
        switch(Scene){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                Scene = 0;
                saveData.currrentScene = `${Chapter}_0`;
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                Scene -= 5;
                saveData.currrentScene = `${Chapter}_${ Scene -5 }`;
                break;
            case 12:
                Scene -= 6;
                saveData.currrentScene = `${Chapter}_${ Scene -6 }`;
        }
            
    }else {
        // Handle the case when it's already the first scene
        console.log('Already at the beginning of the chapter');
        previousChapter(saveData);
    }
    // Re-render the story with updated saveData
    clearButtonContent();
    Render_Scene(saveData, true);
}

function nextChapter(saveData, IsDead = false) {
    // Increment the current chapter progress only if there are more chapters available
    let [ChapterStr, SceneStr] =  saveData.currrentScene.split('_');
    let Chapter = parseInt(ChapterStr);
    let Scene = parseInt(SceneStr);
    if(IsDead){
        saveData.current_storyLine_progress = 0; // Reset the scene progress to start of the new chapter
        saveData.current_chapter_progress = "Death";
    }
    if (Chapter < Object.keys(saveData.scenes).length - 1) {
        saveData.current_storyLine_progress = 0; // Reset the scene progress to start of the new chapter
        saveData.current_chapter_progress++;
        saveData.current_title_progress++;
        saveData.currrentScene = ( Chapter + 1 ) + '_0';
        //console.log('AllSafePlaces',saveData.AllSafePlaces[saveData.current_chapter_progress][saveData.current_storyLine_progress]);
        if (saveData.safeScenes[saveData.currrentScene] == 1){
            saveData.LastSafeChapter = saveData.currrentScene;
        }
        console.log('Next Chapter');
    } else {
        // Handle the case when there are no more chapters
        console.log('No more chapters available or dying');
    }
    // Re-render the story with updated saveData
    clearButtonContent();
    Render_Scene(saveData,true);
}

function previousChapter(saveData) {
    // Decrement the current chapter progress only if it's not the first chapter
    if (saveData.current_chapter_progress > 0) {
        saveData.current_chapter_progress--;
        saveData.current_title_progress--;
        saveData.current_storyLine_progress = 0; // Reset the scene progress to start of the previous chapter
        console.log('Previous Chapter');
    } else {
        // Handle the case when it's already the first chapter
        console.log('Already at the beginning of the story');
    }
    // Re-render the story with updated saveData
    Render_Scene(saveData, true);
}
*/
function getItemDiscoveryText(id){
    return saveData.ItemDiscoveryText.find(entry => entry.id === id);
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

    
    // Use `descriptionTemplate` with replacements
    /*
    let descriptionTemplate = saveData.character_Description_Text[lastChoiceIndex].charachterDefining;
    let charachterDefining = descriptionTemplate
    .replace(/{value}/g, value)
    .replace(/{valueSTRING\[(\d+)\]}/g, (_, index) => {
        return valueSTRING[parseInt(index, 10)];
    });
    */
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
function Choices_calculator(saveData){
    let [ChapterStr, SceneStr] =  saveData.currrentScene.split('_');
    let Chapter = parseInt(ChapterStr);
    let Scene = parseInt(SceneStr);

    let current_storyLine_progress = Scene
    let current_chapter = Chapter
    let lastChoiceIndex = saveData.Choices_Made[Chapter].length - 1;
    let LastButtonPressed = saveData.Choices_Made[Chapter][lastChoiceIndex];
    let value;
    let valueS;
    let charachterDefining;
    if(saveData.isDead){
        value = Object.values(saveData.scenes[saveData.currrentScene].options)
            .find(opt => opt.ButtonNumber === LastButtonPressed)?.ButtonText || '';
        // value = saveData.Choices_Possible[current_chapter][LastButtonPressed];
        // valueS = saveData.ALT_Choices_Possible[current_chapter][LastButtonPressed];
        valueS = Object.values(saveData.scenes[saveData.currrentScene].ALT_options)
            .find(opt => opt.ButtonNumber === LastButtonPressed)?.ButtonText || '';
    }else{
        // value = saveData.Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed];
        value = Object.values(saveData.scenes[saveData.currrentScene].options)
            .find(opt => opt.ButtonNumber === LastButtonPressed)?.ButtonText || '';
        try{
            // valueS = saveData.ALT_Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed];
            valueS = Object.values(saveData.scenes[saveData.currrentScene].ALT_options)
                .find(opt => opt.ButtonNumber === LastButtonPressed)?.ButtonText || '';

        }catch(error){
            console.log('fuck valueS', error);
        }
        
    }
    switch (current_chapter){
        case 'Death':
            saveData.IsDead = false;
            nextScene(saveData);
            break;
        case 0:
            let descriptionTemplate = saveData.character_Description_Text[lastChoiceIndex].charachterDefining;
            switch (lastChoiceIndex) {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    characterMaker(saveData, lastChoiceIndex, value, valueS)
                    break;
            }
            
            nextScene(saveData);
            break;
        case 1:
            switch(current_storyLine_progress){
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    nextScene(saveData)
                    break;
                case 6:
                    switch(LastButtonPressed){
                        case 2:
                            //  Investigate the hidden alcove
                            nextScene(saveData);//  I.E. scene 12
                            break;
                        case 3:
                            character.rested(10);
                            DeBuffParentFunction('Pacified', 20, saveData, ".choices_section")
                            DeBuffParentFunction('Confusion', 20, saveData, ".choices_section")
                            //  Listen to the soothing melody of the flower
                            break;
                        case 4:
                            //  Continue exploring the passage
                            nextScene(saveData);
                            break;
                        case 5:
                            character.rested(20)
                            break;
                        case 6:
                            //  Feel the texture of the moss beneath your fingertips
                            main_section.appendChild(document.createElement('br'));
                            manageHiddenInfo(saveData, true, 0)
                            break;
                            // TODO: FT savadata
                    }
                    break;
                case 7:
                    switch(LastButtonPressed){
                        case 2:
                            //  you fall in the water and die if requirement is not activated if it is aquire mysterious figure
                            break;
                        case 3:
                            //  nothing happens
                            break;
                        case 4:
                            //  the stone disolves in the water
                            break;
                        case 5:
                            //  get silence back
                            break;
                        case 6:
                            //  get damage
                            damageAndDeathParent(15,'of an ambiguous pond of glazend color')
                            break;
                    }
                    break;
                case 8:
                    switch(LastButtonPressed){
                        case 2:
                            //  feel drouwsy as not anouth mana ( player will not get info as comprehencion is to low )
                            break;
                        case 3:
                            //  comprencion too low
                            break;
                        case 4:
                            //  nextcene
                            nextScene(saveData);
                            break;
                        case 5:
                            //  +? in theoretical int
                            break;
                        case 6:
                            //  +? in practical int
                            break;
                    }
                    break;
                case 9:
                    switch(LastButtonPressed){
                        case 2:
                            //  Follow the stream to its source
                            nextScene(saveData);
                            break;
                        case 3:
                            //  
                            break;
                        case 4:
                            //  
                            break;
                        case 5:
                            //  
                            break;
                        case 6:
                            //  
                            break;
                    }
                    break;
                case 10:
                    switch(LastButtonPressed){
                        case 2:
                            //  
                            break;
                        case 3:
                            //  
                            break;
                        case 4:
                            //  
                            break;
                        case 5:
                            //  
                            break;
                        case 6:
                            //  
                            break;
                    }
                    break;
                case 11:
                    break;
                case 12:
                    switch(LastButtonPressed){
                        case 2:
                            //  
                            break;
                        case 6:
                            manageHiddenInfo(saveData, undefined, undefined, 4)
                            break;
                    }
                    break;
            }
            break;
            //  TODO add special sircumstances for 7 to 10 (sometimes go to other scene or add to inventory )
            /*
                7 : { 1 : "Leave the area undisturbed", 2 : "Approach the figure cautiously.", 3 : "Sit quietly by the pool and observe.", 4 : "Cast a stone into the pool.", 5 : "Attempt to communicate with the figure.", 6 : "Feel the cool crystal walls with your hands."},
                8 : { 1 : "Leave the area undisturbed", 2 : "Reach out to touch the ancient runes.", 3 : "Atempt to read the chant or incantation.", 4 : "Continue down the corridor.", 5 : "Meditate in front of the runes.", 6 : "Feel the texture of the walls for any irregularities."},
                9 : { 1 : "Leave the area undisturbed", 2 : "Follow the stream to its source.", 3 : "Offer a small offering of food to the fish.", 4 : "Take a moment to admire the surroundings.", 5 : "Feel the water with your hands.", 6 : "Listen to the soothing sound of the rushing stream."},
                10 : { 1 : "Leave the area undisturbed", 2 : "Sit amongst the mushrooms and observe.", 3 : "Reach out to touch the mushrooms.", 4 : "Inhale deeply, breathing in the aroma.", 5 : "Feel the texture of the ground beneath your feet.", 6 : "Listen for any sounds emanating from the grove."},
            */
    }
}