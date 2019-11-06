const express = require('express');

const cars = require('./routes/cars.routes.js');

const server = express();

server.use(express.json());

server.use('/api/cars', cars);

module.exports = server;