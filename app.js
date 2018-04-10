var express = require('express');
var app = express();
app.set("view engine","ejs")
app.use(express.static('public'));
app.use(function (req, res, next) {
    res.render('index');
});

app.listen(5000)