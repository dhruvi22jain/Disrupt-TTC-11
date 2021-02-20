var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
const session = require("express-session");
var path = require('path'); 

app.use(bodyParser,urlencoded({extended:true}));
app.set('view-engine','ejs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "authenticate"
});


con.connect(function(err){
    if(err) throw err;
console.log('Connected' );
});

app.get('/', function(req,res){
    res.send('This is the homepage');
});


app.get("/register", function(req,res) {
    res.render("register.html");
});

app.get("/login", function(req,res) {
    res.render("login.html");
});

app.post("/login", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    con.query(`SELECT * FROM disrupt WHERE username = '${username}'`,function (err,result){
        if(err){throw err};
        console.log(result);
        if(result[0].Password == password)
        {
            res.redirect('/');
        }
        else{
            console.log('Email or password incorrect');
            console.log(password);
            res.redirect('/login');
        }
    });
});

app.get("/register", function(req,res) {
        res.render("register.html", {message:null});
    });

app.post('/register',function(req,res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;

        if(password !== confirmPassword){
            var message = 'the passwords do not match!';
            res.render('register.html', {message:message});
        } else {
            var sql =  `INSERT INTO disrupt (username,email,password) VALUES ('${req.body.username}','${req.body.email}','${req.body.password}')`;
            con.query(sql, function(err,result){
                if(err) throw err;
                console.log("1 record inserted");
            });
        }
    });

app.listen(3000, ()=>{
    console.log("Server has started")
});