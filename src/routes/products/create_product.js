const Product = require('../../db/schema/product')

const create_product = (request, response) => {
  const product = new Product(request.body);
  product.save().then(newProduct => {
    response.status(201);
    response.json(newProduct);
  }).catch(
      err => {
        response.status(500);
        response.json({error: err})
      })

}

module.exports = create_product