// Import path to construct path file names
const path = require("path");

// Import npm libraries
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const mongoose = require("mongoose");
// const mongodb = require("mongodb"); 

// const sequelize = require("./util/database");

// import routes
const homeRoutes = require("./routes/homeRoutes");
const stylesRoutes = require("./routes/stylesRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
const kittenRoutes = require('./routes/kittenRoutes');

// const MustacheStyle = require('./models/MustacheStyleMongoose');


const middleware = require("./middleware")

const MONGODB_URI = 'mongodb+srv://elizabrads:5750class@cluster0.vmhku3d.mongodb.net/final?retryWrites=true&w=majority';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});



// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, "public")));

// Load middleware to parse body
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(flash());

// Set the templating engine using app.set
app.set("view engine", "ejs");

// Tell the application where to find the views
app.set("views", "views");

// app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);

app.use(middleware);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use("/styles", stylesRoutes);
app.use("/blog", blogRoutes);
app.use("/contacts", contactRoutes);
app.use("/users", userRoutes);
app.use('/api', apiRoutes);
app.use('/kittens', kittenRoutes);


app.use(homeRoutes);

// start the server on port 3000
mongoose.connect(
  MONGODB_URI
).then(() => {
  app.listen(3000);
})

