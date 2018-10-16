const startServer = require('./src/server');
const connectDb = require('./src/db/connect')
const {port, dbUrl} = require('./config');

connectDb(dbUrl);
startServer(port);
