const request = require("request");

const searchLocation = (query, callback) => {
    request(
      "https://www.metaweather.com/api/location/search/?query=" + process.argv[2],
      { json: true },
      (error, response, body) => {
        if (body.length === 0) {
          callback(`No location for "${process.argv[2]}"`);
          return;
        }
        if (body.length > 1) {
          const limit = 5;
  
          if (body.length > limit) {
            const firstLocationsMsg = body
              .splice(0, limit)
              .map((item) => item.title)
              .join(", ");
            callback(`${firstLocationsMsg} \n...and ${body.length} city more`);
          } else {
            callback(
              body
                .splice(0, body.length)
                .map((item) => item.title)
                .join(", ")
            );
          }
        }
        callback(null, body[0]);
      }
    );
  };
  
  const getLocationWeather = ({ locationWoeid, date }, callback) => {
    request(
      `https://www.metaweather.com/api/location/${locationWoeid}/`,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        const weather = body.consolidated_weather[0];
        callback(null, weather);
      }
    );
  };
  
  const getLocationWeatherByDate = ({ locationWoeid, date }, callback) => {
    request(
      `https://www.metaweather.com/api/location/${locationWoeid}/`,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        const day = process.argv[3].slice(0, 2);
        const month = process.argv[3].slice(3, 5);
        const year = process.argv[3].slice(6, 10);
        const format_date = year + "-" + month + "-" + day;
        for (const i in body.consolidated_weather) {
          if (body.consolidated_weather[i].applicable_date == format_date) {
            const weather = body.consolidated_weather[i];
            callback(null, weather);
            break;
          }
        }
      }
    );
  };


  module.exports = {
    searchLocation,
    getLocationWeather,
    getLocationWeatherByDate
  };