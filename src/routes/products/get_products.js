const Product = require('../../db/schema/product')

const get_products = (request, response) => {
  Product.find().then(products => {
    response.json(products)
  }).catch(err => {
    response.status(500);
    response.json({error: err})
  });
};
module.exports = get_products;