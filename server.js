var express = require('express');
var app = express();
var path = require('path');
const PORT = 3000;
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/graph_search_v1/app.html'));
});

app.get('/module', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/module_export/index.html'));
});

app.get('/v2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/graph_search_v2/main.html'));
});

app.listen(PORT, function() {
    console.log("server starts on port " + PORT);
});