const player = document.getElementById("player");
  const gameArea = document.getElementById("gameArea");
  const scoreText = document.getElementById("score");
  const gameOverBox = document.getElementById("gameOver");
  const finalScore = document.getElementById("finalScore");
  const restartBtn = document.getElementById("restartBtn");

  let playerX = 100;
  let playerY = 100;
  let score = 0;
  let gameRunning = true;

  const speed = 15;
  const WIN_SCORE = 100;

  // Supports both arrow keys and WASD
  const moveMap = {
    ArrowRight: "right", d: "right", D: "right",
    ArrowLeft: "left", a: "left", A: "left",
    ArrowUp: "up", w: "up", W: "up",
    ArrowDown: "down", s: "down", S: "down"
  };

  document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    const direction = moveMap[e.key];
    if (!direction) return;

    e.preventDefault();

    switch (direction) {
      case "right": playerX += speed; break;
      case "left":  playerX -= speed; break;
      case "up":    playerY -= speed; break;
      case "down":  playerY += speed; break;
    }

    clampPlayerPosition();

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
  });

  // Recalculates bounds based on current gameArea + player size,
  // so the box never overflows even as it grows.
  function clampPlayerPosition() {
    const maxX = gameArea.clientWidth - player.offsetWidth;
    const maxY = gameArea.clientHeight - player.offsetHeight;

    playerX = Math.max(0, Math.min(maxX, playerX));
    playerY = Math.max(0, Math.min(maxY, playerY));
  }

  // TIMER SCORE
  const timer = setInterval(() => {
    if (gameRunning) {
      score++;
      scoreText.innerText = score;

      if (score >= WIN_SCORE - 15 && score < WIN_SCORE) {
        scoreText.parentElement.classList.add("near-win");
      }

      if (score >= WIN_SCORE) {
        winGame();
      }
    }
  }, 1000);

  // CREATE FOOD
  function createFood() {
    if (!gameRunning) return;

    const food = document.createElement("div");
    food.classList.add("food");

    let size = 70;

    // Keep food spawn fully inside gameArea bounds at its initial size
    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    food.style.width = size + "px";
    food.style.height = size + "px";
    food.style.left = x + "px";
    food.style.top = y + "px";

    gameArea.appendChild(food);

    const shrink = setInterval(() => {
      if (!gameRunning) {
        clearInterval(shrink);
        return;
      }

      size -= 2;
      food.style.width = size + "px";
      food.style.height = size + "px";

      const playerRect = player.getBoundingClientRect();
      const foodRect = food.getBoundingClientRect();

      const collided =
        playerRect.left < foodRect.right &&
        playerRect.right > foodRect.left &&
        playerRect.top < foodRect.bottom &&
        playerRect.bottom > foodRect.top;

      if (collided) {
        clearInterval(shrink);
        food.remove();

        const currentWidth = player.offsetWidth;
        const currentHeight = player.offsetHeight;

        player.style.width = currentWidth + 5 + "px";
        player.style.height = currentHeight + 5 + "px";

        // Re-clamp immediately so growth never pushes the player
        // partially outside gameArea (this was the "spilled" bug)
        clampPlayerPosition();
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";

        createFood();
      }

      if (size <= 0) {
        clearInterval(shrink);
        food.remove();
        endGame();
      }
    }, 120);
  }

  function endGame() {
    gameRunning = false;
    clearInterval(timer);
    finalScore.innerText = score;
    gameOverBox.querySelector("h1").innerText = "GAME OVER";
    gameOverBox.classList.remove("win");
    gameOverBox.style.display = "block";
  }

  function winGame() {
    gameRunning = false;
    clearInterval(timer);
    finalScore.innerText = score;
    gameOverBox.querySelector("h1").innerText = "🏆 YOU WIN!";
    gameOverBox.classList.add("win");
    gameOverBox.style.display = "block";

    // Remove any food still active on screen
    document.querySelectorAll(".food").forEach(f => f.remove());
  }

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  createFood();