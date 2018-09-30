const fs = require('fs');
const path = require('path');
const directoryPath = path.join(
    __dirname,
    '../../../',
    'data/users'
);


const createUser = (request, response) => {
    const data = []
    request.on('data', chunk => {
        data.push(chunk);
    }).on('end', () => {
        const userData = Buffer.concat(data).toString()
        const user = Object.assign({}, JSON.parse(userData), {id: Date.now()})
        const fileName = user.name + user.id
        const filePath = path.resolve(directoryPath, fileName + '.json')
        fs.writeFile(filePath, JSON.stringify(user))
        response.writeHead(200, {
            'Content-Type': 'application/json',
        });
        response.end(JSON.stringify(user));
    })
}

module.exports = createUser
