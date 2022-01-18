require('dotenv').config();
require('colors');
const Server = require('./server/server');
const server = new Server();
server.listener();
