// This script will run when the DOM is fully loaded, ensuring all HTML elements are ready.
document.addEventListener('DOMContentLoaded', function() {

    // --- STATE ---
    // We use a single 'Date' object to keep track of the currently displayed month and year.
    // It starts with today's date when the page first loads.
    let currentDate = new Date();

    // --- DOM ELEMENTS ---
    // Get references to the HTML elements we need to update.
    const calendarGrid = document.getElementById('calendarGrid');
    const monthDisplay = document.querySelector('.calendar-month');

    // --- CORE FUNCTION: RENDER CALENDAR ---
    // This is the main function that redraws the calendar based on the 'currentDate'.
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // 0 = January, 11 = December

        // Update the header to show the current month and year (e.g., "October 2024")
        monthDisplay.textContent = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(currentDate);

        // Clear the previous month's days, but keep the day headers (Su, Mo, etc.)
        // We do this by removing any children after the first 7 (the headers).
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }

        // --- CALCULATE DATES FOR THE GRID ---
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0); // The '0' day of next month is the last day of the current month
        const daysInMonth = lastDayOfMonth.getDate();
        const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ...

        // Create blank "padding" days for the first week to align the 1st day correctly.
        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'other-month'); // Style it as a non-interactive day
            calendarGrid.appendChild(emptyCell);
        }

        // Create a cell for each actual day of the month.
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;

            // Highlight today's date with the 'active' class.
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('active');
            }

            calendarGrid.appendChild(dayCell);
        }
    }

    // --- NAVIGATION FUNCTIONS ---
    // These functions must be attached to the global 'window' object
    // so the 'onclick' attributes in the HTML can find and call them.

    window.previousMonth = function() {
        // Go to the previous month. The Date object handles year changes automatically.
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(); // Redraw the calendar with the new date
    }

    window.nextMonth = function() {
        // Go to the next month.
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(); // Redraw the calendar with the new date
    }

    // --- INITIAL RENDER ---
    // Draw the calendar for the first time when the page loads.
    renderCalendar();
});