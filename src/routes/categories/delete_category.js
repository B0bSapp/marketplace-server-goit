const Category = require('../../db/schema/category')

const delete_category = (request, response) => {
  Category.findByIdAndRemove(request.params.id).then(category => {
        response.status(200);
        response.json(category)
      }
  ).catch(err => {
    response.status(500);
    response.json({error: err})
  });
}

module.exports = delete_category