const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
const moon = document.getElementById('moon');
const poem = document.getElementById('poem');

let stars = [];

// Resize the canvas to fit the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
}

// Create stars with random positions and brightness
function createStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            brightness: Math.random(), // Initial brightness
            speed: Math.random() * 0.02 + 0.01, // Twinkle speed
            direction: Math.random() < 0.5 ? 1 : -1 // Random flicker direction
        });
    }
}

// Draw twinkling stars
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        // Change brightness gradually
        star.brightness += star.speed * star.direction;
        if (star.brightness <= 0.2 || star.brightness >= 1) {
            star.direction *= -1; // Reverse flicker direction
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
    });

    requestAnimationFrame(drawStars);
}

// Toggle poem visibility when moon is clicked
moon.addEventListener('click', () => {
    poem.style.display = poem.style.display === "block" ? "none" : "block";
});

// Start animation
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();
