const morgan = require('morgan');
const http = require('http');
const router = require('./routes/router');

const logger = morgan('combined');
const startServer = port => {
    const server = http.createServer((request, response) => {
        const routerFunction = router.getRoutingFunction(request);
        logger(request, response, () => routerFunction(request, response))
    });
    server.listen(port);
};

module.exports = startServer;
