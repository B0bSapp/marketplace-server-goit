const getProduct = require('./products/get-product');
const getAllProducts = require('./products/get-all-products');
const createProduct = require('./products/create-product')
const createUser = require('./users/create-user');
const defaultRoute = require('./default');
const url = require('url');

const router = {
    availableRoutes: [
        {
            path: /^\/products\/?$/,
            applicableMethods: {
                GET: getAllProducts,
                POST: createProduct
            },
        },
        {
            path: /^\/products\/\d+$/,
            applicableMethods: {
                GET: getProduct,
            },
        },
        {
            path: /^\/users\/?$/,
            applicableMethods: {
                POST: createUser,
            },
        }
    ],
    getRoutingFunction(request) {
        const incomingUrl = url.parse(request.url);
        const incomingMethod = request.method;
        const applicableRoutes = this.availableRoutes.find(route => route.path.test(incomingUrl.pathname));
        if (!applicableRoutes) {
            return defaultRoute;
        }
        return applicableRoutes.applicableMethods[incomingMethod]
            ? applicableRoutes.applicableMethods[incomingMethod]
            : defaultRoute;
    },
};

module.exports = router;
