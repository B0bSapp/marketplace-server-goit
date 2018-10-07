const getProduct = require('./products/get_product');
const getAllProducts = require('./products/get_all_products');
const createProduct = require('./products/create_product')
const createUser = require('./users/create_user');
const createCategory = require('./categories/create_category')
const loadImage = require('./images/load_image')
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
            path: /^\/products\/\d+\/?$/,
            applicableMethods: {
                GET: getProduct,
            },
        },
        {
            path: /^\/users\/?$/,
            applicableMethods: {
                POST: createUser,
            },
        },
        {
            path: /^\/categories\/?$/,
            applicableMethods: {
                POST: createCategory,
            }
        },
        {
            path: /^\/images\/?$/,
            applicableMethods: {
                POST: loadImage,
            }
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
