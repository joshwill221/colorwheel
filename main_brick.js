// Create the start that will contain the whole game
var mainState = {
    preload: function() {
        // Here we preload the assets
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('brick', 'assets/brick.png');
        game.load.image('ball', 'assets/ball.png');
    },
    
    create: function() {
        // Here we create the game
        
        /* Setup */
        
        // Set the background colour to blue
        game.stage.backgroundColor = '#3598db';
        
        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add the physics engine to all the game objects
        game.world.enableBody = true;
        
        
        /* Paddle */
        
        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        // Add the paddle at the botton of the screen
        this.paddle = game.add.sprite(150, 400, 'paddle');
        
        // Make sure the paddle won't move when it hits the ball
        this.paddle.body.immovable = true;
        
        // Make sure paddle stays on screen
        this.paddle.body.collideWorldBounds = true;
        
        
        /* Bricks */
        
        // Create a group the will contain all the bricks
        this.bricks = game.add.group();
        
        // Add 25 bricks to the group (5 columns and 5 lines)
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                // Create the brick at the correct position
                var brick = game.add.sprite(55+i*60, 55+j*35, 'brick');
                
                // Make sure the brick won't move when the ball hits it
                brick.body.immovable =true;
                
                // Add the brick to the group
                this.bricks.add(brick);
            }
        }
        
        
        /* Ball */
        
        // Add the ball
        this.ball = game.add.sprite(100, 300, 'ball');
        
        // Give the ball some initial speed
        this.ball.body.velocity.x = 200;
        this.ball.body.velocity.y = 200;
        
        // Make sure the ball will bounce when hitting something
        this.ball.body.bounce.setTo(1.005);
        this.ball.body.collideWorldBounds = true;     
    },
    
    update: function() {
        // Here we update the game 60 times per second
        
        
        /* Controls */
        
        // Move the paddle left/right when an arrow key is pressed
        if (this.left.isDown) 
            this.paddle.body.velocity.x = -300;
        else if (this.right.isDown)
            this.paddle.body.velocity.x = 300;
        else
            // Stop the paddle when no key is pressed;
            this.paddle.body.velocity.x = 0;
        
        
        /* Collisions */
        
        // Add collisions between the paddle and the ball
        game.physics.arcade.collide(this.paddle, this.ball);
        
        // Call the 'paddleHit' function when the ball hits the paddle
        //game.physics.arcade.collide(this.ball, this.paddle, this.paddleHit, null, this);
        
        // Call the 'brickHit' function when the ball hits a brick
        game.physics.arcade.collide(this.ball, this.bricks, this.brickHit, null, this);
        
        // Restart the game if the ball is below the paddle
        if (this.ball.y > this.paddle.y)
            game.state.start('main');        
    },
    
    brickHit: function(ball, brick) {
        brick.kill();
    },
    
    //paddleHit: function(ball, brick) {
    //    this.ball.body.velocity.x += 10000;
    //}
};

// Initialise the game and start out state
var game = new Phaser.Game(400, 450, Phaser.AUTO, 'phaser-game');
game.state.add('main', mainState);
game.state.start('main');