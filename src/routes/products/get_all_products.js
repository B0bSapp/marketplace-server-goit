const fs = require('fs');
const getAllProductsFile = require('./product_utils');

const get_all_products = (request, response) => {
    const allProductFile = getAllProductsFile();
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': allProductFile.fileStat.size,
    });
    const readStream = fs.createReadStream(allProductFile.filePath);
    readStream.pipe(response);
};
module.exports = get_all_products;