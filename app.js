"use strict";

var express = require("express");
var exphbs = require("express-handlebars");
var app = express();


app.set('view engine','handlebars');
app.engine('hbs', exphbs({defaultLayout: 'layout',extname: '.hbs'}));
app.use(express.static('public'));


app.get('/',function(req,res){
    res.render('index.hbs',{ layout: "layout.hbs" });
});

app.get('/edit/:blog/:postLink',function(req,res){
    res.render('edit.hbs',{ layout: "layout.hbs" });
});

app.listen(process.argv[2] || 3000, function(){
    console.log("SERVER ADMIN UP");
});