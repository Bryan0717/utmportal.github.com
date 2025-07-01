// Dashboard specific JavaScript

// --- DATA ---
const newsData = [
    {
        type: 'post',
        title: 'Part 2: Generative AI in Research',
        subtitle: 'Continuing from Part 1, which highlighted the need to study Generative AI adoption and its implications on research integrity.',
        date: '12/03/2025',
        views: 22,
        likes: 1,
        shares: 1,
        imageUrl: 'https://i.imgur.com/L1d2pG4.png' 
    },
    {
        type: 'event',
        title: 'WAW 2025 Conference',
        subtitle: 'Join us at Vilnius University for the World Academic Writing conference from June 30 to July 3, 2025.',
        date: '07/01/2025',
        imageUrl: 'https://i.imgur.com/sSctn9E.png'
    },
    {
        type: 'grant',
        title: 'Asia-Pacific Network Grant',
        subtitle: 'Applications are now open for the Global Change Research grant. Empower your next project with vital funding.',
        date: '29/01/2025',
        imageUrl: 'https://i.imgur.com/3sF626i.png' 
    }
];

// Data for the "More News" section
const moreNewsData = [
    { type: 'announcement', title: 'New Library Resources Available for Q2', excerpt: 'Explore our newly acquired databases and digital archives...', date: '10/03/2025' },
    { type: 'post', title: 'A Guide to Effective Academic Posters', excerpt: 'Learn the key principles of designing a compelling research poster.', date: '08/03/2025' },
    { type: 'grant', title: 'Call for Proposals: Social Impact Fund', excerpt: 'Funding available for student-led projects addressing community challenges.', date: '05/03/2025' },
    { type: 'event', title: 'Upcoming Webinar: Data Visualization with Python', excerpt: 'Join Dr. Chen for a hands-on workshop on creating impactful charts.', date: '02/03/2025' },
];

const allEvents = [
    { code: 'IWPE25', date: '30/06/2025', country: 'my' },
    { code: 'WAW2025', date: '30/06/2025', country: 'my' },
    { code: 'ACSW\'25', date: '30/06/2025', country: 'my' },
    { code: 'GLSVLSI\'25', date: '30/06/2025', country: 'my' },
    { code: '5PSC', date: '30/06/2025', country: 'my' },
    { code: 'ICSE\'25', date: '01/07/2025', country: 'us' },
    { code: 'EuroSys\'25', date: '05/07/2025', country: 'de' },
    { code: 'WebConf\'25', date: '12/07/2025', country: 'sg' },
];

let currentNewsIndex = 0;
let currentEventPage = 1;
const eventsPerPage = 5;

// --- NEWS CAROUSEL FUNCTIONS ---
function renderNewsCarousel() {
    const carousel = document.getElementById('newsCarousel');
    const dots = document.getElementById('carouselDots');
    
    carousel.innerHTML = newsData.map(item => `
        <div class="news-card-wrapper">
            <div class="news-card" style="background-image: url('${item.imageUrl}')">
                <div class="news-tag ${item.type}">${item.type}</div>
                <div class="news-content">
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-subtitle">${item.subtitle}</p>
                    <div class="news-meta">
                        <span>📅 ${item.date}</span>
                        ${item.type === 'post' ? `
                        <div class="news-stats">
                            <span class="news-stat">👁️ ${item.views}</span>
                            <span class="news-stat">❤️ ${item.likes}</span>
                            <span class="news-stat">🔗 ${item.shares}</span>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    const carouselWrapper = document.querySelector('.news-carousel');
    if (carouselWrapper) {
        carouselWrapper.style.transform = `translateX(-${currentNewsIndex * 100}%)`;
    }

    dots.innerHTML = newsData.map((_, index) => 
        `<div class="carousel-dot ${index === currentNewsIndex ? 'active' : ''}" onclick="goToNews(${index})"></div>`
    ).join('');
}

// Function to render the "More News" grid
function renderMoreNews() {
    const grid = document.getElementById('moreNewsGrid');
    if (!grid) return;
    grid.innerHTML = moreNewsData.map(item => `
        <div class="small-news-card">
            <div class="news-tag ${item.type}">${item.type}</div>
            <h4 class="small-news-title">${item.title}</h4>
            <p class="small-news-excerpt">${item.excerpt}</p>
            <p class="small-news-date">📅 ${item.date}</p>
        </div>
    `).join('');
}

function navigateNews(direction) {
    currentNewsIndex = (currentNewsIndex + direction + newsData.length) % newsData.length;
    renderNewsCarousel();
}

function goToNews(index) {
    currentNewsIndex = index;
    renderNewsCarousel();
}

// --- EVENTS FUNCTIONS ---
function renderEvents() {
    const totalPages = Math.ceil(allEvents.length / eventsPerPage);
    document.getElementById('eventCurrentPage').textContent = currentEventPage;
    document.getElementById('eventTotalPages').textContent = totalPages;
    
    document.getElementById('eventPrevBtn').disabled = currentEventPage === 1;
    document.getElementById('eventNextBtn').disabled = currentEventPage === totalPages;

    const start = (currentEventPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const paginatedEvents = allEvents.slice(start, end);

    const eventList = document.getElementById('eventList');
    eventList.innerHTML = paginatedEvents.map(event => `
        <div class="event-item">
            <div class="event-flag">
                <img src="https://flagcdn.com/w40/${event.country}.png" alt="${event.country} flag">
            </div>
            <div class="event-details">
                <div class="event-name">${event.code}</div>
                <div class="event-date">${event.date}</div>
            </div>
            <div class="event-arrow">→</div>
        </div>
    `).join('');
}

function navigateEvents(direction) {
    const totalPages = Math.ceil(allEvents.length / eventsPerPage);
    const newPage = currentEventPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentEventPage = newPage;
        renderEvents();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderNewsCarousel();
    renderMoreNews();
    renderEvents();
});