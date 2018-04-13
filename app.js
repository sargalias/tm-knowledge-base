const express = require('express');
const path = require('path');
const db = require('./config/database');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const articlesRoutes = require('./routes/articles');


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


// Routes
app.use(indexRoutes);
app.use('/articles', articlesRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// TODO create a 404 render page and put it where required.
