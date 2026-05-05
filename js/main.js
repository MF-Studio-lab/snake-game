// Snake Game Logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Game Constants
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

// Game State
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let gameSpeed = 100;
let isGameRunning = false;
let isPaused = false;

// Initialize Game
function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    gameSpeed = 100;
    isPaused = false;
    updateScore();
    generateFood();
}

// Generate Food
function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    food = newFood;
}

// Update Score
function updateScore() {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

// Draw Game
function draw() {
    // Clear Canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw Grid
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }

    // Draw Snake
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(
            segment.x * CELL_SIZE,
            segment.y * CELL_SIZE,
            (segment.x + 1) * CELL_SIZE,
            (segment.y + 1) * CELL_SIZE
        );

        if (index === 0) {
            // Head
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
        } else {
            // Body
            gradient.addColorStop(0, '#764ba2');
            gradient.addColorStop(1, '#667eea');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );

        // Draw eyes on head
        if (index === 0) {
            ctx.fillStyle = 'white';
            const eyeSize = 3;
            const eyeOffset = 5;

            if (direction === 'right') {
                ctx.fillRect(
                    segment.x * CELL_SIZE + CELL_SIZE - eyeOffset,
                    segment.y * CELL_SIZE + 4,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    segment.x * CELL_SIZE + CELL_SIZE - eyeOffset,
                    segment.y * CELL_SIZE + CELL_SIZE - 4 - eyeSize,
                    eyeSize,
                    eyeSize
                );
            } else if (direction === 'left') {
                ctx.fillRect(
                    segment.x * CELL_SIZE + eyeOffset - eyeSize,
                    segment.y * CELL_SIZE + 4,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    segment.x * CELL_SIZE + eyeOffset - eyeSize,
                    segment.y * CELL_SIZE + CELL_SIZE - 4 - eyeSize,
                    eyeSize,
                    eyeSize
                );
            } else if (direction === 'up') {
                ctx.fillRect(
                    segment.x * CELL_SIZE + 4,
                    segment.y * CELL_SIZE + eyeOffset - eyeSize,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    segment.x * CELL_SIZE + CELL_SIZE - 4 - eyeSize,
                    segment.y * CELL_SIZE + eyeOffset - eyeSize,
                    eyeSize,
                    eyeSize
                );
            } else if (direction === 'down') {
                ctx.fillRect(
                    segment.x * CELL_SIZE + 4,
                    segment.y * CELL_SIZE + CELL_SIZE - eyeOffset,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    segment.x * CELL_SIZE + CELL_SIZE - 4 - eyeSize,
                    segment.y * CELL_SIZE + CELL_SIZE - eyeOffset,
                    eyeSize,
                    eyeSize
                );
            }
        }
    });

    // Draw Food
    ctx.fillStyle = '#dc3545';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Draw food shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2 - 3,
        food.y * CELL_SIZE + CELL_SIZE / 2 - 3,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Move Snake
function moveSnake() {
    direction = nextDirection;

    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }

    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();

        // Increase speed slightly
        if (gameSpeed > 50) {
            gameSpeed -= 2;
        }
    } else {
        snake.pop();
    }
}

// Game Loop
function gameLoopFunction() {
    if (!isPaused) {
        moveSnake();
        draw();
    }
}

// Start Game
function startGame() {
    if (isGameRunning) return;

    initGame();
    isGameRunning = true;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';

    gameLoop = setInterval(gameLoopFunction, gameSpeed);
}

// Restart Game
function restartGame() {
    clearInterval(gameLoop);
    isGameRunning = false;
    startGame();
}

// Game Over
function gameOver() {
    clearInterval(gameLoop);
    isGameRunning = false;

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        updateScore();
    }

    // Show game over message
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('遊戲結束!', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 20);

    ctx.font = '20px Arial';
    ctx.fillText(`分數: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 20);

    startBtn.style.display = 'inline-block';
    startBtn.textContent = '重新開始';
    restartBtn.style.display = 'none';
}

// Toggle Pause
function togglePause() {
    if (!isGameRunning) return;

    isPaused = !isPaused;

    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('暫停', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    }
}

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

document.addEventListener('keydown', (e) => {
    // Prevent default for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
        e.preventDefault();
    }

    // Start game on any key if not running
    if (!isGameRunning && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
        return;
    }

    // Toggle pause on space
    if (e.key === ' ') {
        togglePause();
        return;
    }

    // Change direction
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
});

// Initialize
updateScore();
draw();
