const Product = require('../../db/schema/product')

const update_product = (request, response) => {
  const productId = request.params.id;
  Product.findOneAndUpdate(productId, request.body, {new: true}).then(
      updatedProduct => {
        response.status(200);
        response.json(updatedProduct);
      }).catch(
      err => {
        response.status(500);
        response.json({error: err})
      })
}

module.exports = update_product;