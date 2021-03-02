// help with api key
// display things properlly to the webpage
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
                let tempElement = $('<h2>').text(Math.round(data.main.temp) + String.fromCharCode(176));
                // let dateElement = $('<h2>').text(data.timezone)
                let humidElement = $('<h2>').text((data.main.humidity) + "%");
                let windElement = $('<h2>').text(Math.round(data.wind.speed) + " mph");
                
                
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
                // }
            });

        console.log(requestUrl);
    }

    fetchBtn.addEventListener('click', function () {
        var city = $('.input-box').val().trim()
        console.log(city);
        getApi(city)
    });

    function get5day(lat, lon) {
        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=adc7a83ef96c3c42fac6aa52f1b098b1&units=imperial`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();

            })
            .then(function (data) {
                console.log(data);
                let uvElement = $('<h2>').text(Math.round(data.current.uvi) + ' uv');
                $('.cityOutput').append(uvElement)
            })
    }





    // let conditionElement = document.getElementById('condition');
    // // let cityElement = document.getElementById('city');
    // let dateElement = document.getElementById('date');
    // let tempElement = document.getElementById('temp');
    // let humidElement = document.getElementById('humid');
    // let windElement = document.getElementById('wind');
    // let uvElement = document.getElementById('uv');

    // function currentWeatherData(data, place) {
    //     conditionElement.textContent = data.
    //     cityElement.textContent = place
    //     dateElement.textContent = data.
    //     tempElement.textContent = data.
    //     humidElement.textContent = data.
    //     windElement.textContent = data. 
    //     uvElement.textContent = data.
    // }

})

