// 1. Load modals first
fetch('modals.html')
    .then(r => r.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        initBubbleGame();
    });

//  start cursor
let lastStarTime = 0;

// ...etc   
const starInterval = 30;

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();

    if (currentTime - lastStarTime > starInterval) {
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.style.left = e.clientX + 'px';
        star.style.top = e.clientY + 'px';
        document.body.appendChild(star);

        lastStarTime = currentTime;

        setTimeout(() => {
            star.remove();
        }, 800);
    }
});

// Generate background stars
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Modal functions
function openModal(id) {
    document.getElementById('modal-' + id).classList.add('active');
}

function closeModal(id) {
    document.getElementById('modal-' + id).classList.remove('active');
}

// Close modal on background click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ESC key closes modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});
