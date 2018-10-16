const express = require('express');
const getProduct = require('./products/get_product');
const getProducts = require('./products/get_products');
const createProduct = require('./products/create_product');
const deleteProduct = require('./products/delete_product');
const updateProduct = require('./products/update_product')
const getUsers = require('./users/get_users');
const getUser = require('./users/get_user');
const updateUser = require('./users/update_user');
const deleteUser = require('./users/delete_user');
const createUser = require('./users/create_user');
const getCategories = require('./categories/get_categories')
const getCategory = require('./categories/get_category')
const deleteCategory = require('./categories/delete_category')
const updateCategory = require('./categories/update_category')
const createCategory = require('./categories/create_category')
const loadImage = require('./images/load_image')
const validator = require('./validator')

const apiRoutes = express.Router();

const middlewareValidator = (request, response, next) => {
    const errors = validator(request);
    if (errors.missing.length === 0 && errors.wrongType.length === 0) {
        next();
    }
    else {
        let errorMessage = '';
        if (errors.missing.length !== 0) {
            const missing = errors.missing.reduce(
                (acc, missing) => "'" + missing + "'" + acc,
                ` are missing`);
            errorMessage += missing;
        }
        if (errors.wrongType.length !== 0) {
            const wrongType = errors.wrongType.reduce(
                (acc, wrongType) => "'" + wrongType + "'" + acc,
                ` has wrong type`);
            errorMessage += ' and ' + wrongType;
        }
        response.status(400);
        response.json({
            error: errorMessage
        });
    }
};

apiRoutes.
get('/products', getProducts).
get('/products/:id', getProduct).
post('/products', middlewareValidator, createProduct).
put('/products/:id', middlewareValidator, updateProduct).
delete('/products/:id', deleteProduct).
get('/users', getUsers).
get('/users/:id', getUser).
put('/users/:id', middlewareValidator, updateUser).
post('/users', middlewareValidator, createUser).
delete('/users/:id', deleteUser).
get('/categories', getCategories).
get('/categories/:id', getCategory).
post('/categories', middlewareValidator, createCategory).
put('/categories/:id', middlewareValidator, updateCategory).
delete('/categories/:id', deleteCategory).
post('/images', loadImage);

module.exports = apiRoutes;
