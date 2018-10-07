const fs = require('fs');
const path = require('path');
const validationProfile = require('./validation_profile');
const validator = require('../validator');

const directoryPath = path.join(
    __dirname,
    '../../../',
    'data/categories'
);


const create_category = (request, response) => {
    const data = []
    request.on('data', chunk => {
        data.push(chunk);
    }).on('end', () => {
        const categoryData = Buffer.concat(data).toString()
        const category = Object.assign({}, JSON.parse(categoryData), {id: Date.now()})
        const errors = validator(category, validationProfile);
        if (errors.length === 0) {
            const fileName = category.name + category.id
            const filePath = path.resolve(directoryPath, fileName + '.json')
            fs.writeFile(filePath, JSON.stringify(category))
            response.writeHead(200, {
                'Content-Type': 'application/json',
            });
            response.end(JSON.stringify(category));
        } else {
            response.writeHead(400, {
                'Content-Type': 'application/json',
            });
            response.end(JSON.stringify({
                message: 'Incorrect payload',
                details: errors
            }));
        }
    })
}

module.exports = create_category
