let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    console.log(`Firing app up in ${env} mode !!!`);
    
    let config = require('./config.json');
    let envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
    });
}