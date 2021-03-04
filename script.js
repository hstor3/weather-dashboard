$(document).ready(function () {
    searchHistory();
    
    function searchHistory() {
        searches = JSON.parse(localStorage.getItem('searches') || '[]');
        
        for (let i = 0; i < searches.length; i++) {
            //  = city[i];
            
        let recent = $('<li>').text(searches[i]);
        
        $('.citySearch').append(recent);
        
        // get div to attatch city to
        // append click funtion to div
        // add to search box and make them clickable
    }
}
    
    // let cityOutput = document.getElementById('citySearch');
    let fetchBtn = document.getElementById('search-btn');

    function getApi(name) {
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=adc7a83ef96c3c42fac6aa52f1b098b1&units=imperial'

        fetch(requestUrl)
            .then(function (response) {
                return response.json();

            })
            .then(function (data) {
                console.log(data);
                let cityElement = $('<h2>').text(data.name);
                let tempElement = $('<h2>').text('Temperature: ' + (Math.round(data.main.temp) + String.fromCharCode(176)));
                // let dateElement = $('<h2>').text(data.timezone)
                let humidElement = $('<h2>').text('Humidity: ' + (data.main.humidity) + "%");
                let windElement = $('<h2>').text('Wind Speed: ' + (Math.round(data.wind.speed) + " MPH"));
                let icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')

                $('.outputContainer').attr('style', 'border: 2px solid black ; border-radius: 5px');
                $('.cityOutput').empty();
                $('.cityOutput').append(cityElement.append(icon), tempElement, humidElement, windElement);

                get5day(data.coord.lat, data.coord.lon)
            });

        console.log(requestUrl);
    }
    
    fetchBtn.addEventListener('click', function() {
        let city = $('.input-box').val().trim()
        console.log(city);
        getApi(city);
        
        searches = JSON.parse(localStorage.getItem('searches') || '[]');
        searches.push(city)
        localStorage.setItem('searches', JSON.stringify(searches));
        
        let recent = $('<li>').text(city);
        $('.citySearch').append(recent);
    });


    function get5day(lat, lon) {
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=adc7a83ef96c3c42fac6aa52f1b098b1&units=imperial`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();

            })
            .then(function (data) {
                console.log(data);

                let uvElement = $('<h2>').text(Math.round(data.current.uvi) + ' uv');
                $('.daysForecast').empty();
                $('.cityOutput').append(uvElement);

                for (let i = 0; i < 5; i++) {
                    // let futureWeather = (data.daily[i]);
                    // let DateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(data.daily[i].dt);
                    // let fiveDayDate = $('<h3>').text(data.daily[i].dt);
                    // DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(fiveDayDate);
                    // let fiveDayDate = new DateTime(1970, 1, 1, 0, 0, 0, 0, (data.daily[i].dt))); 
                    // DateTimeKind.Utc);
                    // DateTime time = startDate.AddSeconds(data.daily[i].{dt});

                    let futureIcon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png');
                    let futureTemp = $('<h3>').text('Temp: ' + (Math.round(data.daily[i].temp.day)) + String.fromCharCode(176));
                    let futureHumid = $('<h3>').text('Humidity: ' + (data.daily[i].humidity) + '%');

                    $('.weatherOutput').attr('style', 'border: 2px solid black ; border-radius: 5px');
                    $('.daysForecast').append(futureTemp.append(futureIcon), futureHumid);


                }
                // savedSearches();
            })
    }

})