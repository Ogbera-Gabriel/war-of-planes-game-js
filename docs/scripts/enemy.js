class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Random position for the appearance of the enemies
    this.top = Math.floor(Math.random() * 400 + 100);

    // Appear on top
    this.left = -50;
    this.width = 150;
    this.height = 100;

    // Create the HTML element and default styling
    this.element = document.createElement('img');

    // Creating different enemies randomly
    this.images = [
      'docs/images/enemy.png',
      'docs/images/enemy2.png',
      'docs/images/enemy3.png',
      'docs/images/enemy4.png',
      'docs/images/enemy5.png',
    ];
    this.randomImages = Math.floor(Math.random() * this.images.length);
    this.element.src = `${this.images[this.randomImages]}`;
    this.element.style.position = 'absolute';
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  move() {
    // Drop the enemy 3px to the bottom;
    this.left += 3;
    this.updatePosition();
  }
}
