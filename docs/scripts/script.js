window.onload = function () {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');

  let game;

  
  

  startButton.addEventListener('click', function () {
    startGame();
  });

  restartButton.addEventListener('click', function () {
    location.reload();
  });

  function startGame() {
    console.log('start game');

    game = new Game();

    game.start();

    
    
  }

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
    ];

    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case 'ArrowLeft':
            game.player.directionX = -5;
            break;
          case 'ArrowUp':
            game.player.directionY = -5;
            break;
          case 'ArrowRight':
            game.player.directionX = 5;
            break;
          case 'ArrowDown':
            game.player.directionY = 5;
            break;
        }
      }
    }
  }

  function handleKeyUp(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
    ];

    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case 'ArrowLeft':
            game.player.directionX = 0;
            break;
          case 'ArrowUp':
            game.player.directionY = 0;
            break;
          case 'ArrowRight':
            game.player.directionX = 0;
            break;
          case 'ArrowDown':
            game.player.directionY = 0;
            break;
        }
      }
    }
  }

  // if (key === ' ') { // Check if the spacebar (key code 32) is pressed
  //   event.preventDefault();

  //   if (game) {
  //     // Create a new bullet instance and add it to the game
  //     const bullet = new Bullet(game.gameScreen, game.player.left, game.player.top);
  //   }
  // }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
};
