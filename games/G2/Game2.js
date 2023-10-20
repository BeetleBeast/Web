const platform = './assets/foreground/game_2/platform.png'
const hills = './assets/foreground/game_2/hills.png'
const background = './assets/foreground/game_2/background.png'
const platformSmallTall = './assets/foreground/game_2/platformSmallTall.png'
const spriteRunLeft = './assets/foreground/game_2/spriteRunLeft.png'
const spriteRunRight = './assets/foreground/game_2/spriteRunRight.png'
const spriteStandLeft = './assets/foreground/game_2/spriteStandLeft.png'
const spriteStandRight = './assets/foreground/game_2/spriteStandRight.png'



// makes the options available
document.querySelector('.button-49').addEventListener('mousedown', function() {
    window.location.href = './Game2S.html';
});

document.querySelector('.button').addEventListener('click', function() {
    document.querySelector('#Title').innerHTML = '';
    document.querySelector('#Title').style.opacity = '0';
    document.querySelector('.button').innerHTML = '';
    document.querySelector('.button').style.opacity = '0';
    document.querySelector('canvas').style.opacity = '1';
});



const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024//was 1024
canvas.height = 576//was 576
const gravity = 0.7 // was 0.5
let gameFrame = 1;
const staggerFrames = 1.5; // how heigher how slower game frames
class Player {
    constructor() {
        this.speed = 5
        this.position = {
        x: 100,
        y: 100
    }
    this.velocity = {
        x: 0,
        y: 1
    }
    this.width = 66
    this.height = 150
    this.image = createImage(spriteStandRight)
    this.frames = 0
    this.sprites = {
        stand: {
            right: createImage(spriteStandRight),
            left: createImage(spriteStandLeft),
            cropWidth: 177,
            width: 66
        },
        run: {
            right: createImage(spriteRunRight),
            left: createImage(spriteRunLeft),
            cropWidth: 341,
            width: 127.875
        }
    }

    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = 177
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        
        if (gameFrame % staggerFrames == 0){
            
            if(
                this.frames > 59 && // was 59
                (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)
                )
                {this.frames = 0}
            else if(
                this.frames > 29 && // was 29
                (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)
                )
                {this.frames = 0}
            
            
            this.position.y += this.velocity.y
            this.position.x += this.velocity.x
            if  (this.position.y +this.height + this.velocity.y <= canvas.height)
                {this.velocity.y += gravity}
            this.draw()
            this.frames++
        }
        gameFrame++;
    }
}


class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y 
        }
        this.image = image
        this.width = image.width
        this.height = image.height

        
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y 
        }
        this.image = image
        this.width = image.width
        this.height = image.height

        
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
}


let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let player = new Player()
let platforms = []
let genericObjects = []
let LastKey
let keys = {
    right:{
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0
init()
function init(){
    platformImage = createImage(platform)

    player = new Player()
    platforms = [
        new Platform({
            x: platformImage.width * 4 +300 -3 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
    }),new Platform({
        x: -1,
        y: 470,
        image: platformImage
    }), new Platform({
        x: platformImage.width -3,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 2 +100,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 3 +300,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 4 +300 -3,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 5 +650 -3,
        y: 470,
        image: platformImage
    }),
    
    ]

    genericObjects = [
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(background)
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(hills)
        })
    ]
    scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()

// makes things move the other dirrection when player moves
    if(keys.right.pressed && player.position.x < 700) {
        player.velocity.x = player.speed
    }else if (
        (keys.left.pressed && player.position.x >50) ||
        (keys.left.pressed && scrollOffset == 0 && player.position.x > 0)){
        player.velocity.x = - player.speed
    } else {
        player.velocity.x = 0
        
        if(keys.right.pressed){
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })        
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * .66
            })
        }else if (keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * .66
            }) 
            
        }
    }
    // platform collision detection
    platforms.forEach(platform => {
    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x +platform.width){
    player.velocity.y = 0
    
    }
    })
    // sprite switching
    if (
        keys.right.pressed &&
        LastKey === 'right' && player.currentSprite !== player.sprites.run.right){
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }else if (
        keys.left.pressed &&
        LastKey === 'left' && player.currentSprite !== player.sprites.run.left){
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }else if (
        !keys.left.pressed &&
        LastKey === 'left' && player.currentSprite == player.sprites.run.left){
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }else if (
        !keys.right.pressed &&
        LastKey === 'right' && player.currentSprite == player.sprites.run.right){
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }

// win scenerio (last block location)
    if (scrollOffset >=  platformImage.width * 5 -3){
        {
        //location.reload()
        init()
        
        
        }
    }
// lose scenerio
    if (player.position.y > canvas.height){
       console.log('you lose')
       //------------------------------------------Set a progress screen for x amount of time
       init()
    }

}

animate()
init()

addEventListener('keydown', ({keyCode}) => {
    
    switch (keyCode) {
        case 81:
            console.log('left')
            keys.left.pressed = true
            LastKey = 'left'
        break

        case 83:
            console.log('down')
        break

        case 68:
            console.log('right')
            keys.right.pressed = true
            LastKey = 'right'
        break

        case 90:
            console.log('up')
            if (event.repeat) { return }

            if (player.position.y !== platformImage.height) {
                player.velocity.y -= 15
            }
            
            break
    }
    console.log(keys.right.pressed)
})
addEventListener('keyup', ({keyCode}) => {
    
    switch (keyCode) {
        case 81:
            console.log('left')
            keys.left.pressed = false
            
        break

        case 83:
            console.log('down')
        break

        case 68:
            console.log('right')
            keys.right.pressed = false
            
        break

        case 90:
            console.log('up')
        break
    }
    console.log(keys.right.pressed)
})