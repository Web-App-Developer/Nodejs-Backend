var env = process.env.NODE_ENV || 'development';

var config = require('./config.json');

var envConf = config[env];

Object.keys(envConf).forEach(key => {
    process.env[key] = envConf[key];
});
