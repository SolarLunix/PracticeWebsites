//REQUIREMENTS
var express = require("express"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser");
    
// ENVIRONMENT SET UP
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog_space");

//SCHEMA SET UP
var HtmlSchema = new mongoose.Schema({
    code: String,
    desc: String,
});

var HtmlCode = mongoose.model("HtmlCode", HtmlSchema);

var CssSchema = new mongoose.Schema({
    code: String,
    desc: String,
});

var CssCode = mongoose.model("CssCode", CssSchema);

var MongooseSchema = new mongoose.Schema({
    code: String,
    desc: String,
});

var MongooseCode = mongoose.model("MongooseCode", MongooseSchema);

//GET ROUTES
app.get("/", function(req, res) {
   res.render("index"); 
});

app.get("/new_:id", function(req, res) {
    res.render("new", {type:req.params.id});
});

//POST ROUTES


// Invalid URL - Make sure this goes last!
app.get("*", function(req, res){
    res.redirect("/");
});

// Standard listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("==== LearnedData Server Started! ====");
});