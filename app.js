const express       = require('express'),
    path            = require('path'),
    db              = require('./config/database'),
    methodOverride  = require('method-override'),
    indexRoutes     = require('./routes/index'),
    articlesRoutes  = require('./routes/articles'),
    userRoutes      = require('./routes/users'),
    flash           = require('connect-flash'),
    expressMessages = require('express-messages'),
    session         = require('express-session'),
    passport        = require('passport'),
    passportConfig  = require('./config/passport-local');


// Initialise express
const app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
// View engine
app.set('view engine', 'pug');
// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override
app.use(methodOverride('_method'));

// Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Flash messages
app.use(flash());
app.use((req, res, next) => {
   res.locals.messages = expressMessages(req, res);
   next();
});

// Passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());


// Globals
app.use((req, res, next) => {
    res.locals.user = req.user;
    console.log(req.user);
    next();
});

// Routes
app.use(indexRoutes);
app.use('/articles', articlesRoutes);
app.use('/users', userRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// TODO create a 404 render page and put it where required.
