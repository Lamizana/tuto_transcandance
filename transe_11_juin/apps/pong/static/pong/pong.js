function loadPong(){
    
    const btnCreateSolo = document.getElementById("btnCreateSolo");
    btnCreateSolo.addEventListener("click", e => {
    btnCreateSolo.style.display = "none";
    btnCreate2Player.style.display = "none";
    // .canva = displayflex
    poong("Solo");
    
    })
    
    const btnCreate2Player = document.getElementById("btnCreate2Player");
    btnCreate2Player.addEventListener("click", e => {
        btnCreateSolo.style.display = "none";
        btnCreate2Player.style.display = "none";
    // .canva = displayflex
    poong("MultiLocal");
    
    })
    
    
    function poong(state){
    
    // Global Variables
    var DIRECTION = {
        IDLE: 0,
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
    };
     
    var rounds = [5, 5, 3, 3, 2];
    var colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];
     
    // The ball object (The cube that bounces back and forth)
    var Ball = {
        new: function () {
            return {
                width: 18,
                height: 18,
                x: (this.canvas.width / 2) - 9,
                y: (this.canvas.height / 2) - 9,
                moveX: DIRECTION.IDLE,
                moveY: DIRECTION.IDLE,
                speed: 7,
                speedy: 0
            };
        }
    };
     
    // The ai object (The two lines that move up and down)
    var Ai = {
        new: function (side) {
            return {
                width: 18,
                height: 180,
                x: side === 'left' ? 150 : this.canvas.width - 150,
                y: (this.canvas.height / 2) - 35,
                score: 0,
                move: DIRECTION.IDLE,
                speed: 0,
                playerState: 0
            };
        }
    };
     
    var Game = {
        initialize: function () {
            this.canvas = document.querySelector('canvas');
            this.context = this.canvas.getContext('2d');
     
            this.canvas.width = 1400;
            this.canvas.height = 1000;
     
            this.canvas.style.width = (this.canvas.width / 2) + 'px';
            this.canvas.style.height = (this.canvas.height / 2) + 'px';
     
            this.player = Ai.new.call(this, 'left');
            this.opponent = Ai.new.call(this, 'right');
            this.ball = Ball.new.call(this);
     
            if (state === "Solo")
                this.opponent.speed = 5;
            this.running = this.over = false;
            this.turn = this.opponent;
            this.timer = this.round = 0;
            this.color = '#8c52ff';
     
            Pong.menu();
            Pong.listen();
        },
     
        endGameMenu: function (text) {
            // Change the canvas font size and color
            Pong.context.font = '45px Courier New';
            Pong.context.fillStyle = this.color;
     
            // Draw the rectangle behind the 'Press any key to begin' text.
            Pong.context.fillRect(
                Pong.canvas.width / 2 - 350,
                Pong.canvas.height / 2 - 48,
                700,
                100
            );
     
            // Change the canvas color;
            Pong.context.fillStyle = '#ffffff';
     
            // Draw the end game menu text ('Game Over' and 'Winner')
            Pong.context.fillText(text,
                Pong.canvas.width / 2,
                Pong.canvas.height / 2 + 15
            );
     
            setTimeout(function () {
                Pong = Object.assign({}, Game);
                Pong.initialize();
            }, 3000);
        },
     
        menu: function () {
            // Draw all the Pong objects in their current state
            Pong.draw();
     
            // Change the canvas font size and color
            this.context.font = '50px Courier New';
            this.context.fillStyle = this.color;
     
            // Draw the rectangle behind the 'Press any key to begin' text.
            this.context.fillRect(
                this.canvas.width / 2 - 350,
                this.canvas.height / 2 - 48,
                700,
                100
            );
     
            // Change the canvas color;
            this.context.fillStyle = '#ffffff';
     
            // Draw the 'press any key to begin' text
            if (state === "Solo"){
                this.context.fillText('Press any key to begin',
                    this.canvas.width / 2,
                    this.canvas.height / 2 + 15
                );
            }
            else if (state === "MultiLocal"){
                if (Pong.player.playerState === 0 && Pong.opponent.playerState === 0)
                this.context.fillText('Press any key to begin',
                    this.canvas.width / 2,
                    this.canvas.height / 2 + 15
                );
                else if (Pong.player.playerState === 0 && Pong.opponent.playerState === 1)
                this.context.fillText('Waiting for player 1',
                this.canvas.width / 2,
                this.canvas.height / 2 + 15
                );
                else if (Pong.player.playerState === 1 && Pong.opponent.playerState === 0)
                this.context.fillText('Waiting for player 2',
                    this.canvas.width / 2,
                    this.canvas.height / 2 + 15
                );
            }
        },
     
        // Update all objects (move the player, opponent, ball, increment the score, etc.)
        update: function () {
            if (!this.over) {
                // If the ball collides with the bound limits - correct the x and y coords.
                if (this.ball.x <= 0) Pong._resetTurn.call(this, this.opponent, this.player);
                if (this.ball.x >= this.canvas.width - this.ball.width) Pong._resetTurn.call(this, this.player, this.opponent);
    
    
                // if (this.ball.y <= 0) this.ball.y += (this.ball.speedy / 1.5); 
                // if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.y -= (this.ball.speedy / 1.5);
                if (this.ball.y <= 0) this.ball.speedy *= -1;
                if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.speedy *= -1;
                
                this.ball.x += this.ball.speed;
                this.ball.y += this.ball.speedy;
                // Move player if they player.move value was updated by a keyboard event
                // if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
                // else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;
                this.player.y += this.player.speed;
                this.opponent.y += this.opponent.speed;
                // if (this.opponent.move === DIRECTION.UP) this.opponent.y -= this.opponent.speed;
                // else if (this.opponent.move === DIRECTION.DOWN) this.opponent.y += this.opponent.speed;
     
                // On new serve (start of each turn) move the ball to the correct side
                // and randomize the direction to add some challenge.
                if (Pong._turnDelayIsOver.call(this) && this.turn) {
                    // this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
                    // this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
                    if (this.turn === this.player)
                        this.ball.speed = -7;
                    else
                        this.ball.speed = 7;
                    this.ball.speedy = 0;
                    this.ball.x = (this.canvas.width / 2) - 9,
                    this.ball.y = (this.canvas.height / 2) - 9,
                    this.turn = null;
                }
     
                // If the player collides with the bound limits, update the x and y coords.
                if (this.player.y <= 0) this.player.y = 0;
                else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);
    
    
                // if (this.opponent.y <= 0) this.opponent.y = 0;
                // else if (this.opponent.y >= (this.canvas.height - this.opponent.height)) this.opponent.y = (this.canvas.height - this.opponent.height);
     
                // Move ball in intended direction based on moveY and moveX values
                // if (this.ball.moveY === DIRECTION.UP) this.ball.y -= (this.ball.speedy / 1.5);
                // else if (this.ball.moveY === DIRECTION.DOWN) this.ball.y += (this.ball.speedy / 1.5);   
    
                // if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
                // else if (this.ball.moveX === DIRECTION.RIGHT) this.ball.x += this.ball.speed;
                // if (this.ball.speed >= 0)
                // else
                    //  this.ball.x -= this.ball.speed;
                // Handle opponent (AI) UP and DOWN movement
                if (state === "Solo")
                {
                    if (this.opponent.y > this.ball.y - (this.opponent.height / 2) + 1) {
                        if (this.ball.speed < 0) this.opponent.speed = -3;
                        else this.opponent.speed = -4;
                    }
                    else if (this.opponent.y < this.ball.y - (this.opponent.height / 2) - 1){
                        if (this.ball.speed < 0) this.opponent.speed = 3;
                        else this.opponent.speed = 4;
                    }
                    else
                        this.opponent.speed = 0;
                    
                
                }
    
                // Handle opponent (AI) wall collision
                    if (this.opponent.y >= this.canvas.height - this.opponent.height) this.opponent.y = this.canvas.height - this.opponent.height;
                    else if (this.opponent.y <= 0) this.opponent.y = 0;
    
                // Handle Player-Ball collisions
                if (this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
                    if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.height >= this.player.y) {
                        this.ball.x = (this.player.x + this.ball.width);
                        this.ball.speed *= -1;
                        this.ball.speedy = -(this.player.y - this.ball.y + (this.player.height / 2)) / 5;
                    }
                }
     
                // Handle opponent-ball collision
                if (this.ball.x - this.ball.width <= this.opponent.x && this.ball.x >= this.opponent.x - this.opponent.width) {
                    if (this.ball.y <= this.opponent.y + this.opponent.height && this.ball.y + this.ball.height >= this.opponent.y) {
                        this.ball.x = (this.opponent.x - this.ball.width);
                        {
                            this.ball.speed *= -1;
                        this.ball.speedy = -(this.opponent.y - this.ball.y + (this.opponent.height / 2)) / 5;
                        }
                    }
                }
            }
     
            // Handle the end of round transition
            // Check to see if the player won the round.
            if (this.player.score === rounds[this.round]) {
                // Check to see if there are any more rounds/levels left and display the victory screen if
                // there are not.
                if (!rounds[this.round + 1]) {
                    this.over = true;
                    setTimeout(function () { Pong.endGameMenu('Winner!'); }, 1000);
                } else {
                    // If there is another round, reset all the values and increment the round number.
                    this.color = this._generateRoundColor();
                    this.player.score = this.opponent.score = 0;
                    this.player.speed += 0.5;
                    this.opponent.speed += 1;
                    this.ball.speed += 1;
                    this.round += 1;
     
                }
            }
            // Check to see if the opponent/AI has won the round.
            else if (this.opponent.score === rounds[this.round]) {
                this.over = true;
                setTimeout(function () { Pong.endGameMenu('Game Over!'); }, 1000);
            }
        },
     
        // Draw the objects to the canvas element
        draw: function () {
            // Clear the Canvas
            this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
     
            // Set the fill style to black
            this.context.fillStyle = this.color;
     
            // Draw the background
            this.context.fillRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
     
            // Set the fill style to white (For the paddles and the ball)
            this.context.fillStyle = '#ffffff';
     
            // Draw the Player
            this.context.fillRect(
                this.player.x,
                this.player.y,
                this.player.width,
                this.player.height
            );
     
            // Draw the Ai
            this.context.fillRect(
                this.opponent.x,
                this.opponent.y,
                this.opponent.width,
                this.opponent.height 
            );
     
            // Draw the Ball
            if (Pong._turnDelayIsOver.call(this)) {
                this.context.fillRect(
                    this.ball.x,
                    this.ball.y,
                    this.ball.width,
                    this.ball.height
                );
            }
     
            // Draw the net (Line in the middle)
            this.context.beginPath();
            this.context.setLineDash([7, 15]);
            this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
            this.context.lineTo((this.canvas.width / 2), 140);
            this.context.lineWidth = 10;
            this.context.strokeStyle = '#ffffff';
            this.context.stroke();
     
            // Set the default canvas font and align it to the center
            this.context.font = '100px Courier New';
            this.context.textAlign = 'center';
     
            // Draw the players score (left)
            this.context.fillText(
                this.player.score.toString(),
                (this.canvas.width / 2) - 300,
                200
            );
     
            // Draw the paddles score (right)
            this.context.fillText(
                this.opponent.score.toString(),
                (this.canvas.width / 2) + 300,
                200
            );
     
            // Change the font size for the center score text
            this.context.font = '30px Courier New';
     
            // Draw the winning score (center)
            this.context.fillText(
                'Round ' + (Pong.round + 1),
                (this.canvas.width / 2),
                35
            );
     
            // Change the font size for the center score value
            this.context.font = '40px Courier';
     
            // Draw the current round number
            this.context.fillText(
                rounds[Pong.round] ? rounds[Pong.round] : rounds[Pong.round - 1],
                (this.canvas.width / 2),
                100
            );
        },
     
        loop: function () {
            Pong.update();
            Pong.draw();
     
            // If the game is not over, draw the next frame.
            if (!Pong.over) requestAnimationFrame(Pong.loop);
        },
     
        listen: function () {
            document.addEventListener('keydown', function (key) {
                // Handle the 'Press any key to begin' function and start the game.
                if (Pong.running === false) {
                    if (state === "MultiLocal" && (key.keyCode === 87 || key.keyCode === 83))
                        Pong.player.playerState = 1;
                    if (state === "MultiLocal" && (key.keyCode === 38 || key.keyCode === 40))
                        Pong.opponent.playerState = 1;
                    Pong.menu();
                    if (state === "Solo" || (Pong.player.playerState === 1 && Pong.opponent.playerState === 1))
                    {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                
                    }
                }
    
                // if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
                // else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;
    
                // if (this.opponent.move === DIRECTION.UP) this.opponent.y -= this.opponent.speed;
                // else if (this.opponent.move === DIRECTION.DOWN) this.opponent.y += this.opponent.speed;
    
    
    
                // Handle up arrow and w key events
                if (state === "Solo" && (key.keyCode === 38 || key.keyCode === 87)) Pong.player.speed = -8;
                if (state === "MultiLocal" && key.keyCode === 87) Pong.player.speed = -8;
                if (state === "MultiLocal" && key.keyCode === 38) Pong.opponent.speed = -8;
     
                // Handle down arrow and s key events
                if (state === "Solo" && (key.keyCode === 40 || key.keyCode === 83)) Pong.player.speed = 8;
                if (state === "MultiLocal" && key.keyCode === 83) Pong.player.speed = 8;
                if (state === "MultiLocal" && key.keyCode === 40) Pong.opponent.speed = 8;
            });
     
            // Stop the player from moving when there are no keys being pressed.
            // document.addEventListener('keyup', function (key) { Pong.player.move = DIRECTION.IDLE; });
            document.addEventListener('keyup', function (key) {
                
                if (state === "MultiLocal" && (key.keyCode === 87 || key.keyCode === 83)) Pong.player.speed = 0;
                if (state === "MultiLocal" && (key.keyCode === 38 || key.keyCode === 40)) Pong.opponent.speed = 0;
                if (state === "Solo") Pong.player.speed = 0;
            });
    
        },
     
        // Reset the ball location, the player turns and set a delay before the next round begins.
        _resetTurn: function(victor, loser) {
            this.ball = Ball.new.call(this, this.ball.speed);
            this.turn = loser;
            this.timer = (new Date()).getTime();
     
            victor.score++;
        },
     
        // Wait for a delay to have passed after each turn.
        _turnDelayIsOver: function() {
            return ((new Date()).getTime() - this.timer >= 1000);
        },
     
        // Select a random color as the background of each level/round.
        _generateRoundColor: function () {
            var newColor = colors[Math.floor(Math.random() * colors.length)];
            if (newColor === this.color) return Pong._generateRoundColor();
            return newColor;
        }
    };
     
    var Pong = Object.assign({}, Game);
    Pong.initialize();
    }
}