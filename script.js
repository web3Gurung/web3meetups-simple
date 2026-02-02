// City filter functionality
let activeCity = 'all';

// Initialize filter buttons
function initializeFilters() {
  // Support both .filter-btn (original) and .city-filter (editorial)
  const filterButtons = document.querySelectorAll('.filter-btn, .city-filter');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const city = this.dataset.city;
      filterEvents(city);
    });
  });
}

// Filter events based on selected city
function filterEvents(city) {
  activeCity = city;

  // Update button states (support both class names)
  document.querySelectorAll('.filter-btn, .city-filter').forEach(btn => {
    if (btn.dataset.city === city) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filter day sections (support both .day-section and .calendar-section)
  document.querySelectorAll('.day-section, .calendar-section').forEach(section => {
    const sectionCities = section.dataset.city.split(',');

    if (city === 'all' || sectionCities.includes(city)) {
      section.style.display = '';

      // For sections with multiple cities, filter individual events
      // Support both .event-item and .event
      const events = section.querySelectorAll('.event-item[data-city], .event[data-city]');
      events.forEach(event => {
        const eventCity = event.dataset.city;
        event.style.display = (city === 'all' || eventCity === city) ? '' : 'none';
      });
    } else {
      section.style.display = 'none';
    }
  });
}

// Mark sections as loaded after initial animations complete (for faster filtering)
function markSectionsAsLoaded() {
  // Wait for initial staggered animations to complete
  setTimeout(() => {
    document.querySelectorAll('.calendar-section').forEach(section => {
      section.classList.add('loaded');
    });
  }, 1200); // Wait for longest animation delay (0.8s) + animation duration (0.6s) - slightly reduced
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeFilters();
  markSectionsAsLoaded();
});
