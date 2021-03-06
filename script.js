// onload function
$(document).ready(function () {
    let day = moment().format('LL');
    searchHistory();

    // list of cities that saves to local storage
    function searchHistory() {
        searches = JSON.parse(localStorage.getItem('searches') || '[]');

        // loops through the amount of city lists
        for (let i = 0; i < searches.length; i++) {

            let recent = $('<div class="city">').text(searches[i]);

            $('.citySearch').append(recent);
        }
    }

// city click function
    $(".city").on('click', function (event) {
        getApi(event.target.outerText);
    })

    let fetchBtn = document.getElementById('search-btn');

// url to fetch info from
    function getApi(name) {
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=adc7a83ef96c3c42fac6aa52f1b098b1&units=imperial'

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
// getting data from the url and creating elements
            .then(function (data) {
                console.log(data);
                let cityElement = $('<h2>').text(data.name);
                let dateElement = $('<div>').text(day);
                let tempElement = $('<div>').text('Temperature: ' + (Math.round(data.main.temp) + String.fromCharCode(176)));
                let humidElement = $('<div>').text('Humidity: ' + (data.main.humidity) + "%");
                let windElement = $('<div>').text('Wind Speed: ' + (Math.round(data.wind.speed) + " MPH"));
                let icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')

// minimal styling to the output container and appending the above data to the city output container
                $('.outputContainer').attr('style', 'border: 2px solid black ; border-radius: 5px');
                $('.cityOutput').empty();
                $('.cityOutput').append(cityElement.append(icon), dateElement, tempElement, humidElement, windElement);

                get5day(data.coord.lat, data.coord.lon)
            });
    }

// button functionality/local storage stuff
    fetchBtn.addEventListener('click', function () {
        let city = $('.input-box').val().trim()
        getApi(city);

        searches = JSON.parse(localStorage.getItem('searches') || '[]');
        if (!searches.includes(city)) {

            searches.push(city)

            let recent = $('<div>').text(city);
            $('.citySearch').append(recent);
        }
        localStorage.setItem('searches', JSON.stringify(searches));

    });

// 5 day forecast url to fetch from
    function get5day(lat, lon) {
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=adc7a83ef96c3c42fac6aa52f1b098b1&units=imperial`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                console.log(data);

// uv index data and where it's attatched in the HTML file
                let uvNumb = Math.round(data.current.uvi)
                let square = $('<div class="m-auto">');
                let uvElement = $('<div class="d-flex; text-center; pb-3">').text(uvNumb + ' uv index').append(square);

                $('.cityOutput').append(uvElement);

// if statement that changes the color of the uv index box
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
                $('.weatherOutput').empty();
                
// loop to get the 5 days so i don't have to add each day individually
                for (let i = 1; i < 6; i++) {
// creating elements
                    let futureIcon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png');
                    let futureTemp = $('<div class="temp">').text('Temp: ' + (Math.round(data.daily[i].temp.day)) + String.fromCharCode(176));
                    let futureHumid = $('<div class="humidity">').text('Humidity: ' + (data.daily[i].humidity) + '%');
                    
                        var date = new Date(data.daily[i].dt * 1000);
                        
                        let futureDate = $('<span class="date">').text(date.toDateString());

// minimal styling and where to attatch the created elements
                    $('.weatherOutput').attr('style', 'border: 2px solid black ; border-radius: 5px ; bg-white');
                    $('.weatherOutput').append(futureDate, futureTemp.append(futureIcon), futureHumid);
                }
            })
    }

})

// look up how to autofill city search
// add a keydown event handler