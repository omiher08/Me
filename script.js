const eventsConfig = [
    {
        id: 'birth',
        title: 'Mi vida',
        date: '2008-06-06T18:00-05:00', 
        type: 'count-up'
    },
    {
        id: 'birth-countdown',
        title: 'Cumpleaños 😁',
        date: '2026-06-06T00:00-05:00',
        type: 'count-down'
    },
    {
        id: 'sara',
        title: 'Conocí a Sara',
        date: '2024-09-24T16:00-05:00',
        type: 'count-up'
    },
    {
        id: 'sara-birthday',
        title: 'Cumpleaños Sara',
        date: '2026-02-16T00:00-05:00',
        type: 'count-down'
    },
    {
        id: 'streak',
        title: 'Tu racha 🙃',
        date: '2026-01-12T00:53-05:00',
        type: 'count-up'
    },
    {
        id: 'orbits',
        title: 'Proyecto órbitas',
        date: '2025-07-20T18:58-05:00',
        type: 'count-up'
    },
    {
        id: 'luv',
        title: '🙂',
        date: '2025-10-24T20:13-05:00',
        type: 'count-up'
    },
    {
        id: 'uncertainty',
        title: '???',
        date: '2025-11-19T21:27-05:00',
        type: 'count-up'
    },
    {
        id: 'checkpoint',
        title: 'Checkpoint',
        date: '2026-04-12T12:00-05:00',
        type: 'count-down'
    },
    {
        id: 'school',
        title: 'Terminé el colegio',
        date: '2025-11-13T13:20-05:00',
        type: 'count-up'
    },
    {
        id: 'university',
        title: 'Universidad',
        date: '2026-02-02T07:00-05:00',
        type: 'count-down',
    },
    {
        id: 'year',
        title: '2026',
        date: '2026-12-31T23:59:59-05:00',
        type: 'count-down'
    },
];

const container = document.getElementById('timers-container');

// Helpers de tiempo
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function createTimerHTML(event) {
    const article = document.createElement('article');
    article.className = `timer-card ${event.type}`;
    article.id = `card-${event.id}`;
    
    article.innerHTML = `
        <h2 class="timer-title">${event.title}</h2>
        <div class="timer-display" id="timer-${event.id}">
            <div class="time-unit">
                <span class="time-value" data-unit="days">0</span>
                <span class="time-label">Días</span>
            </div>
            <span class="separator">:</span>
            <div class="time-unit">
                <span class="time-value" data-unit="hours">00</span>
                <span class="time-label">Hrs</span>
            </div>
            <span class="separator">:</span>
            <div class="time-unit">
                <span class="time-value" data-unit="minutes">00</span>
                <span class="time-label">Min</span>
            </div>
            <span class="separator">:</span>
            <div class="time-unit">
                <span class="time-value" data-unit="seconds">00</span>
                <span class="time-label">Seg</span>
            </div>
        </div>
    `;
    return article;
}

function initTimers() {
    container.innerHTML = '';
    eventsConfig.forEach(event => {
        container.appendChild(createTimerHTML(event));
    });
    updateTimers();
    setInterval(updateTimers, 1000);
}

function updateTimers() {
    const now = new Date().getTime();

    eventsConfig.forEach(event => {
        const targetDate = new Date(event.date).getTime();
        const timerElement = document.getElementById(`timer-${event.id}`);
        
        if (!timerElement) return;

        let distance = event.type === 'count-up' 
            ? now - targetDate 
            : targetDate - now;

        if (distance < 0 && event.type === 'count-down') distance = 0;

        const days = Math.floor(distance / DAY);
        const hours = Math.floor((distance % DAY) / HOUR);
        const minutes = Math.floor((distance % HOUR) / MINUTE);
        const seconds = Math.floor((distance % MINUTE) / SECOND);

        // Actualizar DOM
        const daysEl = timerElement.querySelector('[data-unit="days"]');
        daysEl.textContent = days; 
        
        timerElement.querySelector('[data-unit="hours"]').textContent = pad(hours);
        timerElement.querySelector('[data-unit="minutes"]').textContent = pad(minutes);
        timerElement.querySelector('[data-unit="seconds"]').textContent = pad(seconds);
    });
}


document.addEventListener('DOMContentLoaded', initTimers);






