var chairleague = "https://www.chairleague.com";
function match_scrape(callback, team_name) {
  var request = require("request"),
    cheerio = require("cheerio"),
    url = chairleague + "/teams/" + team_name + "/matches";

  return request(url, function(error, response, body) {
    if(!error) {
      var $ = cheerio.load(body);
      var matches = [];
      var new_match = {};
      $(".match-result").each(function(i, match) {
        var attribs = match.attribs.class.split(' ');
        if(!match.attribs.class.includes("match-result-away-win") && !match.attribs.class.includes("match-result-home-win")){
          var temp = cheerio.load(match);
          new_match.date = temp(".match-result-date")[0].children[0].data.replace('\n', '');
          new_match.time = temp(".match-result-time")[0].children[0].data.replace('\n', '');
          new_match.caster = temp(".match-result-casting-casters")[0].children[0].data.replace('\n', '');
          new_match.division = temp(".match-result-division")[0].children[0].data.replace('\n', '').replace('\n', '');
          new_match.home_team = temp(".match-result-team-name")[0].children[0].data.replace('\n', '');
          new_match.away_team = temp(".match-result-team-name")[1].children[0].data.replace('\n', '');
        }
      });
      callback(new_match);
    } else {
      // error handling
    }
  });
}

match_scrape(function(match){
  console.log(match);
}, "flex-luthor");

module.exports = match_scrape;
