// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:reqDate?", function(req, res) {
  let dateStringExp = /^[0-9]{4}-([0-9]{1}|[0-9]{2})-([0-9]{1}|[0-9]{2})$/
  let dateUnixExp = /[^0-9]/
  /** If reqDate is a date string */
  if(req.params.reqDate != undefined && Date.parse(req.params.reqDate) && req.params.reqDate.match(dateStringExp)) {
    let reqDate = new Date(req.params.reqDate)
    console.log("fecha solicitada: ", typeof(req.params.reqDate))
    console.log("fecha convertida: ", typeof(reqDate))
    let UTCDate = reqDate.toUTCString()
    let UnixDate = Date.parse(reqDate)
    res.json({ unix: UnixDate, utc: UTCDate })
  } 
  /** If reqDate is a unix date */
  else if(req.params.reqDate != undefined && new Date(req.params.reqDate) && !req.params.reqDate.match(dateUnixExp)) {
    let reqDate = new Date(parseInt(req.params.reqDate))
    console.log("fecha solicitada: ", typeof(req.params.reqDate))
    console.log("fecha convertida: ", typeof(reqDate))
    console.log("fecha sol: ", req.params.reqDate)
    console.log("fecha conv: ", reqDate)
    let UTCDate = reqDate.toUTCString()
    let UnixDate = Date.parse(reqDate)
    res.json({ unix: UnixDate, utc: UTCDate })
  } 
  else if(req.params.reqDate == undefined){
    let UTCDate = new Date().toUTCString()
    let UnixDate = Date.parse(new Date())
    res.json({ unix: UnixDate, utc: UTCDate })
  }
  else {
    res.json({ error : "Invalid Date" })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
