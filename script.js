// Function to fetch weather data
async function fetchWeather(city) {
    const apiKey = 'da91026e0bmshb67ba7e99200824p12a832jsn1d001525d50c';
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // Get the current date in the format "Day, Month Day"
        function getCurrentDate() {
            const now = new Date();
            const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
            const dayOfWeek = daysOfWeek[now.getDay()];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = months[now.getMonth()];
            const dayOfMonth = now.getDate();
            return `${dayOfWeek}, ${month} ${dayOfMonth}`;
        }

        // Update the UI with weather data and date/time
        document.getElementById('city-name').textContent = city;
        document.getElementById('temp').textContent = `${result.current.temp_c}°C`;
        document.getElementById('humidity').textContent = `${result.current.humidity}%`;
        document.getElementById('weather').textContent = result.current.condition.text;
        document.getElementById('wind-speed').textContent = `${result.current.wind_kph} km/h`;
        // Display the formatted current date
        document.getElementById('current-date').textContent = ` ${getCurrentDate()}`;
        // Create a new row for the city data
        if (!document.getElementById(`temp-${city}`)) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <th scope="row" class="text-start">${city}</th>
                <td><span id="temp-${city}">${result.current.temp_c}°C</span></td>
                <td><span id="humidity-${city}">${result.current.humidity}%</span></td>
                <td><span id="weather-${city}">${result.current.condition.text}</span></td>
                <td><span id="wind-${city}">${result.current.wind_kph} km/h</span></td>
                <td><span id="cloud-${city}">${result.current.cloud}%</span></td>
                <td><span id="feels-like-${city}">${result.current.feelslike_c}°C</span></td>
                <td><span id="visibility-${city}">${result.current.vis_km} km</span></td
                
            `;

            // Append the new row to the table body
            const cityWeatherBody = document.getElementById('city-weather-body');
            cityWeatherBody.appendChild(newRow);
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to handle the search button click
function searchWeather() {
    const cityInput = document.getElementById('city-input').value.trim();

    // Check if the input is not empty
    if (cityInput !== "") {
        // Clear the input field
        document.getElementById('city-input').value = "";

        // Fetch weather data for the entered city
        fetchWeather(cityInput);
    }
}

// Default cities to load weather data for
const defaultCities = ['Delhi', 'Bangalore', 'Mumbai', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Jaipur', 'Gurgaon', 'Lucknow', 'Ahmedabad'];

// Function to load default cities' weather data
function loadDefaultCities() {
    for (const city of defaultCities) {
        fetchWeather(city);
    }
}

// Load default cities' weather data on page load
loadDefaultCities();
