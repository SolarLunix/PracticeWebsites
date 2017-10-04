//REQUIREMENTS
var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    
// ENVIRONMENT SET UP
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blog_space");

//SCHEMA SET UP


//GET ROUTES


//POST ROUTES


// Invalid URL - Make sure this goes last!
app.get("*", function(req, res){
    res.redirect("/blogs");
});

// Standard listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("==== BlogSpace Server Started! ====");
});