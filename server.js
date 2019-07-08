var express = require('express');
var app = express();
var path = require('path');
const PORT = 3000;
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app.html'));
});

app.listen(PORT, function() {
    console.log("server starts on port " + PORT);
});