const request = require("request");
const lib = require("./lib");
const query = process.argv[3];


lib.searchLocation(query, (error, location) => {
  if (error) {
    console.log(error);
    return;
  }
  if (typeof (query) != "undefined") {
    lib.getLocationWeatherByDate(
      { locationWoeid: location.woeid, date: query },
      (error, weather) => {
        const day = process.argv[3].slice(0, 2);
        const month = process.argv[3].slice(3, 5);
        const year = process.argv[3].slice(6, 10);
        const format_date = year + "-" + month + "-" + day;
        console.log(format_date);
        console.log(
          `It's ${weather.weather_state_name} in ${
            location.title
          }. The max temperature is ${
            Math.round(weather.max_temp * 100) / 100
          } and the min temperature is ${
            Math.round(weather.min_temp * 100) / 100
          }. Humidity currently is ${weather.humidity}%.`
        );
      }
    );
  } else {
    lib.getLocationWeather(
      { locationWoeid: location.woeid, date: query },
      (error, weather) => {
        console.log(weather.applicable_date);
        console.log(
          `It's ${weather.weather_state_name} in ${
            location.title
          }. The max temperature is ${
            Math.round(weather.max_temp * 100) / 100
          } and the min temperature is ${
            Math.round(weather.min_temp * 100) / 100
          }. Humidity currently is ${weather.humidity}%.`
        );
      }
    );
  }
});