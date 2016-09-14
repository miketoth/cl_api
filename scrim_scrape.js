var chairleague = "http://www.chairleague.com";
function scrim_scrape(callback) {
  var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.chairleague.com/scrims";

  return request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body);
      var scrim = [];
      $('.name').each(function(i, name) {
        scrim[i] = {
          name: name.children[0].data
        };
      });
      $('.rating').each(function(i, rating) {
        scrim[i].rating = rating.children[0].data.replace('\n', '')
      });
      $('.calendar .month').each(function(i, month) {
        scrim[i].month = month.children[0].data.replace('\n', '').replace('\n', '')
      });
      $('.calendar .day').each(function(i, day) {
        scrim[i].day = day.children[0].data.replace('\n', '').replace('\n', '')
      });
      $('.time').each(function(i, time) {
        scrim[i].time = time.children[0].data.replace('\n', '') + ' PST'
      });
      $('.team a').each(function(i, link) {
        scrim[i].link = chairleague + link.attribs.href;
      });
      callback(scrim); // one day this will be a promise. I promise
    } else {
      // error handling
    }
  });
}

module.exports = scrim_scrape;
