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
      200,
      500,
      100,
      150,
      './images/crash.png'
    );

    // Style for the game board
    this.width = 500;
    this.height = 600;

    // Obstacles - generic elements that look the same, we can put them in an array. If we have different obstacles, it can be an array of objects.
    this.enemies = [];

    // flag to give info about pushing an obstacle
    this.isPushingObstacle = false;

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
      else if (enemy.top > this.height) {
        // Congratulations to you, you avoided one obstacle
        this.score++;

        // Remove the obstacle from the screen/DOM/HTML
        enemy.element.remove();

        // Remove the obstacle from the array of obstacles
        this.enemies.splice(i, 1);
      }
    }

    if (!this.enemies.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.enemies.push(new Enemy(this.gameScreen));
        this.isPushingObstacle = false;
      }, 500);
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
