
function story(saveData){

    //  Start of story by initialising progress/
    let current_storyLine_progress = saveData.current_storyLine_progress
    let current_title_progress = saveData.current_title_progress
    let current_storyLine = saveData.storyLine_progress[saveData.current_chapter_progress][current_storyLine_progress]
    let current_title = saveData.title_progress[current_title_progress]
    let LatestsaveFile = saveData;

    //  make a save of latest version of saveData
    if(!ResetFile){
        //let SaveForestSection0 = SaveForest['section0'];
        SaveForest['section0'] = LatestsaveFile;
        sessionStorage.setItem('TempLatestSave',JSON.stringify(LatestsaveFile));
        //console.log('SaveForest:',JSON.parse(SaveForest))
        localStorage.setItem('SaveForest', JSON.stringify(SaveForest));
    }
    ButtonPressed(saveData, saveData.Choices_Possible);    //  print current Buttons
    manageHiddenInfo(saveData, false);  //  hides info if need be
    title_progress(current_title,current_title_progress)    //  print current title
    scene_progress(current_storyLine,current_storyLine_progress, saveData.DeathReason)    //  print current scene text
    // Initialize the first page of the inventoryload_games_save
    populateInventory(saveData,1);
    choices_section_title.innerHTML = saveData.Buttons_section_title[saveData.current_chapter_progress][saveData.current_storyLine_progress];// print current scection title
    Side_Menu4.dataset.visible = 'true';
    //DisplayDebuffTextWithColors(saveData,)
    
    function getButtonValues(saveData) {
        const buttonValues = [];
        for (const buttonValue of saveData.Buttons) {
            let chapter = saveData.Choices_Possible[saveData.current_chapter_progress];
            let scene = chapter[saveData.current_storyLine_progress];
            let value;
            if(saveData.IsDead){
                value = chapter[buttonValue];
                
            }else{
                value = scene[buttonValue];
            }
            if (value) {
                console.log('value id=12',value)
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
                        console.log("Choices_Made before change id=253 ", saveData.Choices_Made[saveData.current_chapter_progress]);
                        saveData.Choices_Made[saveData.current_chapter_progress].pop();
                        console.log("Choices_Made after change id=254 ", saveData.Choices_Made[saveData.current_chapter_progress]);
                        previousScene(saveData);
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        console.log("Choices_Made before change id=261 ", saveData.Choices_Made[saveData.current_chapter_progress]);
                        saveData.Choices_Made[saveData.current_chapter_progress].push(buttonValue);
                        Choices_calculator(saveData);
                        console.log("Choices_Made after change id=262 ", saveData.Choices_Made[saveData.current_chapter_progress]);
                        break;
                    case 7:
                        console.log("Choices_Made before change id=255 ", saveData.Choices_Made[saveData.current_chapter_progress]);
                        saveData.Choices_Made[saveData.current_chapter_progress].push(buttonValue);
                        console.log("Choices_Made after change id=256 ", saveData.Choices_Made[saveData.current_chapter_progress]);
                        nextScene(saveData);
                        break;
                }
            } else {
                stopTyping = true;
                console.log('current_storyLine_progress id=8', saveData.current_storyLine_progress);
                slowTypingText(saveData,saveData.storyLine_progress[saveData.current_chapter_progress][saveData.current_storyLine_progress]['sceneText'], '.main_section', undefined, undefined, true);
                slowTypingText(saveData,saveData.title_progress[saveData.current_title_progress]['title_story_' + saveData.current_title_progress], '.Quest_Title', undefined, undefined, true);
                isCurrentlyPrinting = false;
                console.log('Print everything for scene number ', saveData.current_storyLine_progress);
                
            }
        }
    }
    function ButtonPressed(saveData, infogetter) {
        const buttonValues = getButtonValues(saveData);
        for (const buttonValue of buttonValues) {
            const button = document.querySelector('.Sh_' + buttonValue);
            if (button) {
                // Get the value of the button from the scene
                let chapter = infogetter[saveData.current_chapter_progress];
                let scene = chapter[saveData.current_storyLine_progress];
                let value;
                if(saveData.IsDead){
                    value = chapter[buttonValue];
                }else{
                    value = scene[buttonValue];
                }
                // Set the inner HTML of the button
                button.innerHTML = value;
                // Add event listener to the button
                const handler = buttonClickHandler(buttonValue, saveData);
                button.removeEventListener("click", button.handlerReference); // Remove previous listener to avoid duplicates
                button.addEventListener("click", handler);
                button.handlerReference = handler; // Store the reference to the handler function
                console.log('Event listener added for button ' + buttonValue); // Logging the addition of event listener
            }
        }
    }
    function manageHiddenInfo(saveData, revealInfo,HiddenTextID) {
        const current_storyLine = saveData.current_storyLine_progress;
        const current_chapter = saveData.current_chapter_progress;
        // Check if Buttons_Hidden data exists for the current chapter and story line
        const Buttons_Hidden = saveData.Buttons_Hidden[current_chapter]?.[current_storyLine];
        if (Buttons_Hidden) {
            // Iterate over the hidden button values for the current scene
            Buttons_Hidden.forEach(buttonValue => {
                const button = document.querySelector('.Sh_' + buttonValue);
                if(saveData.Uncoverded.HiddenButton[buttonValue] == true){
                    button.style.display = "block";
                    return;
                }
                if (button) {
                    // Set button display based on revealInfo condition
                    button.style.display = revealInfo ? "block" : "none";
                    if (revealInfo){saveData.Uncoverded.HiddenButton[buttonValue] = true};
                }
            });
            if(HiddenTextID >= 0){
                const Text_Hidden = saveData.HiddenStoryLine[saveData.current_chapter_progress][saveData.current_storyLine_progress];
                if(saveData.Uncoverded.HiddenText[HiddenTextID] == false) {
                    addTextWithTempColor('.main_section',Text_Hidden[HiddenTextID],'blue',false)
                    saveData.Uncoverded.HiddenText[HiddenTextID] = true;
                }else{
                    //main_section.textContent += Text_Hidden[HiddenTextID];
                }
            }
        } else {
            console.log(`No hidden buttons defined for chapter ${current_chapter} and scene ${current_storyLine}`);
        }
    }
    function damageAndDeathParent(amount, atackMethod, instaKill = false){
        if(character.Health <= 0 || character.Health - amount <= 0 || instaKill){
            //DiedScreen(saveData,atackMethod);
            saveData.DeathReason = atackMethod;
            saveData.IsDead = true;
            nextScene(saveData, true);
        }else if(!instaKill){
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
    // Function to populate inventory grid based on current page
    function populateInventory(saveData,pageNumber) {
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
        character.applyDebuff(effect, amount, saveData, elementId)
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
                IsPacified = true;
                break;
            case 'Cursed':
                break;
            case 'Fatigue':
                break;
            case 'Confusion':
                // change text to confused text
                console.log('activate confusion')            
                slowTypingText(saveData,Confused_Text, '.main_section', undefined, 35);
                slowTypingText(saveData,Confused_Title, '.Quest_Title');
                ButtonPressed(saveData, saveData.Choices_Possible_Confused);
                break;
            case 'MAXeffect':
                break;
        }
    }
    function title_progress(current_title,current_title_progress) {
        let title_story = current_title['title_story_'+current_title_progress]
        slowTypingText(saveData,title_story,'.Quest_Title');       // Put the content on the left and the place where it needs to go on the right
        console.log('title Chapter',title_story)
        console.log('current_title',current_title);
        console.log('current_title_progress', current_title_progress);
    }
    function scene_progress(current_storyLine,current_storyLine_progress, DeathReason) {
        let title_scene = current_storyLine['sceneName']
        let scene_text;
        if(DeathReason){
            scene_text = current_storyLine['sceneText'] + DeathReason;
        }else{
            scene_text = current_storyLine['sceneText'];
        }
        slowTypingText(saveData,scene_text,'.main_section',undefined, 35);     // Put the content on the left and the place where it needs to go on the right + index + speed
        saveData.DeathReason = undefined;
        console.log('title Scene',title_scene)                          
        //console.log('scene_text',scene_text)
        console.log('current_storyLine',current_storyLine);
        console.log('current_storyLine_progress', current_storyLine_progress);
    }
    function nextScene(saveData) {
        // Increment the current scene progress only if there are more scenes available
        // current place > next place
        let lastChoiceIndex = saveData.Choices_Made[saveData.current_chapter_progress].length - 1;
        let LastButtonPressed = saveData.Choices_Made[saveData.current_chapter_progress][lastChoiceIndex];
        if (saveData.IsDead){
            nextChapter(saveData, true);
            return;
        }else if(saveData.current_chapter_progress == 'Death'){
            saveData.current_chapter_progress = saveData.LastSafeChapter;
            saveData.current_storyLine_progress = saveData.LastSafeScene;
            //saveData.Choices_Made[saveData.LastSafeChapter] = [undefined];    //  unsure about this
            ResetEffectBarToDefault(saveData);
            character.Resurrect();
            console.log('id=501 Reset to last safe place');
        }
        if (saveData.current_storyLine_progress < Object.keys(saveData.storyLine_progress[saveData.current_chapter_progress]).length - 1 && saveData.current_chapter_progress == 0) {
            saveData.current_storyLine_progress++;
            console.log('pressed NextScene id=5')
        }else if(saveData.current_storyLine_progress < Object.keys(saveData.storyLine_progress[saveData.current_chapter_progress]).length - 1 && saveData.current_chapter_progress == 1){
            switch(saveData.current_storyLine_progress){
                case 0:
                    saveData.current_storyLine_progress = LastButtonPressed - 1; //from 1 to 5 are scene other area
                    saveData.LastSafeScene = saveData.current_storyLine_progress;
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    saveData.current_storyLine_progress += 5;
                    break;
                case 6:
                    if(LastButtonPressed == 2){
                        saveData.current_storyLine_progress += 6;                    
                    }else {
                        saveData.current_storyLine_progress += 5;
                    }
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                    saveData.current_storyLine_progress += 5;
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
        story(saveData);
    }
    
    function previousScene(saveData) {
        // Decrement the current scene progress only if it's not the first scene
        if (saveData.current_storyLine_progress > 0 && saveData.current_chapter_progress == 0) {
            saveData.current_storyLine_progress--;
            console.log('pressed previousScene')
        }else if(saveData.current_storyLine_progress > 0 && saveData.current_chapter_progress == 1){
            switch(saveData.current_storyLine_progress){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    saveData.current_storyLine_progress = 0;
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    saveData.current_storyLine_progress -= 5;
                    break;
                case 12:
                    saveData.current_storyLine_progress -= 6;
            }
                
        }else {
            // Handle the case when it's already the first scene
            console.log('Already at the beginning of the chapter');
            previousChapter(saveData);
        }
        // Re-render the story with updated saveData
        clearButtonContent();
        story(saveData);
    }
    
    function nextChapter(saveData, IsDead = false) {
        // Increment the current chapter progress only if there are more chapters available
        if(IsDead){
            saveData.current_storyLine_progress = 0; // Reset the scene progress to start of the new chapter
            saveData.current_chapter_progress = "Death";
        }
        if (saveData.current_chapter_progress < Object.keys(saveData.storyLine_progress).length - 1) {
            saveData.current_storyLine_progress = 0; // Reset the scene progress to start of the new chapter
            saveData.current_chapter_progress++;
            if(saveData.current_chapter_progress != "Death"){
                saveData.LastSafeChapter = saveData.current_chapter_progress;
            }
            saveData.current_title_progress++;
            console.log('Next Chapter');
        } else {
            // Handle the case when there are no more chapters
            console.log('No more chapters available or dying');
        }
        // Re-render the story with updated saveData
        clearButtonContent();
        story(saveData);
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
        story(saveData);
    }
    function Choices_calculator(saveData){
        let current_storyLine_progress = saveData.current_storyLine_progress;
        let current_chapter = saveData.current_chapter_progress;
        let lastChoiceIndex = saveData.Choices_Made[saveData.current_chapter_progress].length - 1;
        let LastButtonPressed = saveData.Choices_Made[saveData.current_chapter_progress][lastChoiceIndex];
        let value;
        let valueS;
        let charachterDefining;
        if(saveData.IsDead){
            value = saveData.Choices_Possible[current_chapter][LastButtonPressed];
            valueS = saveData.ALT_Choices_Possible[current_chapter][LastButtonPressed];
        }else{
            value = saveData.Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed];
            valueS = saveData.ALT_Choices_Possible[current_chapter][current_storyLine_progress][LastButtonPressed];
        }
        switch (current_chapter){
            case 'Death':
                saveData.IsDead = false;
                nextScene(saveData);
                break;
            case 0:
                switch (lastChoiceIndex) {
                    case 2:
                        character.eye_Color = value;
                        charachterDefining = "Your "+value+" eyes reveal a captivating depth, while the rest of your features remain undisclosed, shrouded in mystery.";
                        Side_Menu2.innerHTML = charachterDefining;
                        addTextWithTempColorS('.Side-Menu2',charachterDefining,value,valueSTRING,valueS,true,false,undefined)
                        valueSTRING.push(value);
                        break;
                    case 3:
                        character.hair_style = value;
                        charachterDefining = "Your "+valueSTRING[0]+" eyes and your "+value+" stylish hair reveal a captivating essence, yet the remainder of you remains veiled in mystery."
                        Side_Menu2.innerHTML = charachterDefining;
                        addTextWithTempColorS('.Side-Menu2',charachterDefining,value,valueSTRING,valueS,true,false,undefined)
                        valueSTRING.push(value);
                        break;
                    case 4:
                        character.skin_complexion = value;
                        charachterDefining = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, and your "+value+" complexion exude a captivating essence, leaving the rest of you shrouded in mystery."
                        Side_Menu2.innerHTML = charachterDefining;
                        addTextWithTempColorS('.Side-Menu2',charachterDefining,value,valueSTRING,valueS,true,false,undefined)
                        valueSTRING.push(value);
                        break;
                    case 5:
                        character.stature = value;
                        charachterDefining = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, your "+valueSTRING[2]+" complexion, and your "+value+" stature combine to present a captivating essence, yet the remainder of you remains shrouded in mystery."
                        Side_Menu2.innerHTML = charachterDefining;
                        addTextWithTempColorS('.Side-Menu2',charachterDefining,value,valueSTRING,valueS,true,false,undefined)
                        valueSTRING.push(value);
                        break;
                    case 6:
                        character.attire = value;
                        charachterDefining = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, your "+valueSTRING[2]+" complexion, your "+valueSTRING[3]+" stature, and your "+value+" attire collectively emanate a captivating essence, leaving the rest of you unexplored."
                        Side_Menu2.innerHTML = charachterDefining;
                        addTextWithTempColorS('.Side-Menu2',charachterDefining,value,valueSTRING,valueS,true,false,undefined)
                        valueSTRING.push(value);
                        break;
                    case 7:
                        character.gender = value;
                        charachterDefining = "Your "+valueSTRING[0]+" eyes, your "+valueSTRING[1]+" stylish hair, your "+valueSTRING[2]+" complexion, your "+valueSTRING[3]+" stature, and your "+valueSTRING[4]+" attire collectively emanate a captivating essence. While your gender is "+value+", your race remains a mystery, awaiting discovery."
                        Side_Menu2.innerHTML = charachterDefining;
                        addTextWithTempColorS('.Side-Menu2',charachterDefining,value,valueSTRING,valueS,true,false,undefined)
                        valueSTRING.push(value);
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
                                addItemToInventory(saveData,4,1);
                                addTextWithTempColor('.main_section',"You have found an uncommon green gemstone nestled within the intricately carved wooden box. Its hue is vibrant and captivating, catching the dim light with a mesmerizing sparkle. This discovery adds a unique and valuable treasure to your journey through the mossy passage.",'green',false)
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



    
    
    



return saveData
}