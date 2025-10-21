const updateBG = (weatherType) => {

    document.querySelector(".animation1").classList.add("fade")

    setTimeout(() => {
        switch (weatherType.toLowerCase()) {
            case "clear":
                document.querySelector(".animation1").style.backgroundImage = "url('anime-style-clouds.jpg')";
                document.querySelector(".icon").innerHTML = '<img src="sun.png">';
                break;

            case "clouds":
                document.querySelector(".animation1").style.backgroundImage = "url('ChatGPT Image Aug 8, 2025, 11_24_06 PM.png')";

                document.querySelector(".icon").innerHTML = '<img src="cloudy.png">';
                break;

            case "rain":
                document.querySelector(".animation1").style.backgroundImage = "url('rainy.jpeg')";

                document.querySelector(".icon").innerHTML = '<img src="rain.png">';
                break;

            case "snow":
                document.querySelector(".animation1").style.backgroundImage = "url('snow.jpg')";

                document.querySelector(".icon").innerHTML = '<img src="snowflake.png">';
                break;

            case "mist":
            case "fog":
                document.querySelector(".animation1").style.backgroundImage = "url('fog.jpg')";

                document.querySelector(".icon").innerHTML = '<img src="fog.png">';
                break;

            default:
                document.querySelector(".animation1").style.backgroundImage = "url('anime-style-clouds.jpg')";
                break;
        }
    }, 300)

    setTimeout(() => {

        document.querySelector(".animation1").classList.remove("fade")
    }, 600)


    document.querySelector(".animation1").style.backgroundSize = "cover"
    document.querySelector(".animation1").style.backgroundPosition = "center"
    document.querySelector(".animation1").style.backgroundRepeat = "no-repeat"


};



document.querySelector(".ok").addEventListener("submit", async (e) => {

    e.preventDefault()

    const city = document.querySelector(".input").value.trim()
    const apiKey = "d2bcd6cb9a2545244a31fb911832976d"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data)

        if (data.cod === 200) {

            const temperature = data.main.temp.toFixed(1)
            const humidity = data.main.humidity
            const weatherType = data.weather[0].main
            const description = data.weather[0].description
            const windSpeed = data.wind.speed

            document.querySelector(".result").innerHTML = `
            <div class="icon"></div>
            <div class="temp">${temperature} <sup style="font-size: 0.35em; margin: 1px"> °C</sup></div>
            <div>${weatherType} (${description})</div>
            <div class="grid"><span>${humidity} % </span> <span> ${windSpeed} m/s</span>
            <span>Humidity</span><span>Wind Speed</span> </div>
            `
            // <h3>${data.name}, ${data.sys.country}</h3>
            // <div><span>${windSpeed} m/s</span></div>
            // <span>Temperature</span>
            // <span>Weather Type</span>
            updateBG(weatherType)
        }
        else {
            document.querySelector(".result").innerHTML = `City not found, try a relevant city name!!`
        }
        // document.querySelector(".result").style.display = "block";
        document.querySelector(".result").classList.remove("hidden")
    }
    catch (error) {
        document.querySelector(".result").innerHTML = `Error getting data.`
        console.error("Error: ", error)

    }
})