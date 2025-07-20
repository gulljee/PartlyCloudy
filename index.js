async function getWeather(cityName) {
    const loading = document.querySelector('.loading');
    const weatherInfo = document.querySelector('.weather-info');
    
    loading.style.display = 'block';
    weatherInfo.style.display = 'none';
    
    const apiKey = 'YOUR_API_KEY';
    const latLonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${5}&appid=${apiKey}`;
    
    try {
        const res1 = await fetch(latLonUrl);
        if (!res1.ok) throw new Error('City not found');
        const data1 = await res1.json();
        
        if (!data1 || data1.length === 0) {
            throw new Error('City not found');
        }
        
        const lat = data1[0].lat;
        const lon = data1[0].lon;
        
        const mainUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const res2 = await fetch(mainUrl);
        const data2 = await res2.json();
        
        document.querySelector(".desc").textContent = data2.weather[0].description;
        document.querySelector(".temp").innerHTML = `${Math.round(data2.main.temp)} &#8451;`;
        document.querySelector(".humidity").textContent = `${data2.main.humidity}%`;
        document.querySelector(".windSpeed").textContent = `${data2.wind.speed} m/s`;
        
        const riseTime = new Date(data2.sys.sunrise * 1000);
        const setTime = new Date(data2.sys.sunset * 1000);
        
        document.querySelector(".sunRise").textContent = riseTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        document.querySelector(".sunSet").textContent = setTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
        loading.style.display = 'none';
        weatherInfo.style.display = 'grid';
    } catch(e) {
        loading.style.display = 'none';
        alert('Error fetching weather data. Please try again.');
        console.error(e);
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('cityInp').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});