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

    // Move enemy sprite along the x-axis with increase of delta time
    this.x += this.speed * dt;

    // Check if enemy sprite are off the canvas
    if (this.x > 606) {
        this.x = -30; // Initialize to start
        this.speed = 100 + Math.floor(Math.random() * 200); // Generate random speed
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 402;
    this.speed = 50;
    this.sprite = 'images/char-boy.png';
};

// update() method for player:
Player.prototype.update = function(dt) {
    // console.log(`update ${dt}`);
};

// render() method for player:
Player.prototype.render = function() {
    // console.log(`render ${this.x} ${this.y}`);
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
