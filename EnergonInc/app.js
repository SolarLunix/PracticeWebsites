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
var ReviewSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {type:Date, default:Date.now()}
});

var Review = mongoose.model("Review", ReviewSchema);

//GET ROUTES
app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/about", function(req, res) {
   res.render("about"); 
});

app.get("/reviews", function(req, res) {
    Review.find({}, function(err, reviews){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
           res.render("reviews", {reviews:reviews});
       }
    });
});

//POST ROUTES


// Invalid URL - Make sure this goes last!
app.get("*", function(req, res){
    res.redirect("/");
});

// Standard listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("==== EnergonInc Server Started! ====");
});