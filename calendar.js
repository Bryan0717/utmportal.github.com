// Calendar specific JavaScript

function generateCalendarDays() {
    let days = '';
    for (let i = 1; i <= 30; i++) {
        const isActive = i === 29 ? 'active' : '';
        days += `<div class="calendar-day ${isActive}">${i}</div>`;
    }
    for (let i = 1; i <= 12; i++) {
        days += `<div class="calendar-day other-month">${i}</div>`;
    }
    return days;
}

function previousMonth() {
    console.log('Previous month');
    // Add your month navigation logic here
}

function nextMonth() {
    console.log('Next month');
    // Add your month navigation logic here
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid) {
        // Add the day headers and days
        const existingHeaders = calendarGrid.querySelectorAll('.calendar-day-header');
        if (existingHeaders.length > 0) {
            // Headers already exist, just add the days
            calendarGrid.innerHTML += generateCalendarDays();
        }
    }
});