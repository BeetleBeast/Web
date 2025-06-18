function createQTEElements( CustomPosition = {DefaultbarWidth : 600, DefaultbarHeight : 30} ) {

    const Parent = document.querySelector(".main");

    const qtewrapper = document.createElement('div');
    const bar = document.createElement('div');
    const marker = document.createElement('div');
    const resultText = document.createElement('div');
    const perfectZone = document.createElement('div');
    const successZone = document.createElement('div');

    function applyStyles(element, styles = {}) {
        for (const [prop, value] of Object.entries(styles)) {
            element.style[prop] = value;
        }
    }
    // Apply classes and styles to the elements
    qtewrapper.classList.add('qte-wrapper');
    applyStyles(qtewrapper, CustomPosition.qtewrapper || {
        width : '100%',
        textAlign : 'center',
        marginTop : '100px',
    });
    bar.classList.add('qte-bar');
    applyStyles(bar, CustomPosition.bar || {
        position : 'relative',
        width : CustomPosition.DefaultbarWidth + 'px',
        height : CustomPosition.DefaultbarHeight +'px',
        backgroundColor : '#333',
        margin : '0 auto',
        borderRadius : '15px',
        overflow : 'hidden',
    });
    perfectZone.classList.add('qte-zone', 'perfect');
    applyStyles(perfectZone, CustomPosition.perfectZone || {
        position : 'absolute',
        left : '250px',
        width : '100px',
        height : '100%',
        backgroundColor : 'green',
        opacity : '0.6',
    });

    successZone.classList.add('qte-zone', 'success');
    applyStyles(successZone, CustomPosition.successZone || {
        position : 'absolute',
        left : '275px',
        width : '50px',
        height : '100%',
        backgroundColor : 'lime',
        opacity : 1,
    });
    marker.classList.add('qte-marker');
    applyStyles(marker, CustomPosition.marker || {
        position : 'absolute',
        width : '10px',
        height : '100%',
        backgroundColor : 'white',
        left : '0px',
        transition : 'none',
    });
    resultText.classList.add('qte-result');
    applyStyles(resultText, CustomPosition.resultText || {
        fontSize : '24px',
        marginTop : '20px',
    });

    bar.append(successZone, perfectZone, marker);
    qtewrapper.appendChild(resultText);
    qtewrapper.appendChild(bar);
    Parent.appendChild(qtewrapper);
    return {
        marker,
        resultText,
        bar,
        perfectZone,
        successZone,
    }
}
async function startBarQTE(duration = 2000, Input = 'Space', CustomPosition = {}) {
    return new Promise((resolve) => {
        const CreateQTE = createQTEElements( CustomPosition );
        const marker = CreateQTE.marker;
        const resultText = CreateQTE.resultText;
        const bar = CreateQTE.bar;

        const barWidth = bar.offsetWidth;
        const startTime = Date.now();
        let requestId;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            marker.style.left = `${progress * (barWidth - 10)}px`;

            if (progress < 1) {
            requestId = requestAnimationFrame(animate);
            } else {
            endQTE('Fail');
            }
        }
        function flashColor(element, color, duration = 300) {
            const original = element.style.backgroundColor;
            element.style.backgroundColor = color;
            setTimeout(() => {
                element.style.backgroundColor = original;
            }, duration);
        }

        function endQTE(result) {
            cancelAnimationFrame(requestId);
            document.removeEventListener('keydown', keyHandler);
            document.removeEventListener('mousedown', mouseHandler);
            resultText.textContent = result;
            let color;
            // Color feedback
            if (result === 'Perfect!') {
                color = 'lime';
            } else if (result === 'Success') {
                color = 'yellow';
            } else {
                color = 'red';
            }
            flashColor(bar, color);
            
            // TODO: Add resultText to the DOM or display it as needed

            // Optional: Remove QTE after delay
            setTimeout(() => {
                resultText.parentElement.remove();
                resolve(result);
            }, 1000);
        }

        function inputHandler() {
            const markerLeft = marker.offsetLeft;
            const markerCenter = markerLeft + marker.offsetWidth / 2;
            
            const perfectStart = CreateQTE.perfectZone.offsetLeft;
            const perfectEnd = perfectStart + CreateQTE.perfectZone.offsetWidth;

            const successStart = CreateQTE.successZone.offsetLeft;
            const successEnd = successStart + CreateQTE.successZone.offsetWidth;

            if (markerCenter >= perfectStart && markerCenter <= perfectEnd) {
                endQTE('Perfect!');
            } else if (markerCenter >= successStart && markerCenter <= successEnd) {
                endQTE('Success');
            } else {
                endQTE('Fail');
            }
        }
        function keyHandler(e) {
            if (e.code === Input) inputHandler();
        }

        function mouseHandler(e) {
            if (e.button === 0) inputHandler(); // Left mouse click
        }


        document.addEventListener('keydown', keyHandler);
        document.addEventListener('mousedown', mouseHandler)

        requestId = requestAnimationFrame(animate);
    });
}

async function runQTESequence(amountQTE = 1, duration = 2000, Input = 'Space', countDown = 3, CustomPosition = []) {
    const results = [];
    // Create a countdown before starting the QTE sequence
    // TODO: Make it visible to the player
    if (countDown > 0) {
        console.log(`Starting QTE sequence in ${countDown} seconds...`);
        for (let i = countDown; i > 0; i--) {
            console.log(i);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        }
    }
    // Start the QTE sequence
    console.log("Starting QTE sequence with " + amountQTE + " QTEs.");
    for (let i = 0; i < amountQTE; i++) {
        results.push(await startBarQTE(duration, Input, CustomPosition[i])); // Temp template for CustomPosition
    }
    // Process the results of the QTE sequence
    console.log("QTE Results:", results);
    let combo = 0;
    results.forEach(r => {
        if (r === 'Perfect!') combo += 2;
        else if (r === 'Success') combo += 1;
        else combo = 0; // reset combo
    });
    console.log("Combo score:", combo);
    // Display the final result based on the QTE results
    const successCount = results.filter(r => r !== 'Fail').length;
    if (successCount === results.length) {
        if (successCount === 1) { console.log("Player succeeded in 1 QTE, not applying bonus effects."); return;}
        console.log("Player succeeded in all QTEs! adding combo score:", combo);
        // Trigger success animation or effect ( add multiplier score depending on the amount of QTEs )
    } else if (successCount > 0) {
        console.log("Player succeeded in some QTEs.");
        // Trigger partial success effect
    } else {
        console.log("Player failed all QTEs.");
        // Trigger failure effect ( Crittical Failure )
    }
}