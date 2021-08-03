const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=5db6914b0db49c1f9e8f9b8fcb468a7c&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const spec = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

            res.write("<h1>The weather currently in London is " + spec + " degrees celsius.</h1>" );
            res.write("<h1>The temperature in London today is " + temp + " degrees celsius.</h1>" );
            res.write("<img src=" +imageURL+ ">");
            res.send();
            
        })
    })
    
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})