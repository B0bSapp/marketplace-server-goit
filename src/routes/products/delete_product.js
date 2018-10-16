const Product = require('../../db/schema/product')

const delete_product = (request, response) => {
  Product.findByIdAndRemove(request.params.id).then(product => {
        response.status(200);
        response.json(product)
      }
  ).catch(err => {
    response.status(500);
    response.json({error: err})
  });
}

module.exports = delete_product;