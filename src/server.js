const http = require('http');
const router = require('./routes/router');

const startServer = port => {
    const server = http.createServer((request, response) => {
        const routerFunction = router.getRoutingFunction(request);
        routerFunction(request, response);
    });
    server.listen(port);
};

module.exports = startServer;
