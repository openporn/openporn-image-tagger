var deepFreeze = require('deep-freeze'),
    path       = require('path'),

    env = process.env,
    config;

config = {
    env           : env.NODE_ENV,
    isDevelopment : env.NODE_ENV !== 'production',
    isProduction  : env.NODE_ENV === 'production',

    database : env.DATABASE_URL,
    port     : env.PORT || 5000,

    dirs: {
        pub     : path.resolve('public/'),
        views   : path.resolve('views/pages/'),
        layouts : path.resolve('views/layouts/')
    }

    version : require('../package').version,
};

module.exports = deepFreeze(config);
