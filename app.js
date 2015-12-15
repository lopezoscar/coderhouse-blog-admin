"use strict";

var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PostClient = require("./lib/PostClient");
var BlogClient = require("./lib/BlogClient");
var UsersClient = require("./lib/UsersClient");

//Session Management.
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        returnURL: 'http://www.example.com/auth/google/return',
        realm: 'http://www.example.com/'
    },
    function(identifier, profile, done) {
        User.findOrCreate({ openId: identifier }, function(err, user) {
            done(err, user);
        });
    }
));

//Importa el orden de los middlewares.
//Para evitar que los archivos estáticos entren en el filtro de session se coloca el midd antes.
//http://stackoverflow.com/questions/13791136/express-is-it-possible-to-bypass-sessions-for-static-files
app.use(express.static('public'));

app.use(session({
    secret: 'a4f8071f-1209-6677-8ee2',
    store: new RedisStore()//Utiliza el servidor local que es localhost:6379
}));

app.use(function (req, res, next) {
    console.log(req.path);
    if(req.path == "/login"){
        next();
    }else{
        if (!req.session.user) {
            res.redirect('/login');
            //return next(new Error('oh no')); // handle error
        }else{
            next(); // otherwise continue
        }
    }

});





app.set('view engine','handlebars');
app.engine('hbs', exphbs({defaultLayout: 'layout',extname: '.hbs'}));



app.get('/',function(req,res){
    //BlogClient.getBlogByUsername(req.params);
    res.render('index.hbs',{ layout: "layout.hbs" });
});

app.get('/edit/:blog/:postLink',function(req,res){
    PostClient.getPostByLink(req.params.blog,req.params.postLink,function(err,post){
        if(err){
            //TODO enviar 404 page
            console.log("error getting post from blog ",req.params.blog,req.params.postLink);
        }else{
            res.render('edit.hbs',{ layout:"layout.hbs",post:post});
        }
    });

});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/login',function(req,res){
    res.render('login.hbs',{layout:false});
});

app.listen(process.argv[2] || 3000, function(){
    console.log("SERVER ADMIN UP");
});