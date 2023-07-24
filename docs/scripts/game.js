class Game {
  constructor() {
    // Get all the possible screens
    // game-screen and game-end are initially hidden.
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');

    // Player
    this.player = new Player(
      this.gameScreen,
      600,
      180,
      150,
      150,
      'docs/images/plane.png'
    );

    // Style for the game board
    this.width = 1900;
    this.height = 700;

    // Obstacles - generic elements that look the same, we can put them in an array. If we have different obstacles, it can be an array of objects.
    this.enemies = [];

    this.boxes = [];

    // flag to give info about pushing an obstacle
    this.isPushingObstacle = false;

    this.isPushingBox = false;

    // Score
    this.score = 0;

    // Lives
    this.lives = 3;

    // Frames
    // this.frames = 0;   to increase the velocity of obstacles

    // GameOver Flag (booleans, while starting the gameover is false, while end-game, the gameover is true.)
    this.gameIsOver = false;
  }

  start() {
    // Set the height and width of game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the Start Screen
    this.startScreen.style.display = 'none';

    // Show the Game Screen
    this.gameScreen.style.display = 'block'; // we're displaying as a block element. For inline element is display inline.

    // Start the Game Loop
    this.gameLoop();
  }

  // Creating an Animation Function
  gameLoop() {
    console.log('Game Loop');

    // Check if the game's over to interrupt the game loop
    if (this.gameIsOver) {
      return;
    }

    this.update();

    // this.frames ++;   to increase the velocity of the obstacles

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // BONUS: scores and lives (first the score, then the lives and then move the car)
    let score = document.getElementById('score');
    let lives = document.getElementById('lives');

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;

    if (this.lives === 0) {
      this.endGame();
    }

    this.player.move();

    console.log(this.width)
    console.log(this.height)


    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];
      box.move();
      

      // Check if the players collided with an box
      if (this.player.didCollideBox(box)) {
        // Remove the box from the DOM/HTML
        box.element.remove();

        // Remove the box from the array
        this.boxes.splice(i, 1);

        // Reduce player's live by 1
        this.score += 5;
      }

      // Check if the box is off the screen (at the left)
      if (box.right > this.width) {
        // Remove the box from the screen/DOM/HTML
        box.element.remove();

        // Remove the box from the array of boxes
        this.boxes.splice(i, 1);
      }
    }
    // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();

      // Check if the players collided with an obstacle
      if (this.player.didCollideEnemy(enemy)) {
        // Remove the obstacle from the DOM/HTML
        enemy.element.remove();

        // Remove the obstacle from the array
        this.enemies.splice(i, 1);

        // Reduce player's live by 1
        this.lives--;
      }

      // Check if the obstacle is off the screen (at the bottom)
      else if (enemy.left > this.width) {
        // Congratulations to you, you avoided one obstacle
        //this.score++;

        // Remove the obstacle from the screen/DOM/HTML
        enemy.element.remove();

        // Remove the obstacle from the array of obstacles
        this.enemies.splice(i, 1);
      }
      
    
    }




  
    // this is for the enemies creation on the game screen
    if (!this.enemies.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.enemies.push(new Enemy(this.gameScreen));
        this.isPushingObstacle = false;
      }, 500);
      setTimeout(() => {
        this.enemies.push(new Enemy(this.gameScreen));
        this.isPushingObstacle = false;
      }, 1500);
      setTimeout(() => {
        this.enemies.push(new Enemy(this.gameScreen));
        this.isPushingObstacle = false;
      }, 2500);
      
    }

      
    if (!this.boxes.length && !this.isPushingBox) {
      this.isPushingBox = true;
      setTimeout(() => {
        this.boxes.push(new Box(this.gameScreen));
        this.isPushingBox = false;
      }, 2000);
      setTimeout(() => {
        this.boxes.push(new Box(this.gameScreen));
        this.isPushingBox = false;
      }, 3500);
      // setTimeout(() => {
      //   this.boxes.push(new Box(this.gameScreen));
      //   this.isPushingBox = false;
      // }, 1500);
     

  
    }
  }

  endGame() {
    // Remove the player
    this.player.element.remove();

    // Remove all obstacles from the array of obstacles
    this.enemies.forEach((enemy) => {
      // remove from the HTML
      enemy.element.remove();
    });

    this.gameIsOver = true;

    // Hide the game screen
    this.gameScreen.style.display = 'none';

    // Show end game screen
    this.gameEndScreen.style.display = 'block';
  }
}


