const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const router = require('./routes/router');
const logger = morgan('combined');

app = express();
const startServer = port => {
  app.use(bodyParser.urlencoded({extended: false})).use(bodyParser.json()).use(
      morgan('dev')).use('/', router).use(errorHandler);
  app.listen(port);
};

const errorHandler =
    (err, request, response) => {
        console.log('this is error ', response);
        response.status(500).send({
        type: 'Internal server error',
        cause: err
      })
    }

module.exports = startServer;
