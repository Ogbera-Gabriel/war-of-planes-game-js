class Enemy2 {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Random position for the appearance of the obstacles
    this.left = Math.floor(Math.random() * 200 + 70);

    // Appear on top
    this.top = -50;
    this.width = 100;
    this.height = 150;

    // Create the HTML element and default styling
    this.element = document.createElement('img');
    this.element.src = './images/enemy.png';
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
    // Drop the obstacle 3px to the bottom;
    this.top += 3;
    this.updatePosition();
  }
}
