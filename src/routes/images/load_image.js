const multer = require('multer');
const fs = require('fs');
const path = require('path');
const TEMP_FOLDER_NAME = path.join(
    __dirname,
    '../../../',
    'assets'
);
const PRODUCTS_FOLDER_NAME = path.join(__dirname, '../../../data/products');


const upload = (request, response) => {
    const file = request.file;
    const productId = request.body.productId;
    const target = path.join(PRODUCTS_FOLDER_NAME, 'product-' + productId)
    new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(file.path);
        const writeStream = fs.createWriteStream(target);

        readStream.on('error', () => {
            fs.unlink(file.path, () => {
                reject('error while opening read stream');
            });
        });
        writeStream.on('error', () => {
            fs.unlink(file.path, () => {
                reject('error while opening write stream');
            });
        });

        readStream.on('close', () => {
            fs.unlink(file.path, () => {
                resolve(target)
            });
        });
        readStream.pipe(writeStream);
    }).then(filePath => {
        response.status(200);
        response.json({status: `was saved to ${filePath}`})
    }).catch(err => {
        response.status(500);
        response.json({error: err})
    });
}

module.exports = [multer({dest: TEMP_FOLDER_NAME}).single('file'), upload];
