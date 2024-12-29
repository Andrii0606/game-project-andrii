// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;

// Персонаж
const player = {
    x: 180,
    y: 500,
    width: 40,
    height: 40,
    color: "red",
    jump: false,
    velocity: 0,
};

// Платформи
const platforms = [
    { x: 150, y: 550, width: 100, height: 10 },
    { x: 200, y: 400, width: 100, height: 10 },
    { x: 50, y: 250, width: 100, height: 10 },
    { x: 250, y: 100, width: 100, height: 10 },
];

// Гравітація
const gravity = 0.5;

// Додавання подій
document.addEventListener("touchstart", () => {
    if (!player.jump) {
        player.velocity = -10;
        player.jump = true;
    }
});

// Малюємо персонажа
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Малюємо платформи
function drawPlatforms() {
    ctx.fillStyle = "green";
    platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Оновлення гри
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рух персонажа
    player.y += player.velocity;
    player.velocity += gravity;

    // Обмеження падіння
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.jump = false;
    }

    // Перевірка на платформу
    platforms.forEach((platform) => {
        if (
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height &&
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width
        ) {
            player.velocity = -10;
            player.jump = false;
        }
    });

    // Малюємо об'єкти
    drawPlayer();
    drawPlatforms();

    requestAnimationFrame(updateGame);
}

// Запускаємо гру
updateGame();
