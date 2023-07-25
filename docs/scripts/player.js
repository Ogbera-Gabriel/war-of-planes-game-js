class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement('img');
    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
    this.crash = new Audio("docs/sounds/newBoxCrash.mp3");
    this.collision = new Audio("docs/sounds/collision.mp3");
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    // Right Side:
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }
    // Left Side
    else if (this.left < 0) {
      this.left = 0;
    }

    // Bottom Side
    if (this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;
    } else if (this.top < 0) {
      this.top = 0;
    }
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollideEnemy(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      this.collision.play();
      return true;
    } else {
      return false;
    }
  }
  didCollideBox(box) {
    const playerRect = this.element.getBoundingClientRect();
    const boxRect = box.element.getBoundingClientRect();

    if (
      playerRect.left < boxRect.right &&
      playerRect.right > boxRect.left &&
      playerRect.top < boxRect.bottom &&
      playerRect.bottom > boxRect.top
    ) {
      this.crash.play();

      return true;
    } else {
      return false;
    }
  }
}
