let weather = {
    "apiKey": "0cc395126a5d9d1d48a8e4b4f123ab9d",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];//bcz its an array
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innetText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        if(temp < 5) {
            // Show very cold day
            document.body.style.backgroundImage = "url('./very_cold.jpg')"
        } else if(temp < 15) {
            // Show winter season
            document.body.style.backgroundImage = `url('./winter.jpg')`;
        } else if(temp < 20) {
            // Show spring season
            document.body.style.backgroundImage = "url('./spring.jpg')"
        } else if(temp < 30) {
            // Show summer season
            document.body.style.backgroundImage = "url('./summer.jpg')"
        } else {
            // Show hot sunny day
            document.body.style.backgroundImage = "url('./sunny_day.jpg')"
        }
        // bodyBackground =  "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Varanasi");