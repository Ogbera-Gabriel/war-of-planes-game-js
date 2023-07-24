class Box {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Random position for the appearance of the obstacles
    this.top = Math.floor(Math.random() * 400 + 100);

    // Appear on right
    this.right = -50;
    this.width = 100;
    this.height = 100;

    // Create the HTML element and default styling
    this.element = document.createElement('img');
    //creating different boxes randomly
    this.images = ['./images/box.png', './images/box2.png'];
    this.randomImages = Math.floor(Math.random()* this.images.length)
    this.element.src = `${this.images[this.randomImages]}`
    this.element.style.position = 'absolute';
    this.element.style.top = `${this.top}px`;
    this.element.style.right = `${this.right}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.right = `${this.right}px`;
    this.element.style.top = `${this.top}px`;
  }
  move() {
    // Drop the obstacle 3px to the left;
    this.right += 3;
    this.updatePosition();
  }
}
