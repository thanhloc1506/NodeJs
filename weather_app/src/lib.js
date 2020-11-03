const { query } = require("express");
const request = require("request");

const searchLocation = (query, callback) => {
  request(
    `https://www.metaweather.com/api/location/search/?query=${query}`,
    { json: true },
    (error, response, body) => {
      if (body !== undefined) {
        if (body.length === 0) {
          callback(`No locations found for "${query}"`, undefined);
          return;
        }
      }
      callback(null, body);
    }
  );
};

const getLocationWeather = (locationWoeid, callback) => {
  request(
    `https://www.metaweather.com/api/location/${locationWoeid}/`,
    { json: true },
    (err, res, body) => {
      const weather = body.consolidated_weather;
      if(body.detail == "Not found.")
        err = true
      else
        err = null
      callback(err, weather);
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
      if(body.detail == "Not found.")
        err = true
      for (const i in body.consolidated_weather) {
        if (body.consolidated_weather[i].applicable_date == date) {
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
  getLocationWeatherByDate,
};

//  if (body.length > 1) {
//         const limit = 5;

//         if (body.length > limit) {
//           const firstLocationsMsg = body
//             .splice(0, limit)
//             .map((item) => item.title)
//             .join(", ");
//           callback(null, `${firstLocationsMsg} \n...and ${body.length} city more`);
//         } else {
//           callback(null,
//             body
//               .splice(0, body.length)
//               .map((item) => item.title)
//               .join(", ")
//           );
//         }
//       }
 // const day = date.slice(0, 4);
      // const month = date.slice(5, 7);
      // const year = date.slice(7, 10);
      // const format_date = year + "-" + month + "-" + day;