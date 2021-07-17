const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (require, resp) {

    //console.log(require.body.cityName);
    const city = "Cape Town";
    const apiKey = "d0e8acb2f1b85bb6d8cde2a02e4c03d5";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function (response) {
        // console.log(response.statusCode);
        // console.log(response);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // resp.write("<h1> The weather in " + city + " is " + temp + " Degrees Celcius, and it's " + weatherDescription + "</h1>");
            // resp.write("<img src=" + imgurl + ">");
            // resp.send();
        })
    })

})






app.listen("3000", function () {
    console.log("Server Is Running On http://localhost:3000")
})