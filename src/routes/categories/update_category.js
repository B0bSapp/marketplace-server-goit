const Category = require('../../db/schema/category')

const update_category = (request, response) => {
  Category.findOneAndUpdate(request.param.id, request.body, {new: true}).then(
      updatedProduct => {
        response.status(200);
        response.json(updatedProduct);
      }).catch(
      err => {
        response.status(500);
        response.json({error: err})
      })
}

module.exports = update_category;