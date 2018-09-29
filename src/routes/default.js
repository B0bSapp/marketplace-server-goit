const defaultRoute = (request, response) => {
    response.writeHead(404, {
        'Content-Type': 'application/json',
    });
    response.end(JSON.stringify({message: "The resource you are currently looking for is not found"}));
};

module.exports = defaultRoute;
