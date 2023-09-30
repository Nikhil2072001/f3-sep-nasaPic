// Function to fetch and display the image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiKey = "SIwUypPbtJQoPL9E3s3flbeOgfMK6BR9bBXBT7hu"; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

    // Fetch data from NASA API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Display the image of the day in the current-image-container
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching the image of the day.");
        });
}

// Function to fetch and display the image for a selected date
function getImageOfTheDay(date) {
    const apiKey = "SIwUypPbtJQoPL9E3s3flbeOgfMK6BR9bBXBT7hu"; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    // Fetch data from NASA API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the image of the day in the current-image-container
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;

            // Save the date to local storage and add it to the search history
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching the image for the selected date.");
        });
}

// Function to save a date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to add search history to the UI
function addSearchToHistory() {
    const searchHistoryList = document.getElementById("search-history-list");
    searchHistoryList.innerHTML = "";

    const searches = JSON.parse(localStorage.getItem("searches")) || [];

    searches.forEach(date => {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.addEventListener("click", () => {
            getImageOfTheDay(date);
        });
        searchHistoryList.appendChild(listItem);
    });
}

// Event listener for the search form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    const selectedDate = searchInput.value;

    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});

// Initialize the page by displaying the current image of the day
getCurrentImageOfTheDay();
addSearchToHistory();
