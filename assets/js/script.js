const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvindexEl = document.getElementById("uvindex");

const weatherSearch = function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ada8502946e81fb6b7659868e983f5b`)
    .then(response => response.json())
    .then(currentData => {
        let lat = currentData.coord.lat;
        let lon = currentData.coord.lon;
        console.log(currentData)
        cityNameEl.innerHTML = currentData.name + " " + "(" + moment.unix(currentData.dt).format("MM/DD/YYYY") + ") <img src='http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png" + "'/>";
        

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=6ada8502946e81fb6b7659868e983f5b`)
            .then(response => response.json())
            .then(data => {
                const currentTemp = data.daily[0].temp.day;
                const currentWind = data.daily[0].wind_speed;
                const currentHumidity = data.daily[0].humidity;
                const currentUvindex = data.daily[0].uvi;
                const currentIcon = data.daily[0].weather[0].icon;
                for (let i = 1; i < 6; i++) {
                    const nextTemp = data.daily[i].temp.day;
                    const nextWind = data.daily[i].wind_speed;
                    const nextHumidity = data.daily[i].humidity;
                    const nextUvindex = data.daily[i].uvi;
                    const nextIcon = data.daily[i].weather[0].icon;
                }
                console.log(data.daily[0].temp.day)
                console.log(data)
                tempEl.textContent = data.daily[0].temp.day;
                windEl.textContent = data.daily[0].wind_speed;
                humidityEl.textContent = data.daily[0].humidity;
                uvindexEl.textContent = data.daily[0].uvi;
            });
    });
}

// let resultEl = '<div class="text-center pt-1 pb-1 rounded mb-3 rounded text-black" id="searchHistory">' + Result + '</div>'

// example of how to grab above data -> variable.textContent = currentTemp
searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let city = searchBar.value;
        weatherSearch(city);
    }
})
    
searchBtn.addEventListener('click', function() {
    let city = searchBar.value;
    weatherSearch(city);
})