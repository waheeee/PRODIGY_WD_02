let startTime, updatedTime, difference, tInterval;
let isRunning = false;
let lapCounter = 1;

const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    isRunning = false;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
        lapList.appendChild(li);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const seconds = Math.floor((updatedTime / 1000) % 60);
    const minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    const hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}
