// local storage stuff last

$(document).ready(function () {


    let cityOutput = document.getElementById('citySearch');
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
                $('.cityOutput').append(cityElement.append(icon), tempElement, humidElement, windElement);

                // for (let i = 0; i < data.length; i++) {
                //     // let newLi = document.createElement()
                //     let city = document.createElement('li');
                //     // let ulItem = document.getElementById()

                //     city.textContent = data[i].html_url;
                //     city.href = data[i].html_url;

                //     cityOutput.appendChild(city);


                get5day(data.coord.lat, data.coord.lon)
            });

        console.log(requestUrl);
    }

    fetchBtn.addEventListener('click', function () {
        let city = $('.input-box').val().trim()
        console.log(city);
        getApi(city)
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
                $('.cityOutput').append(uvElement);

                for (let i = 0; i < 5; i++) {
                    // let futureWeather = (data.daily[i]);
                    
                    let futureIcon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png');
                    let futureTemp = $('<h3>').text('Temp: ' + (Math.round(data.daily[i].temp.day)) + String.fromCharCode(176));
                    let futureHumid = $('<h3>').text('Humidity: ' + (data.daily[i].humidity) + '%')
                    
                    $('.weatherOutput').attr('style', 'border: 2px solid black ; border-radius: 5px');
                    $('.daysForecast').append(futureTemp.append(futureIcon), futureHumid);
                }
            })
    }
})