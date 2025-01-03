document.addEventListener('DOMContentLoaded', () => {
    const dateSearchInput = document.getElementById('dateSearch');
    const eventsContainer = document.getElementById('eventsContainer');
    let selectedDayDiv = null; // Variable to store the currently selected day
  
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
  
    // Render the calendar with proper layout
    function renderCalendar(month, year) {
        const daysContainer = document.querySelector('.days');
        const monthTitle = document.querySelector('.date h1');
        const weekdayTitle = document.querySelector('.date p');
  
        const firstDay = new Date(year, month).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
  
        daysContainer.innerHTML = '';
  
        // Update the month and year title
        monthTitle.textContent = new Date(year, month).toLocaleString('default', { month: 'long' }) + ' ' + year;
        weekdayTitle.textContent = new Date().toDateString();
  
        // Render empty spaces before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            daysContainer.appendChild(emptyDiv);
        }
  
        // Render days of the month
        for (let day = 1; day <= lastDate; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
  
            // Add event listener to each day
            dayDiv.addEventListener('click', function () {
                const selectedDate = new Date(year, month, day);
  
                // Remove highlight from previously selected day
                if (selectedDayDiv) {
                    selectedDayDiv.classList.remove('selected');
                }
  
                // Highlight the clicked day
                dayDiv.classList.add('selected');
                selectedDayDiv = dayDiv; // Store the currently selected day
  
                // Fetch events for the selected date
                fetchEvents(selectedDate);
            });
  
            daysContainer.appendChild(dayDiv);
        }
    }
  
    // Fetch events based on selected date
    function fetchEvents(date) {
        // Use the local date string without timezone shifts
        const formattedDate = date.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
  
        fetch(`/api/events?date=${formattedDate}`)
            .then(response => response.json())
            .then(events => {
                eventsContainer.innerHTML = '';
  
                if (events.length > 0) {
                    events.forEach(event => {
                        eventsContainer.innerHTML += `
                            <div class="event-card">
                                <img src="${event.image}" alt="${event.name}" class="event-image">
                                <div class="event-details">
                                    <h2>${event.name}</h2>
                                    <p>${event.description}</p>
                                    <button class="btn explore-btn" onclick="window.location.href='/event-details.html?id=${event._id}'">Explore</button>
                                </div>
                            </div>`;
                    });
                } else {
                    eventsContainer.innerHTML = `<p>No events found for ${formattedDate}.</p>`;
                }
            })
            .catch(error => {
                eventsContainer.innerHTML = `<p>Error fetching events: ${error.message}</p>`;
            });
    }
  
    // Fix input date issue to match the calendar date
    dateSearchInput.addEventListener('change', () => {
        const selectedDate = new Date(dateSearchInput.value);
  
        // Use local date components to prevent timezone issues
        const correctedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        
        // Fetch events for the corrected date
        fetchEvents(correctedDate);
    });
  
    // Change month using prev/next buttons
    document.querySelector('.prev').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
  
    document.querySelector('.next').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
  
    // Initial calendar render
    renderCalendar(currentMonth, currentYear);
    
  });
  