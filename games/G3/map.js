// map.js
function setupCanvas(canvas, width, height) {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Scale everything
    return ctx;
}
function ChangeStatus(nodes, ID = [], status = []) {
    // Validate inputs
    if (!Array.isArray(nodes) || !Array.isArray(ID) || !Array.isArray(status)) {
        console.error('ChangeStatus: All parameters must be arrays');
        return nodes;
    }
    
    if (ID.length !== status.length) {
        console.error('ChangeStatus: ID and status arrays must have the same length');
        return nodes;
    }
    
    // Create a copy of nodes to avoid mutating the original
    const updatedNodes = nodes.map(node => ({ ...node }));
    
    // Update status for each specified ID
    ID.forEach((id, index) => {
        const nodeIndex = updatedNodes.findIndex(node => node.id === id);
        if (nodeIndex !== -1) {
            updatedNodes[nodeIndex].status = status[index];
            console.log(`Updated node ${id} status to: ${status[index]}`);
        } else {
            console.warn(`Node with ID ${id} not found`);
        }
    });
    
    return updatedNodes;
}

/** Handles the creation of a map width nodes and player progress.
 * 
 * 1. Make Player progress of the inside tower onto the left of the screen.
 * 2. Make map of the current dungeon.
 * 
 */
function CreateMap({canvasElement, canvasPosition = {width: 1000, height: 600}, nodes = [], playerProgress = '', isClickable = true}) {
    const canvas = document.querySelector(canvasElement);
    const ctx = setupCanvas(canvas, canvasPosition.width, canvasPosition.height);
    const NODE_RADIUS = 20;
    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw lines first
        for (let i = 0; i < nodes.length - 1; i++) {
            const from = nodes[i];
            const to = nodes[i + 1];
            ctx.strokeStyle = "lightgray";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        }
        // Draw nodes
        nodes.forEach(node => {
            const { x, y, id } = node;
            const ProgressType = playerProgress === 'chapter' ?
                Number(JSON.parse(localStorage.getItem('SaveForest') || '{}').DefaultSaveData.currentScene.split('_')[0]) :
                Number(JSON.parse(localStorage.getItem('SaveForest') || '{}').DefaultSaveData.currentScene.split('_')[1]);
            if (ProgressType >= id ) {
            node.status = "completed";
            } else if (ProgressType == (id - 1)) {
            node.status = "available";
            } else {
            node.status = "locked";
            }

            ctx.beginPath();
            ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle =
            node.status === "completed" ? "green" :
            node.status === "available" ? "gray" : "darkgray";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw text/label
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            const Text = node.status === "locked" ? "???" : ' ';
            ctx.fillText(Text, x, y + (node.status === "locked" ? 0 : NODE_RADIUS + 15));
        });
    }
    drawMap();

    
    const tooltip = document.createElement("div");
    tooltip.id = 'tooltip';
    document.querySelector('.main').appendChild(tooltip);
    canvas.addEventListener("mousemove", function (e) {
        const mainRect = document.querySelector('.main').getBoundingClientRect();
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left);
        const mouseY = (e.clientY - rect.top);
        
        let hovered = false;
        
        for (const node of nodes) {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < NODE_RADIUS) {
                tooltip.style.left = `${e.clientX - mainRect.left + 10}px`;
                tooltip.style.top = `${e.clientY - mainRect.top + 10}px`;
                tooltip.innerText = `${node.title}`;
                tooltip.style.visibility = node.status === 'locked' ? 'hidden' : "visible";
                hovered = true;
                break;
            }
        }
        if (!hovered) {
            tooltip.style.visibility = "hidden";
        }
    });

    if (!isClickable) return;
    canvas.addEventListener("click", function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        nodes.forEach(node => {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < NODE_RADIUS) {
                if (node.status !== "locked") {
                    alert(`Entering ${node.title} (ID: ${node.id})`);
                    // You can add: loadLevel(node.id);
                } else {
                    alert(`${node.title} is locked.`);
                }
            }
        });
    });
}