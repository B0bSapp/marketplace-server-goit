const Product = require('../../db/schema/product')

const get_product = (request, response) => {
  Product.findById(request.params.id).then(product => {
    if (product) {
      response.json(product)
    }
    else {
      response.status(404);
      response.json(
          {message: `Requested entity ${request.params.id} was not found`});
    }
  }).catch(err => {
    response.status(500);
    response.json({error: err})
  });

};
module.exports = get_product;
