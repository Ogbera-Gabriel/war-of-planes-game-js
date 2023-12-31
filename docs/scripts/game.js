class Game {
  constructor() {
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

    // Obstacles
    this.enemies = [];

    this.boxes = [];

    // flag to give info about pushing an obstacle
    this.isPushingObstacle = false;

    this.isPushingBox = false;

    // Score
    this.score = 0;

    // Lives
    this.lives = 3;

    this.bullets = []; // new change bullet array

    // GameOver Flag (booleans, while starting the gameover is false, while end-game, the gameover is true.)
    this.gameIsOver = false;

    // Adding background music
    this.backgroundMusic = document.createElement('audio');
    this.backgroundMusic.src = './docs/sounds/intro.mp3';
    this.gameScreen.appendChild(this.backgroundMusic);

    this.explosion = new Audio('docs/sounds/explosion.mp3');
  }

  start() {
    this.backgroundMusic.play();
    this.backgroundMusic.loop = true;
    // Set the height and width of game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the Start Screen
    this.startScreen.style.display = 'none';

    // Show the Game Screen
    this.gameScreen.style.display = 'block';

    // Start the Game Loop
    this.gameLoop();
  }

  // Creating an Animation Function
  gameLoop() {
    // Check if the game's over to interrupt the game loop
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // BONUS: scores and lives
    let score = document.getElementById('score');
    let lives = document.getElementById('lives');

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;

    if (this.lives === 0) {
      this.endGame();
    }

    this.player.move();

    // Bullet game logic for collision with enemy
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.move();

      // Check if the bullet is out of the screen, remove it
      if (bullet.isOutOfScreen()) {
        bullet.remove();
        this.bullets.splice(i, 1);
        i--;
      } else {
        // Check for collision between bullets and enemies
        for (let j = 0; j < this.enemies.length; j++) {
          const enemy = this.enemies[j];
          const bulletRect = bullet.element.getBoundingClientRect();
          const enemyRect = enemy.element.getBoundingClientRect();

          if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
          ) {
            // Remove the bullet and enemy from the game
            bullet.remove();
            this.bullets.splice(i, 1);
            i--;

            enemy.element.remove();
            this.enemies.splice(j, 1);
            j--;
            this.explosion.play();

            // Increment the score
            this.score += 1;
            const scoreElement = document.getElementById('score');
            scoreElement.innerHTML = this.score;
          }
        }
      }
    }

    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];
      box.move();

      // Check if the players collided with an box
      if (this.player.didCollideBox(box)) {
        // Remove the box from the DOM/HTML
        box.element.remove();

        // Remove the box from the array
        this.boxes.splice(i, 1);

        // Increase the score by 5 by hitting boxes
        this.score += 5;
      }

      // Check if the box is off the screen (at the left)
      if (box.right > this.width) {
        // Remove the box from the screen/DOM/HTML
        box.element.remove();

        // Remove the box from the array of boxes
        this.boxes.splice(i, 1);

        this.lives--;
      }
      if (this.score > 50 && this.score < 100) {
        box.right += 6;
      } else if (this.score > 100) {
        box.right += 100;
      }
    }
    // Check for collision and if an enemy is still on the screen
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();

      // Check if the players collided with an enemy
      if (this.player.didCollideEnemy(enemy)) {
        // Remove the enemy from the DOM/HTML
        enemy.element.remove();

        // Remove the enemy from the array
        this.enemies.splice(i, 1);

        // Reduce player's live by 1
        this.lives--;
      }

      // Check if the enemy is off the screen (at the bottom)
      else if (enemy.left > this.width) {
        // Remove the enemy from the screen/DOM/HTML
        enemy.element.remove();

        // Remove the enemy from the array of obstacles
        this.enemies.splice(i, 1);
      }
    }

    // Creating enemies on the game screen
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
    }
  }

  endGame() {
    // Remove the player
    this.player.element.remove();

    // Remove all enemies from the array of enemies
    this.enemies.forEach((enemy) => {
      // Remove from the HTML
      enemy.element.remove();
    });

    this.gameIsOver = true;

    // Hide the game screen
    this.gameScreen.style.display = 'none';

    // Show end game screen
    this.gameEndScreen.style.display = 'block';

    this.backgroundMusic.pause();
    // Initialize the variable in the constructor
    this.backgroundMusic = null;
  }
}
