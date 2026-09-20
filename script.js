const apiKey = "a2357bbf0d6155de1f1a84bbd14971b1"; 
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

async function checkWeather(city) {
    if (!city.trim()) {
        alert("Enter any city name");
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 401) {
                alert("The API has not been activated yet.! (Please wait upto 10-20 minutes)");
            } else if (response.status === 404) {
                alert("Did'nt get the city. Enter valid city name");
            } else {
                alert(`Error: Status Code ${response.status}`);  
            }
            return;
        }
        const data = await response.json();

        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
        document.getElementById("condition").innerText = data.weather[0].main;

    } catch (error) {
        alert("Network Error! Please Check your Connectivity");
        console.error(error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(cityInput.value);
    }
});