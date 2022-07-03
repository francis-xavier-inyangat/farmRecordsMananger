const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

//Express session section
const expressSession = require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
});

//Routes Section
//const homeroutes = require("./routes/homeroutes");
const registerRoutes = require("./routes/registerroutes");
const loginRoutes = require("./routes/loginroutes");
const dashboardRoute = require("./routes/dashboardroute");
const managerList = require("./routes/managerlist");
// route to enter products
const productRoutes = require("./routes/productsroutes");


//Models Section
const config = require("./config/database");
const Manager = require("./models/Manager");

//Initializing server the express server
const server = express();

//connect mongoose
mongoose.connect(config.database,{ useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", function () {
    console.log("Connected to MongoDB");
});
// check errors
db.on('error', function(err){
    console.error(err);
  });

  // views settings or configurations
server.set('view engine', 'pug')
server.set('views', './views');

server.use(express.urlencoded({extended: true}));
//to access static files the server checks the public folder
server.use(express.static(path.join(__dirname, 'public')));
// setting the sessions
server.use(expressSession);
//initiazing passport and they shd be like this 
// constantly they  are methods(line 43-44)
server.use(passport.initialize());
server.use(passport.session());

// configuring passport middleware (used for auth logins) Manager is the name of collection
passport.use(Manager.createStrategy())
passport.serializeUser(Manager.serializeUser())
passport.deserializeUser(Manager.deserializeUser())


// Login Checker
const loginChecker = function (req, res, next) {
  if (req.path != '/login' && req.path != '/register' && !req.session.user) {
    res.redirect('/register');
  }
  next();
};
server.use(loginChecker);



// serving routes.
  server.use('/register', registerRoutes)
  server.use('/login', loginRoutes)
  server.use('/dashboard', dashboardRoute);
  server.use('/', loginRoutes); //use logout in same loginroute
  server.use('/managers/', managerList); //list of manager to display
  server.use('/products', productRoutes);
  server.use('/lists', productRoutes);
  server.use('/products/editproduct', productRoutes);
  
  


  //handling unexisting routes
server.get("*", (req, res) => {
    res.status(404).send("OOPS! WRONG ADDRESS");
});

// server listening
server.listen(3022, () => console.log("Listening on port 3022"));

  



