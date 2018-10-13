const fs = require('fs');
const path = require('path');
const validationProfile = require('./validation_profile');
const validator = require('../validator');

const directoryPath = path.join(
    __dirname,
    '../../../',
    'data/users'
);


const create_user = (request, response) => {
    const data = []
    request.on('data', chunk => {
        data.push(chunk);
    }).on('end', () => {
        const userData = Buffer.concat(data).toString()
        const user = Object.assign({}, JSON.parse(userData), {id: Date.now()})
        const errors = validator(user, validationProfile);
        if (errors.length === 0) {
            const fileName = user.name + user.id
            const filePath = path.resolve(directoryPath, fileName + '.json')
            fs.writeFile(filePath, JSON.stringify(user))
            response.writeHead(200, {
                'Content-Type': 'application/json',
            });
            response.end(JSON.stringify(user));
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

module.exports = create_user
