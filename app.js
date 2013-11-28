var express = require('express'),
    exphbs  = require('express3-handlebars'),

    config     = require('./config'),
    middleware = require('./middleware'),
    routes     = require('./routes'),
    
    app = express();

// App configuration settings

app.set('name', 'Open Porn Image Tagger');
app.set('env', config.env);
app.set('port', config.port);
app.set('views', config.dirs.views);
app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
    defaultLayout : 'main',
    extname       : '.hbs',
    layoutsDir    : config.dirs.layouts
}));

// App middleware settings

if (config.isDevelopment) {
    app.use(express.logger('tiny'));
}

app.use(express.compress());
app.use(express.favicon(config.dirs.pub + '/favicon.ico'));
app.use(express.cookieParser());
app.use(express.cookieSession(config.session));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.csrf());
app.use(app.router);
app.use(express.static(config.dirs.pub));

if (config.isDevelopment) {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack      : true
    }));
}

// App route settings

module.exports = app;
