var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
const lib = require("./lib");
const {
  searchLocation,
  getLocationWeather,
  getLocationWeatherByDate,
} = require("./lib");
const port = process.env.PORT || 3000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  const searchText = req.query.searchText;
  const date = req.query.date;
  searchLocation(searchText, (error, locations) => {
    for(const i in locations){
      locations[i].date = date;
    }
    console.log(locations)
    res.render("home", { date, searchText, locations, error });
  });
});

app.get("/:city/forecast/:id", (req, res) => {
  const location = req.params.city;
  getLocationWeather(req.params.id, (error, weather) => {
    if(error == true)
      res.render("error", {})
    else{
      for(const i in weather){
        weather[i].min_temp = Math.round(weather[i].min_temp * 100) / 100;
        weather[i].max_temp = Math.round(weather[i].max_temp * 100) / 100;
      }
      
      res.render("weather", { location, weather, error });
    }
  });
});

app.get("/:city/forecast/:id/:date", (req, res) => {
  const location = req.params.city;
  getLocationWeatherByDate(
    { locationWoeid: req.params.id, date: req.params.date },
    (error, weather_date) => {
      if(error)
        res.render("error", {})
      else
        console.log(weather_date);
        res.render("weather_date", { date: req.params.date, location, weather_date, error });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
