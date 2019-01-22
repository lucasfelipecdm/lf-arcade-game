var Enemy = function(y, speed) {
    this.y = y;
    this.x = -101;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
/**
 * This constructor function receive the 'y' who represents the initial position of each enemy
 * also receive the speed of enemy moviment on screen  
 */

Enemy.prototype.update = function(dt) {
    if (this.x < 505){        
        this.x += this.speed * dt;
    } else {
        for(i = 0; i < allEnemies.length; i++){
            if (allEnemies[i] === this){
                delete allEnemies[i];
            }
        }
    }
    /**
     * This first 'if' move the enemy on screen, it get the 'x' position and adds a number of pixels
     * and remove the enemies from allEnemies array when that moves out the canvas screen
     */ 
    dist = Math.abs(Math.round(this.x) - player.x);
    if ((50 > dist) && this.y === player.y){
        player.x = 202;
        player.y = 382; 
        for(i = 0; i < allEnemies.length; i++){
            if (allEnemies[i] === this){
                delete allEnemies[i];
            }
        }
    }
    /**
     * This second 'if' recognizes the colision of the enemies and the player, remove the enemy who touch
     * the player from the allEnemies array and put the player back in initial position
     */ 
};
/**
 * This function 'update' receive the 'dt' parameter and multiply by the speed to move the enemy on screen,
 * calculate the colision and remove enemys from allEnemies array
 */ 

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
* This function render the enemy images on screen
*/ 

var Player = function() {
    this.x = 202;
    this.y = 382;
    this.lock = true;
    this.sprite = 'images/char-boy.png';
    /**
     * This property set the inital position off player, it images and lock the move
     */

    this.update = function(){}

    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)        
    }
    /**
     * This function render the player image on screen
     */ 
    this.handleInput = function(key){
        if(allEnemies && !this.lock){
            if(key === 'left'){                       
                return this.x < 101 ? true : this.x -= 101;
            } else if(key === 'up'){
                return this.y < 0 ? true : this.y === 50 ? (wonGame(), this.y -= 83) : this.y -= 83;
            } else if(key === 'right'){
                return this.x > 303 ? true : this.x += 101;
            } else if(key === 'down'){
                return this.y > 381 ? true : this.y += 83;
            } 
        }        
    }
    /**
     * This function receive the keycode from a event of the keyboard, and moves the player on screen
     * and block the player to moves out the canvas screen
     */

    this.unLock = function(){
        setTimeout(function(){
            player.lock = false;
        }, 1000)
    }
    /**
     * This function unlock the player moves after 1 second, the purpose is don't allow moves before
     * a enemy be creates
     */
};
/**
 * This constructor function render the player images on screen, receive keyboard events moves the
 * player on screen and block he moves out the canvas screen
 */

function wonGame(){
    gameEnd = true;
    player.lock = true;
    allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
    });
    document.getElementById('modal').style.display = "block";
}
/**
 * This function is called when the player reach the water and won the game, it block new enemy create
 * lock the player moves, stop all enemies and show the victory modal
 */

function createEnemy(){
    if(!gameEnd){
            setTimeout(function(){
                posit = Math.floor(Math.random()*3);
                speed = Math.floor(Math.random()*3)*100+200;
                allEnemies.push(new Enemy(enemyPosition[posit], speed));
                createEnemy();        
        }, 1000)
    }
}
/**
 * This function is called to creates enemy objects, it just create a new enemy if the game is not end yet
 * to create a enemy it pass as parameter a random position and a random speed
 */

function initGame(){
    gameEnd = false;
    enemyPosition = [50, 133, 216];
    allEnemies = [];
    player = new Player();
    document.getElementById('modal').style.display = "none";
    player.unLock();
}
/**
 * This function init the game, set the gameEnd to false, set the array of enemy position, clean the
 * allEnemies array, create the player, hide the modal and unlock the player moves
 */

initGame();
createEnemy();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
})
/**
 * This event receive the keyboard events and pass as parameter to handleInput function on player object
 */

document.getElementById('playAgain').addEventListener('click', function(){
    initGame();
    createEnemy();
})
/**
 * This event receive the mouse click event on button and call the initGame and createEnemy function
 */