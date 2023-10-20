let VOB1 = document.getElementsByClassName('VarOutputButton0')[0];
let VOB2 = document.getElementsByClassName('VarOutputButton1')[0];
let VOB3 = document.getElementsByClassName('VarOutputButton2')[0];
let VOB4 = document.getElementsByClassName('VarOutputButton3')[0];
let VOB5 = document.getElementsByClassName('VarOutputButton4')[0];
let VOB6 = document.getElementsByClassName('VarOutputButton5')[0];
let VOB7 = document.getElementsByClassName('VarOutputButton6')[0];
let VOB8 = document.getElementsByClassName('VarOutputButton7')[0];
let VOB9 = document.getElementsByClassName('VarOutputButton8')[0];
let VOB10 = document.getElementsByClassName('VarOutputButton9')[0];
let VOB11 = document.getElementsByClassName('VarOutputButton10')[0];

let VOB = document.getElementsByClassName('VOB');

let TOT = document.getElementsByClassName('Text-output_Title')[0];
let TOM = document.getElementsByClassName('Text-output_Main')[0];
let TOQ = document.getElementsByClassName('Text-output_Question')[0];


VOB1.style.opacity = '100%';
VOB2.style.opacity = '100%';
VOB3.style.opacity = '100%';
VOB4.style.opacity = '100%';
VOB5.style.opacity = '100%';
VOB6.style.opacity = '100%';
VOB7.style.opacity = '100%';
VOB8.style.opacity = '100%';
VOB9.style.opacity = '100%';
VOB10.style.opacity = '100%';
VOB11.style.opacity = '100%';


//  on load start gameload
window.addEventListener("load", function () {
    story();
});

//back button
document.querySelector('.button-49').addEventListener('mousedown', function() {
    window.location.href = './options_SG.html';
});

function story(){
    VOB1.style.opacity = '50%';
    VOB2.style.opacity = '0%';
    VOB3.style.opacity = '0%';
    VOB4.style.opacity = '0%';
    VOB5.style.opacity = '0%';
    VOB6.style.opacity = '0%';
    VOB7.style.opacity = '0%';
    VOB8.style.opacity = '0%';
    VOB9.style.opacity = '0%';
    VOB10.style.opacity ='0%';
    VOB11.style.opacity ='50%';

    VOB[0].style.color = 'grey';
    VOB[10].style.color = 'grey';


    TOT.style.color = 'white';
    TOM.style.color = 'white';
    TOQ.style.color = 'white';

    TOT.innerHTML = 'Start of a new journey';
    TOM.innerHTML = '';
    TOQ.innerHTML = '';

    VOB1.innerHTML = 'Previous';
    VOB11.innerHTML = 'Next';


    VOB1.addEventListener('click', function() {
        alert("can't go back");

    });
}




const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 575

//1920 × 1080

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {                 // 70 blocks wide is map   
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary{
    static width = 12*5.5
    static height = 12*5.5
    constructor({position}) {
    this.position = position
    this.width = 12*5.5
    this.height = 12*5.5            // 12 pixel wide en 550% zoomd in
    }
    draw(){
        c.fillStyle = 'red'
        c.fillrect(this.position.x,this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach((row,i) => {
    row.forEach((symbol, j) =>{
        boundaries.push(
        new Boundary({
        position:{
        x: j * Boundary.width,
        y: i * Boundary.height
        }
    })
    )
    })
});

console.log(boundaries)

const image = new Image()
image.src='./assets/foreground/game_0/Pellet Town4.png'

const playerImage = new Image ( )
playerImage.src = './assets/foreground/game_0/playerDown.png'

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
    x: -1210,
    y: -950
    },
    image: image
})

const keys = {
    z: {
    pressed: false
    },
    q: {
    pressed: false
    },
    s: {
    pressed: false
    },
    d: {
    pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - playerImage.width/4/2,
        canvas.height/2-playerImage.height/2,
        playerImage.width/4,
        playerImage.height
    )
    if(keys.z.pressed && LastKey === 'z') background.position.y += 3
    else if(keys.q.pressed && LastKey === 'q') background.position.x += 3
    else if(keys.s.pressed && LastKey === 's') background.position.y -= 3
    else if(keys.d.pressed && LastKey === 'd') background.position.x -= 3
}


animate()

let LastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'z':
            keys.z.pressed = true
            LastKey = 'z'
        break;

        case 'q':
            keys.q.pressed = true
            LastKey = 'q'
        break;

        case 's':
            keys.s.pressed = true
            LastKey = 's'
        break;

        case 'd':
            keys.d.pressed = true
            LastKey = 'd'
        break;
    }
    
})
window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'z':
            keys.z.pressed = false
        break;

        case 'q':
            keys.q.pressed = false
        break;

        case 's':
            keys.s.pressed = false
        break;

        case 'd':
            keys.d.pressed = false
        break;
    }
    
})

