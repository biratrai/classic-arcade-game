var SPRITE_WIDTH = 80;
var SPRITE_HEIGHT = 60;

let modal = $('#myModal');

/*
* Function to load the game show the modal
*/
function loadGame(){
    modal.show();
}

/*
* Function to start the game and hide the modal
*/
function startGame(){
     modal.addClass("hide-modal");
    setTimeout(() => {
        modal.hide()
        $(".modal-backdrop").remove()
    }, 599);
}

/* Function to set the avatar of the sprite
*/
function setAvatar(avatarName) {
    player.sprite = avatarName;
}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (modal.css("display") === "none") {
        // Move enemy sprite along the x-axis with increase of delta time
        this.x += this.speed * dt;

        // Check if enemy sprite are off the canvas
        if (this.x > 606) {
            this.x = -30; // Initialize to start
            this.speed = 100 + Math.floor(Math.random() * 200); // Generate random speed
        };
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (modal.css("display") === "none") {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 402;
    this.speed = 50;
    this.sprite = 'images/char-princess-girl.png';
    this.score = 0;
    this.highScore = 0;
};

// update() method for player:
Player.prototype.update = function(dt) {
    // Reset the player score
     if(this.y <= 0 ) {
        resetPlayerStat(++this.score);
    }
};

// render() method for player:
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput() method for player:
Player.prototype.handleInput = function(event) {
    //if left key is pressed:
    if(event === 'left' && this.x > 2) { //Check player isn't on left edge
        this.x = this.x - 100;
    }

    //if right key is pressed:
    if(event === 'right' && this.x < 402) { //Check player isn't on right edge
        this.x = this.x + 100;
    }

    //if up key is pressed:
    if(event === 'up' && this.y > 2) {
        this.y = this.y - 82;
    }

    //if down key is pressed:
    if(event === 'down' && this.y < 402) {
        this.y = this.y + 82;
    }
};

Player.prototype.renderStatus = function() {
    ctx.clearRect(0, 20 , 505 , 25);
    ctx.font = "20px Roboto";
    // Draw scores on the top left
    ctx.fillText("Score: " + this.score, 0, 40);
    // High score during gaming session
    if(this.score > this.highScore) this.highScore = this.score;
    ctx.fillText("High Score: " + this.highScore, 380, 40);

};

checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if(collide(enemy, player)){
           console.log('collided');
           resetPlayerStat(0);
        }
    });
};

// Returns true if sprite1 and sprite2 collide
function collide(sprite1, sprite2) {
        return (sprite2.x < (sprite1.x + SPRITE_WIDTH)
            && (sprite2.x + SPRITE_WIDTH) > sprite1.x
            && sprite2.y < (sprite1.y + SPRITE_HEIGHT)
            && (SPRITE_HEIGHT + sprite2.y) > sprite1.y);
}

// Resets player to initial position, speed and score
function resetPlayerStat(score){
    player.x = 202;
    player.y = 402;
    player.speed = 50;
    player.score = score;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// Place the player object in a variable called player
let player = new Player();

// Starting location of the enemy sprite for the three rows
var enemyStartLocation = [63, 147, 230];

// Add three enemy sprite to the allEnemies array taking
// for x axis as 0 and for y axis as element of enemyStartLocation with initial speed of 200
enemyStartLocation.forEach(function (y) {
    enemy = new Enemy(0, y, 200);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
