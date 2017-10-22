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
    desc: String
});

var HtmlCode = mongoose.model("HtmlCode", HtmlSchema);

var CssSchema = new mongoose.Schema({
    code: String,
    desc: String
});

var CssCode = mongoose.model("CssCode", CssSchema);

var MongooseSchema = new mongoose.Schema({
    code: String,
    desc: String
});

var MongooseCode = mongoose.model("MongooseCode", MongooseSchema);

//GET ROUTES
app.get("/", function(req, res) {
    var htmlList = "empty";
    var cssList = "empty";
    var mongooseList = "empty";
    
    HtmlCode.find({}, function(err, htmlitems){
        if(err){
            console.log("HTML\n" + err);
        }else{
            var htmlList = htmlitems;
        }
        
        CssCode.find({}, function(err, cssitems){
            if(err){
                console.log("HTML\n" + err);
            }else{
                cssList = cssitems;
            }
            
            MongooseCode.find({}, function(err, monitems){
                if(err){
                    console.log("HTML\n" + err);
                }else{
                    mongooseList = monitems;
                }
                
                res.render("index", {htmlList:htmlList, cssList:cssList, mongooseList:mongooseList}); 
            });
        });
    });
});

app.get("/new_:id", function(req, res) {
    res.render("new", {type:req.params.id});
});

//POST ROUTES
app.post("/html", function(req, res){
   req.body.item.desc = req.sanitize(req.body.item.desc);
    
    HtmlCode.create(req.body.item, function(err, newCode){
        if(err){
            res.redirect("/new_html");
        } else {
            res.redirect("/");
        }
    }); 
});

app.post("/css", function(req, res){
   req.body.item.desc = req.sanitize(req.body.item.desc);
    
    CssCode.create(req.body.item, function(err, newCode){
        if(err){
            res.redirect("/new_css");
        } else {
            res.redirect("/");
        }
    }); 
});


app.post("/mongoose", function(req, res){
   req.body.item.desc = req.sanitize(req.body.item.desc);
    
    MongooseCode.create(req.body.item, function(err, newCode){
        if(err){
            res.redirect("/new_mongoose");
        } else {
            res.redirect("/");
        }
    }); 
});



// Invalid URL - Make sure this goes last!
app.get("*", function(req, res){
    res.redirect("/");
});

// Standard listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("==== LearnedData Server Started! ====");
});