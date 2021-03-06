    var     express             = require("express"),
            bodyParser          = require("body-parser"),
            seedDB              =require("./seedDB"),
            Campgrounds         = require("./models/campground"),
            Comment             = require("./models/comment"),
            User                = require("./models/user"),
            passport            =require("passport"),
            flash               =require("connect-flash"),
            methodOverride      = require("method-override"),
            localStrategy       =require("passport-local"),
            mongoose            = require("mongoose");

    
// requiring all the routes form routes directory
var indexRoutes = require("./routes/index");
var commentsRoutess =require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");

// connecting to monodb database
mongoose.connect("mongodb://localhost/camp_v14");


var app=express();




// seedDB();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(flash());

// to have RESTful routing we need method-override
app.use(methodOverride("_method"));


app.use(require("express-session")({
	secret:"jalil is the best programmer in the world",
	resave:false,
	saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());



// the middleware that stores the current user to the session
app.use(function(req,res,next)
	{
		res.locals.currentUser=req.user;
        res.locals.error=req.flash("error");
        res.locals.success=req.flash("success");
		next();
    }
);


// removing redundancy from routes by specifying prefix to the routes 
app.use("/",indexRoutes);
app.use("/campground/:id/comment/",commentsRoutess);
app.use("/campground/",campgroundRoutes);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(3005,function()
{
	//console.log("server has started.");
});

