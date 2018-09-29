const getAllProductsFile = require('./product_utils');
const url = require('url')
const fs = require('fs');

const getProduct = (request, response) => {
    const pathName = url.parse(request.url).pathname;
    const productId = pathName.split("/")[2];
    const allProductFile = getAllProductsFile();
    const allProductObject = JSON.parse(fs.readFileSync(allProductFile.filePath));
    const requiredProduct = allProductObject.find(
        product => product.id === Number(productId),
    );
    if (requiredProduct) {
        response.writeHead(200, {
            'Content-Type': 'application/json',
        });
        response.end(JSON.stringify(requiredProduct));
    } else {
        response.writeHead(404, {
            'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({message: `Product with id = ${productId} was not found`}));
    }

};
module.exports = getProduct;
