const fs = require('fs');
const path = require('path');
const directoryPath = path.join(
    __dirname,
    '../../../',
    'assets/categories'
);


const loadImage = (request, response) => {
    request.on('data', chunk => {
        const filePath = path.resolve(directoryPath, 'weird_stuff.jpg')
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(chunk)
    }).on('end', () => {
        response.end();
    })
}

module.exports = loadImage
