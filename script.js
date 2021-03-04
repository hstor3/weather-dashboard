$(document).ready(function () {
    searchHistory();

    function searchHistory() {
        searches = JSON.parse(localStorage.getItem('searches') || '[]');

        for (let i = 0; i < searches.length; i++) {
            //  = city[i];

            let recent = $('<li class="city">').text(searches[i]);

            $('.citySearch').append(recent);

            // get div to attatch city to
            // append click funtion to div
            // add to search box and make them clickable
        }
    }

    $(".city").on('click', function (event) {
        console.log(event.target.outerText)    
        // let city = event.text
        console.log(event)
        getApi(event.target.outerText);
        // get5day();
    })

    // function cityClicks() {

    // } 

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

    fetchBtn.addEventListener('click', function () {
        let city = $('.input-box').val().trim()
        console.log(city);
        getApi(city);

        searches = JSON.parse(localStorage.getItem('searches') || '[]');
        console.log(searches.includes(city))
        if (!searches.includes(city)) {

            searches.push(city)

            let recent = $('<li>').text(city);
            $('.citySearch').append(recent);
        }
        localStorage.setItem('searches', JSON.stringify(searches));

    });


    function get5day(lat, lon) {
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=adc7a83ef96c3c42fac6aa52f1b098b1&units=imperial`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();

            })
            .then(function (data) {
                console.log(data);

                let uvNumb = Math.round(data.current.uvi)
                let uvElement = $('<h2>').text(uvNumb + ' uv');
                let square = $('<div>');
                uvElement.append(square);

                $('.cityOutput').append(uvElement);

                if (uvNumb <= 2 || uvNumb >= 0) {
                    square.addClass('green')
                } else if (uvNumb <= 5 || uvNumb >= 3) {
                    square.addClass('yellow')
                } else if (uvNumb <= 7 || uvNumb >= 6) {
                    square.addClass('orange')
                } else if (uvNumb <= 10 || uvNumb >= 8) {
                    square.addClass('red')
                } else {
                    square.addClass('purple')
                }
                // else if (uvElement <=)
                console.log(uvElement)
                $('.weatherOutput').empty();

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

                    $('.outputContain').attr('style', 'border: 2px solid black ; border-radius: 5px');
                    $('.weatherOutput').append(futureTemp.append(futureIcon), futureHumid);


                }
                // savedSearches();
            })
    }

})