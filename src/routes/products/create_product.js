const fs = require('fs');
const path = require('path');
const validationProfile = require('./validation_profile');
const validator = require('../validator')

const directoryPath = path.join(
    __dirname,
    '../../../',
    'data/products'
);

const saveProduct = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (!err) {
                resolve()
            } else {
                reject(err)
            }
        })
    });
}


const create_product = (request, response) => {
    const data = []
    request.on('data', chunk => {
        data.push(chunk);
    }).on('end', () => {
        const productData = Buffer.concat(data).toString()
        const product = Object.assign({}, JSON.parse(productData), {id: Date.now()})
        const err = validator(product, validationProfile);
        if (err.length === 0) {
            const fileName = product.name + product.id
            const filePath = path.resolve(directoryPath, fileName + '.json')
            saveProduct(filePath, product).then(() => {
                response.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                response.end(JSON.stringify(product));
            }).catch((err) => {
                response.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                response.end(JSON.stringify({message: 'Something went terribly wrong: ' + err}));
            })
        } else {
            response.writeHead(400, {
                'Content-Type': 'application/json',
            });
            response.end(JSON.stringify({
                message: 'Incorrect payload',
                details: err
            }));
        }

    })
}

module.exports = create_product