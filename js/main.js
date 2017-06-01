// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // Load sprites
    
        // Ball is 50px x 50px
        game.load.image('ball_blue', 'assets/ball_blue.png');
        game.load.image('ball_red', 'assets/ball_red.png');
        game.load.image('ball_yellow', 'assets/ball_yellow.png');
        game.load.image('wheel', 'assets/wheel.png');
    },
    
    create: function() {
        /* Setup */
    
        // If this is not a desktop (so it's a mobile device)
        if (game.device.desktop == false) {
            // Set the scaling mode to SHOW_ALL to show all the game
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set a minimum and maximum size for the game
            // Here the minimum is half the game size
            // And the maximum is the original game size
            game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);

            // Center the game horizontally and vertically
            game.scale.pageAlignHorizontally = true;
            // game.scale.pageAlignVertically = true;

        }

        // Change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all the game objects
        game.world.enableBody = true;


        /* Ball */

        this.createBall(game.world.width/2 - 25, 0);


        /* Wheel */

        // Display the wheel at the position x=100 and y=245
        this.wheel = game.add.sprite(game.world.width/2, game.world.height-150, 'wheel');

        // Make sure the wheel won't move when it hits the ball
        this.wheel.body.immovable = true;

        // Move the anchor to the center
        this.wheel.anchor.setTo(0.5, 0.5);

        /* Controls */

        // Set arrow keys
        cursors = game.input.keyboard.createCursorKeys();

        // Set pointer for click dragging
        this.p = game.input.activePointer;


        /* Score */
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        /* Lives */
        this.lives = 3;
        this.labelLives = game.add.text(game.world.width-115, 20, "lives: 3", { font: "30px Arial", fill: "#ffffff" });
        },

    update: function() {
        //  Collide the ball with the wheel
        //  Checks to see if the ball overlaps with the wheel calling hit
        game.physics.arcade.collide(this.ball, this.wheel, this.hit, null, this);

        /* Controls */
        if (cursors.left.isDown)
        {
            // Move to the left
            this.wheel.angle -= 1.1;
        }
        else if (cursors.right.isDown)
        {
            // Move to the right
            this.wheel.angle += 1.1;
        }

        /* testing */
        if(this.p.isDown)
        {
            var angle = Phaser.Math.angleBetween(this.p.x, this.p.y, this.wheel.x, this.wheel.y)+80;
            this.wheel.rotation = angle;
        }
    },
    
    hit: function(ball, wheel) {
        // Removes the ball from the screen
        ball.kill();
        console.log("hit");

        /* Wheel Rotation 0 to 180 and -180 to 0 */

        if (wheel.angle >= 60 && wheel.angle < 180)
        {
            // Yellow
            //console.log("hit yellow" + wheel.angle);
            if (ball.color == 'yellow')
            {
                console.log("Correct color, YELLOW")
                this.score += 1;
                this.labelScore.text = this.score;
            }
            else
            {
                this.lives -= 1;
                this.labelLives.text = "lives: " + this.lives;
            }
        }
        else if (wheel.angle <= -60 && wheel.angle > -180)
        {
            // Blue
            //console.log("hit blue" + wheel.angle);
            if (ball.color == 'blue')
            {
                console.log("Correct color, BLUE")
                this.score += 1;
                this.labelScore.text = this.score;
            }
            else
            {
                this.lives -= 1;
                this.labelLives.text = "lives: " + this.lives;
            }

        }
        else if (wheel.angle < 60 || wheel.angle < -60)
        {
            // Red
            //console.log("hit red" + wheel.angle);
            if (ball.color == 'red')
            {
                console.log("Correct color, RED")
                this.score += 1;
                this.labelScore.text = this.score;
            }
            else
            {
                this.lives -= 1;
                this.labelLives.text = "lives: " + this.lives;
            }
        }
        else
        {
            console.log("Error: wheel angle unaccounted for");
        }

        // Restart when all lives are lost
        if (this.lives <= 0 )
            {
                console.log("DEAD!!!");
                this.restartGame();
            }

        // Create new ball
        this.createBall(game.world.width/2 - 25, 0);
    },
    
    createBall: function(x, y) {
    // 0 to 2
    var random = Math.floor(Math.random() * 3);
    
    // Create loop when more colors
    if (random == 0)
    {
        this.ball = game.add.sprite(x, y, 'ball_blue');
        this.ball.color = 'blue';
    }    
    else if (random == 1)
    {
        this.ball = game.add.sprite(x, y, 'ball_red');
        this.ball.color = 'red';
    }
    else if (random == 2)
    {
        this.ball = game.add.sprite(x, y, 'ball_yellow');
        this.ball.color = 'yellow';
    }    
    console.log("COLOR: " + this.ball.color);
    
    // Add physics to the ball
    game.physics.arcade.enable(this.ball);

    // Add gravity to the ball to make it fall
    this.ball.body.gravity.y = 300;
    this.ball.body.collideWorldBounds = true;
    },
    
    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    }

};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'gameArea');

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');