var rsvp = require('rsvp');
var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.chairleague.com/divisions/division-1";

  
var output = request(url, function (error, response, body) {
  var division = [];
  var temp = [];
  if (!error) {
    var $ = cheerio.load(body);
    var table = $('table')[2].children;
    table.forEach(function(table, i) {
      if(table.name === 'tbody') {
        table.children.forEach(function(tr) {
          if(tr.name === 'tr') {
            tr.children.forEach(function(td) {
              if(tr.type === 'tag') {
                if (td.children) {
                  temp = [];
                  td.children.forEach(function(text) {
                    if(text.children) {
                      text.children.forEach(function(deepText) {
                        if(text.children[0].data !== undefined && text.children[0].data !== '\n') {
                          temp.push(text.children[0].data.replace('\n', '').replace('\n', ''));
                        }
                      });
                    }
                    if(text.data !== undefined && text.data !== '\n') {
                      temp.push(text.data.replace('\n', '').replace('\n',''));
                    }
                  });
                  division.push(temp);
                }
              }
            });
          }
        });
      }
    });
    console.log(division);
    return division;
      
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

