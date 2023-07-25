class Bullet {
    constructor(gameScreen, playerLeft, playerTop) {
      this.gameScreen = gameScreen;
      this.width = 10;
      this.height = 20;
      this.left = playerLeft + 70; // Position the bullet relative to the player's left position
      this.top = playerTop + 0; // Position the bullet relative to the player's top position
      this.speed = 10;
  
      this.element = document.createElement('div');
      this.element.className = 'bullet'; // Add a CSS class for the bullet styling
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      // Move the bullet to the right
      this.top -= this.speed;
      this.element.style.top = `${this.top}px`;
      if (this.top + this.height < 0) {
        this.remove();
      }
    }
  
    isOutOfScreen() {
      // Check if the bullet is out of the game screen
      return this.left > this.gameScreen.offsetWidth;
    }
  
    remove() {
      // Remove the bullet from the DOM
      this.element.remove();
    }
  }
  