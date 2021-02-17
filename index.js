const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "authenticate"
});

const urlencodedParser = bodyParser.urlencoded({extended:false})

connection.connect(function(err){
    if(err){
        console.error('error reconnecting: ' + err.stack);
        return;
    }
    console.log('connected as id' + connection.threadId);
});

app.get("/", (req,res) => 
{
    res.sendFile("index.html")
});

app.post("/register", urlencodedParser, (req,res)=>
{
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(req.body.email)
    connection.query("INSERT INTO disrupt (username,password,email) VALUES (?,?,?)",[(req.body.username),(req.body.password),(req.body.email)], (err,rows,fields) =>
    {
        if(err)
        {
            console.log(err)
        }
        else {res.send(rows)}
    })
    
});

app.get("/signup", (req,res)=> {
    res.send("Sign Up")
});

app.get("/login", (req,res)=>{
    res.send("Login")
});

app.get("/cart",(req,res)=>{
    res.send("Cart")
});

app.get("*", (req,res) =>{
    res.send("404 Page Not Found")
})

app.listen(3000, ()=>{
    console.log("Server has started")
});