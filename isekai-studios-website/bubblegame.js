let startButton;
let gameArea;
let scoreDisplay;
let scoreEntry;
let finalScoreDisplay;
let initialsInput;
let saveScoreButton;
let leaderboardList;

let score = 0;
let speed = 85;
let currentBubble = null;
let animationFrame = null;
let gameRunning = false;

function initBubbleGame()
{
    startButton = document.getElementById("start-button");
    gameArea = document.getElementById("game-area");
    scoreDisplay = document.getElementById("score");
    scoreEntry = document.getElementById("score-entry");
    finalScoreDisplay = document.getElementById("final-score");
    initialsInput = document.getElementById("initials-input");
    saveScoreButton = document.getElementById("save-score-button");
    leaderboardList = document.getElementById("leaderboard-list");

    if (!startButton || !gameArea)
    {
        return;
    }

    if (startButton.dataset.initialized === "true")
    {
        return;
    }

startButton.dataset.initialized = "true";

    startButton.addEventListener("click", startGame);
    saveScoreButton.addEventListener("click", saveScore);

    initialsInput.addEventListener("input", function()
    {
        initialsInput.value = initialsInput.value
            .replace(/[^a-zA-Z]/g, "")
            .toUpperCase();
    });

    initialsInput.addEventListener("keydown", function(event)
    {
        if (event.key === "Enter")
        {
            saveScore();
        }
    });

    renderLeaderboard();
}

function startGame()
{
    score = 0;
    speed = 85;
    gameRunning = true;

    scoreDisplay.textContent = score;
    startButton.style.display = "none";
    scoreEntry.classList.add("hidden");

    removeCurrentBubble();
    spawnBubble();
}

function spawnBubble()
{
    if (!gameRunning)
    {
        return;
    }

    const bubble = document.createElement("button");
    bubble.classList.add("bubble");

    const bubbleSize = 80;
    const maxY = gameArea.clientHeight - bubbleSize;

    let x = -bubbleSize;
    const y = Math.random() * maxY;
    let lastTime = null;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    bubble.addEventListener("pointerdown", function(event)
    {
        event.preventDefault();

        score++;
        scoreDisplay.textContent = score;

        if (score >= 10)
        {
            speed += 5;
        }

        removeCurrentBubble();
        spawnBubble();
    });

    currentBubble = bubble;
    gameArea.appendChild(bubble);

    function moveBubble(currentTime)
    {
        if (!gameRunning || currentBubble !== bubble)
        {
            return;
        }

        if (lastTime === null)
        {
            lastTime = currentTime;
        }

        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        x += speed * deltaTime;
        bubble.style.left = `${x}px`;

        if (x > gameArea.clientWidth)
        {
            endGame();
            return;
        }

        animationFrame = requestAnimationFrame(moveBubble);
    }

    animationFrame = requestAnimationFrame(moveBubble);
}

function removeCurrentBubble()
{
    if (animationFrame)
    {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    if (currentBubble)
    {
        currentBubble.remove();
        currentBubble = null;
    }
}

function endGame()
{
    gameRunning = false;
    removeCurrentBubble();

    finalScoreDisplay.textContent = score;
    initialsInput.value = "";
    scoreEntry.classList.remove("hidden");
    initialsInput.focus();
}

function saveScore()
{
    const initials = initialsInput.value.trim().toUpperCase();

    if (initials.length !== 3)
    {
        alert("Please enter exactly 3 letters.");
        return;
    }

    const leaderboard = getLeaderboard();

    leaderboard.push({
        initials: initials,
        score: score
    });

    leaderboard.sort(function(a, b)
    {
        return b.score - a.score;
    });

    const topScores = leaderboard.slice(0, 10);

    localStorage.setItem("bubblepopLeaderboard", JSON.stringify(topScores));

    scoreEntry.classList.add("hidden");

    startButton.textContent = "Play Again";
    startButton.style.display = "block";

    renderLeaderboard();
}

function getLeaderboard()
{
    const savedScores = localStorage.getItem("bubblepopLeaderboard");

    if (!savedScores)
    {
        return [];
    }

    return JSON.parse(savedScores);
}

function renderLeaderboard()
{
    const leaderboard = getLeaderboard();

    leaderboardList.innerHTML = "";

    if (leaderboard.length === 0)
    {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No scores yet";
        leaderboardList.appendChild(emptyMessage);
        return;
    }

    leaderboard.forEach(function(entry)
    {
        const listItem = document.createElement("li");

        listItem.textContent = `${entry.initials} — ${entry.score}`;

        leaderboardList.appendChild(listItem);
    });
}