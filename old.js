/*
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'gameArea', { preload: preload, create: create, update: update });

function preload() {
    // Load sprites
    
    // Ball is 50px x 50px
    game.load.image('ball', 'assets/drop.png');
    game.load.image('wheel', 'assets/wheel.png');
}

var ball;
var wheel;

function create() {
    // Setup 
    
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#71c5cf';
    
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Add the physics engine to all the game objects
    game.world.enableBody = true;
    
    // Ball 
        
    // Display the ball at the position x=100 and y=245
    ball = game.add.sprite(game.world.width/2 - 25, 25, 'ball');

    // Add physics to the ball
    game.physics.arcade.enable(ball);

    // Add gravity to the ball to make it fall
    ball.body.gravity.y = 300;
    ball.body.collideWorldBounds = true;
    
    // Wheel
    
    // Display the wheel at the position x=100 and y=245
    wheel = game.add.sprite(game.world.width/2 - 25, 380, 'ball');

    // Make sure the wheel won't move when it hits the ball
    wheel.body.immovable = true;
}

function update() {
    //  Collide the ball with the wheel
    game.physics.arcade.collide(ball, wheel);
    
    //  Checks to see if the ball overlaps with the wheel calling hit
    game.physics.arcade.collide(ball, wheel, hit, null, this);
}

function hit( ball, wheel) {
    // Removes the ball from the screen
    ball.kill();
    // Add and update the score
}

*/

// Create the start that will contain the whole game
var mainState = {
    preload: function() {
        // Here we preload the assets
        game.load.image('ball', 'assets/drop.png');
        game.load.image('wheel', 'assets/drop.png');
    },
    
    create: function() {
        // Here we create the game
        
        /* Setup */
        
        // Set the background colour to blue
        game.stage.backgroundColor = '#71c5cf';
        
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        /* Ball */      
        
        // Add the ball
        this.ball = game.add.sprite(175, 25, 'ball');
        game.physics.arcade.enable(this.ball);
        this.ball.body.gravity.y = 300;
        
        
        /* Wheel */  
        
        // Add the paddle at the botton of the screen
        this.wheel = game.add.sprite(175, 380, 'wheel');
        game.physics.arcade.enable(this.wheel);
        
        // Make sure the wheel won't move when it hits the ball
        this.wheel.body.immovable = true;
    },
    
    update: function() {
        
        /* Collisions */
        
        // Call the 'hit' function when the ball hits a brick
        game.physics.arcade.collide(this.ball, this.wheel, this.hit, null, this);       
    },
    
    hit: function(ball, wheel) {
        ball.kill();
        console.log("HIT!");
    },
    
};

// Initialise the game and start out state
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'gameArea');
game.state.add('main', mainState);
game.state.start('main');

