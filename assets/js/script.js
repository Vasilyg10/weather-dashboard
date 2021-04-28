const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvindexEl = document.getElementById("uvindex");

const temp1El = document.getElementById("temp1");
const temp2El = document.getElementById("temp2");
const temp3El = document.getElementById("temp3");
const temp4El = document.getElementById("temp4");
const temp5El = document.getElementById("temp5");

const wind1El = document.getElementById("wind1");
const wind2El = document.getElementById("wind2");
const wind3El = document.getElementById("wind3");
const wind4El = document.getElementById("wind4");
const wind5El = document.getElementById("wind5");

const humidity1El = document.getElementById("humidity1");
const humidity2El = document.getElementById("humidity2");
const humidity3El = document.getElementById("humidity3");
const humidity4El = document.getElementById("humidity4");
const humidity5El = document.getElementById("humidity5");

const date1El = document.getElementById("date1");
const date2El = document.getElementById("date2");
const date3El = document.getElementById("date3");
const date4El = document.getElementById("date4");
const date5El = document.getElementById("date5");

const resultEl = document.getElementById("result");

const weatherSearch = function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ada8502946e81fb6b7659868e983f5b`)
    .then(response => response.json())
    .then(currentData => {
        let lat = currentData.coord.lat;
        let lon = currentData.coord.lon;
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
                tempEl.textContent = data.daily[0].temp.day;
                windEl.textContent = data.daily[0].wind_speed;
                humidityEl.textContent = data.daily[0].humidity;
                uvindexEl.textContent = data.daily[0].uvi;

                if(data.daily[0].uvi >= 7) {
                    uvindexEl.classList.remove("uvindexSevere")
                    uvindexEl.classList.remove("uvindexModerate")
                    uvindexEl.classList.remove("uvindexFavorable")
                    uvindexEl.classList.add("uvindexSevere")
                    uvindexEl.classList.add("rounded")
                }
                else if (data.daily[0].uvi <=3) {
                    uvindexEl.classList.remove("uvindexSevere")
                    uvindexEl.classList.remove("uvindexModerate")
                    uvindexEl.classList.remove("uvindexFavorable")
                    uvindexEl.classList.add("uvindexFavorable")
                    uvindexEl.classList.add("rounded")
                }
                else {
                    uvindexEl.classList.remove("uvindexSevere")
                    uvindexEl.classList.remove("uvindexModerate")
                    uvindexEl.classList.remove("uvindexFavorable")
                    uvindexEl.classList.add("uvindexModerate")
                    uvindexEl.classList.add("rounded")
                }

                temp1El.textContent = data.daily[1].temp.day;
                wind1El.textContent = data.daily[1].wind_speed;
                humidity1El.textContent = data.daily[1].humidity;
                date1El.innerHTML = moment.unix(data.daily[1].dt).format("MM/DD/YYYY") + "<img src='http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png" + "'/>";

                temp2El.textContent = data.daily[2].temp.day;
                wind2El.textContent = data.daily[2].wind_speed;
                humidity2El.textContent = data.daily[2].humidity;
                date2El.innerHTML = moment.unix(data.daily[2].dt).format("MM/DD/YYYY") + "<img src='http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png" + "'/>";

                temp3El.textContent = data.daily[3].temp.day;
                wind3El.textContent = data.daily[3].wind_speed;
                humidity3El.textContent = data.daily[3].humidity;
                date3El.innerHTML = moment.unix(data.daily[3].dt).format("MM/DD/YYYY") + "<img src='http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png" + "'/>";

                temp4El.textContent = data.daily[4].temp.day;
                wind4El.textContent = data.daily[4].wind_speed;
                humidity4El.textContent = data.daily[4].humidity;
                date4El.innerHTML = moment.unix(data.daily[4].dt).format("MM/DD/YYYY") + "<img src='http://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png" + "'/>";

                temp5El.textContent = data.daily[5].temp.day;
                wind5El.textContent = data.daily[5].wind_speed;
                humidity5El.textContent = data.daily[5].humidity;
                date5El.innerHTML = moment.unix(data.daily[5].dt).format("MM/DD/YYYY") + "<img src='http://openweathermap.org/img/w/" + data.daily[5].weather[0].icon + ".png" + "'/>";                
            });
    });
}

let searchResults = [];

localStorage.getItem('searchResults');

let searching = function () {
    resultEl.innerHTML = '<div class="text-center pt-1 pb-1 rounded mb-3 rounded text-black" id="searchHistory">' + searchResults + '</div>'
}

// example of how to grab above data -> variable.textContent = currentTemp
searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let city = searchBar.value;
        weatherSearch(city);
        searchResults.push(city);
        localStorage.setItem('searchResults', JSON.stringify(searchResults));
        searching();
    }
})
    
searchBtn.addEventListener('click', function() {
    let city = searchBar.value;
    weatherSearch(city);
    searchResults.push(city);
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
    searching();
})