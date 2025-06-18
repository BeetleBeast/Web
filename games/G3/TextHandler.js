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
// utility: creates fade-in effect for the main content
function fadeMain() {
    const children = document.querySelectorAll("main > *");
    children.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.animation = `fadeIn 0.6s ease-in-out forwards`;
        el.style.animationDelay = `${0.1 * i}s`;
    });
}
// utility: Set element Color
function setElementColor(element, elementId, defaultColor) {
    const SaveForest =  JSON.parse(localStorage.getItem('SaveForest'));
    const saveData = SaveForest['section0'];
    element.style.color = saveData.isDead && elementId !== '.Quest_Title' ? 'red' : defaultColor;
}
// utility: Generates a unique Token
async function GenRateToken(){
    return Math.random().toString(36).substring(2, 10);
}
// utility: print immediately
async function handlePrintImmediately(element, textBlock, elementId) {
    element.innerHTML = formatText(textBlock);
    isCurrentlyPrinting[elementId] = false;
    clearCursor();
    previousText[elementId] = textBlock;
    return previousText[elementId];
}
// utility: Print Charackters Slowly
async function PrintCharSlow({ textBlock, elementId, element, speed, cursor, currentTypingToken, token, output = '', replace = { anew : false, PastText : ''}}) {
    const formattedText = formatText(textBlock);
    for (let i = 0; i < formattedText.length; i++) {
        if (currentTypingToken[elementId] !== token) {
            // If player clicked while printing
            handlePrintImmediately( element, textBlock );
            return;
        }
        let char = formattedText[i];
        output += char;
        element.innerHTML = replace.anew ? replace.PastText + output : output;
        if (cursor && element) element.appendChild(cursor); // Append cursor after each character
        // add a longer pause after dot or comma
        const delayDuration = (char === '.' || char === ',') ? 400 : speed;
        // typingSound.currentTime = 0; // Reset sound to start
        // typingSound.play().catch(() => {}); // Play typing sound
        await new Promise(resolve => setTimeout(resolve, delayDuration)); // Delay next letter
    }
    if ( cursor ) element.removeChild(cursor); // Remove cursor after typing
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
function clearSpan(elementId) {
    document.querySelectorAll(`.Extra-Span-${[elementId]}`).forEach(c => c.remove());
}
// Utility: Create a fake blinking cursor
function createFakeCursor() {
    const cursor = document.createElement('span');
    cursor.classList.add('fake-cursor');
    cursor.innerHTML = '|';
    return cursor;
}
// Core Function to simulate slow typing effect for text
async function addTextFullFeature({
    elementId,
    textBlock,
    textAndColorArray = {word : [], color : []}, // array of { word: string, color: string }
    speed = 200, 
    printImmediately = false, 
    replace = true,
    addSpan = false,
    tempColorDuration = 0,
    defaultColor = 'azure',
}) {
    // TODO: 1. add sound to it just start when isCurrentlyPrinting is true and it will work
    
    // Set-up Token & cursor
    const token = GenRateToken();
    let cursor;
    currentTypingToken[elementId] = token;
    // Set-up element
    const element = addSpan ? document.createElement('span') : document.querySelector(elementId);
    if(addSpan) {
        element.classList.add(`Extra-Span-${[elementId]}`);
        document.querySelector(elementId).appendChild(element);
    }

    if (replace) element.innerHTML = ''; // Clear the content for replacement
    if (!replace && previousText[elementId] !== undefined ) element.innerHTML = previousText[elementId];
    const SaveForest =  JSON.parse(localStorage.getItem('SaveForest'));
    const saveData = SaveForest['section0'];
    const PrintBoolian = (printImmediately || saveData.Settings.SlowTyping === false || ( previousText[elementId] === textBlock ))

    isCurrentlyPrinting[elementId] = true;

    // Clear old cursors
    clearCursor();
    // Set text color based on death
    setElementColor( element, elementId, defaultColor );
    
    // If the word "ALL" is found in the textAndColorArray, set the color to textBlock instead of the word
    if (textAndColorArray.word == 'ALL') element.style.color = textAndColorArray.color;
    // If printing immediately or slow typing disabled or previous typing is the same
    if (PrintBoolian) {
        handlePrintImmediately( element, textBlock, elementId );
        clearCursor();
    }
    // Handle text and color array
    if (textAndColorArray.word.length > 0 && textAndColorArray.word != 'ALL') {
        applyWordColoring( element, textBlock, textAndColorArray );
        return;
    }
    // Create Fake cursor
    if (!printImmediately) {
        cursor = createFakeCursor(); // Create a fake cursor
        if (textAndColorArray.color.length == 0) {
            element.appendChild(cursor)
            // const typingSound = new Audio('path/to/typing-sound.mp3'); // Replace with actual sound file path when implemented
        }
    }
    // Slow typing character by character
    if (!PrintBoolian) await PrintCharSlow({ textBlock, elementId, element, speed, cursor, currentTypingToken, token })
    // Typing finished, clear token
    if (currentTypingToken[elementId] === token) {
        previousText[elementId] = textBlock;
        delete currentTypingToken[elementId];
        clearSpan(elementId);
        isCurrentlyPrinting[elementId] = false;
    }
    // Reset color after a delay if tempColorDuration is greater than 0
    if(tempColorDuration > 0) setTimeout(() => element.style.color = defaultColor, tempColorDuration * 1000);
}