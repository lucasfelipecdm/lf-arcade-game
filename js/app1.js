var Enemy = function(y, speed) {
    this.y = y;
    this.x = -101;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

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
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.x = 202;
    this.y = 382;
    this.lock = true;
    this.sprite = 'images/char-boy.png';

    this.update = function(){
        
    }

    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)        
    }

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

    this.unLock = function(){
        setTimeout(function(){
            player.lock = false;
        }, 1500)
    }
};

function wonGame(){
    gameEnd = true;
    player.lock = true;
    allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
    });
    document.getElementById('modal').style.display = "block";
}

function createEnemy(){
    if(!gameEnd){
            setTimeout(function(){
                posit = Math.floor(Math.random()*3);
                speed = Math.floor(Math.random()*3)*100+200;
                allEnemies.push(new Enemy(enemyPosition[posit], speed));
                createEnemy();        
        }, 1500)
    }
}

function initGame(){
    gameEnd = false;
    enemyPosition = [50, 133, 216];
    allEnemies = [];
    player = new Player();
    document.getElementById('modal').style.display = "none";
    player.unLock();
}

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

document.getElementById('playAgain').addEventListener('click', function(){
    initGame();
    createEnemy();
})