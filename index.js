require('dotenv').config();
require('colors');
const Server = require('./Models/server');
const server = new Server();
server.listener();
