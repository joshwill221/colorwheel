var game = new Phaser.Game(400, 600, Phaser.AUTO, 'gameArea', { preload: preload, create: create, update: update });

function preload() {
    // Load sprites
    
    // Ball is 50px x 50px
    game.load.image('ball_blue', 'assets/ball_blue.png');
    game.load.image('ball_red', 'assets/ball_red.png');
    game.load.image('ball_yellow', 'assets/ball_yellow.png');
    game.load.image('wheel', 'assets/wheel.png');
}

var ball;
var wheel;
var score;
var labelScore;
var lives;
var labelLives;
var p;
var down;

function create() {
    
    /* Setup */
    
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#71c5cf';
    
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Add the physics engine to all the game objects
    game.world.enableBody = true;
    
    
    /* Ball */
        
    createBall(game.world.width/2 - 25, 25);
    
    
    /* Wheel */
    
    // Display the wheel at the position x=100 and y=245
    wheel = game.add.sprite(game.world.width/2, 480, 'wheel');

    // Make sure the wheel won't move when it hits the ball
    wheel.body.immovable = true;
    
    // Move the anchor to the right and downward
    wheel.anchor.setTo(0.5, 0.5);
    
    // Controls
    cursors = game.input.keyboard.createCursorKeys();
    
    
    /* Score */
    score = 0;
    labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
    
    /* Lives */
    lives = 3;
    labelLives = game.add.text(290, 20, "lives: 3", { font: "30px Arial", fill: "#ffffff" });
    
    p = game.input.activePointer;
}

function update() {    
    //  Collide the ball with the wheel
    //  Checks to see if the ball overlaps with the wheel calling hit
    game.physics.arcade.collide(ball, wheel, hit, null, this);
    
    /* Controls */
    if (cursors.left.isDown)
    {
        // Move to the left
        wheel.angle -= 1.1;
    }
    else if (cursors.right.isDown)
    {
        // Move to the right
        wheel.angle += 1.1;
    }
    
    /* testing */
    else if(p.isDown)
    {
        var angle = Phaser.Math.angleBetween(p.x, p.y, wheel.x, wheel.y) + 90;
        wheel.rotation = -angle;
    }
}

function hit( ball, wheel) {
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
            score += 1;
            labelScore.text = score;
        }
        else
        {
            lives -= 1;
            labelLives.text = "lives: " + lives;
        }
    }
    else if (wheel.angle <= -60 && wheel.angle > -180)
    {
        // Blue
        //console.log("hit blue" + wheel.angle);
        if (ball.color == 'blue')
        {
            console.log("Correct color, BLUE")
            score += 1;
            labelScore.text = score;
        }
        else
        {
            lives -= 1;
            labelLives.text = "lives: " + lives;
        }
        
    }
    else if (wheel.angle < 60 || wheel.angle < -60)
    {
        // Red
        //console.log("hit red" + wheel.angle);
        if (ball.color == 'red')
        {
            console.log("Correct color, RED")
            score += 1;
            labelScore.text = score;
        }
        else
        {
            lives -= 1;
            labelLives.text = "lives: " + lives;
        }
    }
    else
    {
        console.log("Error: wheel angle unaccounted for");
    }
    
    // Restart when all lives are lost
    if (lives <= 0 )
        {
            console.log("DEAD!!!");
            restartGame();
        }

    // Create new ball
    createBall(game.world.width/2 - 25, 25);
}
    
function createBall(x, y) {
    // 0 to 2
    var random = Math.floor(Math.random() * 3);
    
    // Create loop when more colors
    if (random == 0)
    {
        ball = game.add.sprite(x, y, 'ball_blue');
        ball.color = 'blue';
    }    
    else if (random == 1)
    {
        ball = game.add.sprite(x, y, 'ball_red');
        ball.color = 'red';
    }
    else if (random == 2)
    {
        ball = game.add.sprite(x, y, 'ball_yellow');
        ball.color = 'yellow';
    }    
    console.log("COLOR: " + ball.color);
    
    // Add physics to the ball
    game.physics.arcade.enable(ball);

    // Add gravity to the ball to make it fall
    ball.body.gravity.y = 300;
    ball.body.collideWorldBounds = true;
}

// Restart the game
function restartGame() {
    // Start the 'main' state, which restarts the game
    game.state.start(game.state.current);
}

/*

var p = game.input.activePointer;
if(!p.isDown) 
{
    down = false;    
} 
else if(down)
{
    var angle = (Math.PI*0.5) * Phaser.Math.angleBetween(p.x, p.y, button.x, button.y)+90;
    button.rotation = angle;
}

*/