const path = require('path');
const fs = require('fs');

const getAllProductFile = () => {
    const filePath = path.join(
        __dirname,
        '../../../',
        'data/products',
        'all-products.json',
    );
    const fileStat = fs.statSync(filePath);
    return {filePath: filePath, fileStat: fileStat};
};

module.exports = getAllProductFile;
