const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");

const weatherSearch = function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ada8502946e81fb6b7659868e983f5b`)
    .then(response => response.json())
    .then(currentData => {
        let lat = currentData.coord.lat;
        let lon = currentData.coord.lon;
        console.log(currentData)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=6ada8502946e81fb6b7659868e983f5b`)
            .then(response => response.json())
            .then(data => {
                const currentTemp = data.daily[0].temp.day;
                const currentWind = data.daily[0].wind_speed;
                const currentHumidity = data.daily[0].humidity;
                const currentUvindex = data.daily[0].uvi;
                for (let i = 1; i < 6; i++) {
                    const nextTemp = data.daily[i].temp.day;
                    const nextWind = data.daily[i].wind_speed;
                    const nextHumidity = data.daily[i].humidity;
                    const nextUvindex = data.daily[i].uvi;
                }
                console.log(data.daily[0].temp.day)
                console.log(data)
            });
    });
}

variable.textContent = currentTemp
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