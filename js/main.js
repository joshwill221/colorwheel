// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // Load sprites
        game.load.image('ball_blue', 'assets/ball_blue.png');
        game.load.image('ball_red', 'assets/ball_red.png');
        game.load.image('ball_yellow', 'assets/ball_yellow.png');
        game.load.image('wheel', 'assets/wheel.png');
    },
    
    create: function() {
        /* Setup */
    
        // If this is not a desktop (so it's a mobile device)
        if (game.device.desktop == false) {
            // Set the scaling mode to SHOW_ALL to show the whole game
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set a minimum and maximum size for the game
            // Minimum is half and maximum is the original game size
            game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);

            // Center the game horizontally and vertically
            game.scale.pageAlignHorizontally = true;

        }

        // Change the background color of the game to a nice sky blue
        game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all the game objects
        game.world.enableBody = true;


        /* Ball */

        // Create the ball
        this.createBall(game.world.width/2 - 25, 0);


        /* Wheel */

        // Display the wheel
        this.wheel = game.add.sprite(game.world.width/2, game.world.height-150, 'wheel');
        // Make sure the wheel won't move when it hits the ball
        this.wheel.body.immovable = true;
        // Move the anchor to the center (for rotation)
        this.wheel.anchor.setTo(0.5, 0.5);


        /* Controls */

        // Set arrow keys
        cursors = game.input.keyboard.createCursorKeys();
        // Set pointer for click dragging
        this.p = game.input.activePointer;


        /* UI */

        // Score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        // Lives
        this.lives = 3;
        this.labelLives = game.add.text(game.world.width-115, 20, "lives: 3", { font: "30px Arial", fill: "#ffffff" });
        },

    update: function() {
        //  Collide the ball with the wheel
        //  Checks to see if the ball overlaps with the wheel calling hit
        game.physics.arcade.collide(this.ball, this.wheel, this.hit, null, this);


        /* Controls */

        // Left key
        if (cursors.left.isDown)
        {
            // Rotate left
            this.wheel.angle -= 3.0;
        }
        // Right key
        else if (cursors.right.isDown)
        {
            // Rotate right
            this.wheel.angle += 3.0;
        }

        // Mouse click
        if(this.p.isDown)
        {
            // Rotate wheel to where pointer is held down
            var angle = Phaser.Math.angleBetween(this.p.x, this.p.y, this.wheel.x, this.wheel.y) + 80;
            this.wheel.rotation = angle;
        }
        
        // Move balls label to center every frame (copying its movement)
        this.ball.text.x = Math.floor(this.ball.x + this.ball.width / 2);
        this.ball.text.y = Math.floor(this.ball.y + this.ball.height / 2);
    },
    
    // Called when ball and wheel collide
    hit: function(ball, wheel) {
        console.log("hit");

        /* Wheel Rotation -180 to 0 and 0 to 180 */

        if (wheel.angle >= 60 && wheel.angle < 180)
        {
            // Yellow
            //console.log("hit yellow" + wheel.angle);
            if (ball.labelText == 'yellow')
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
            if (ball.labelText == 'blue')
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
            if (ball.labelText == 'red')
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
            // For good measure
            console.log("Error: wheel angle unaccounted for");
        }

        // Restart when all lives are lost
        if (this.lives <= 0 )
            {
                console.log("You have died!");
                this.restartGame();
            }
        
        // Remove ball and text from the screen
        ball.text.kill();
        ball.kill();

        // Create new ball
        this.createBall(game.world.width/2 - ball.width/2, 0);
    },
    
    createBall: function(x, y) {
        // 0 to 2
        var randColor = Math.floor(Math.random() * 3);
        // 0 to 1
        var randFake = Math.floor(Math.random() * 2);
        
        // Create loop when more colors
        if (randColor == 0)
        {
            // Blue
            this.ball = game.add.sprite(x, y, 'ball_blue');
            this.ball.labelColor = 'blue';
            if (randFake == 0)
                this.ball.labelText = 'red';
            else if (randFake == 1)
                this.ball.labelText = 'yellow';
        }    
        else if (randColor == 1)
        {
            // Red
            this.ball = game.add.sprite(x, y, 'ball_red');
            this.ball.labelColor = 'red';
            if (randFake == 0)
                this.ball.labelText = 'blue';
            else if (randFake == 1)
                this.ball.labelText = 'yellow';
        }
        else if (randColor == 2)
        {
            // Yellow
            this.ball = game.add.sprite(x, y, 'ball_yellow');
            this.ball.labelColor = 'yellow';
            if (randFake == 0)
                this.ball.labelText = 'blue';
            else if (randFake == 1)
                this.ball.labelText = 'red';
        }  
        console.log("COLOR: " + this.ball.labelText);
        
        // Add physics to the new ball
        game.physics.arcade.enable(this.ball);

        // Add gravity to the ball to make it fall
        this.ball.body.gravity.y = 150;
        this.ball.body.collideWorldBounds = true;
            
        var style = { font: "20px Arial", fill: this.ball.labelColor, wordWrap: false, align: "center", backgroundColor: "#000000" };

        this.ball.text = game.add.text(0, 0, this.ball.labelText, style);
        this.ball.text.anchor.set(0.5);
    },
    
    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    }

};

// Initialize Phaser, and create a 400px by 600px game
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'gameArea');

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');