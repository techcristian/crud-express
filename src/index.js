const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// iniciaciones
const app = express();
require('./database');
require('./config/passport');
//Settings
app.set('port', process.env.PORT || 3000);

app.set("views", __dirname + "/views");
app.engine('.hbs', exphbs({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    //registerPartialsDir:(__dirname + "/views/partials", 
    extname: 'hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }

}));

app.set('view engine', '.hbs');




//middlewars
app.use(morgan('dev'));
app.use(express.urlencoded({ extend: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;

    next();
});



//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));







//Static Files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"));

//Server is listenning
const PORT=process.env.PORT || 3000
app.listen(PORT)
console.log('server is running',(PORT))