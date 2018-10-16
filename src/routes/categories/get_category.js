const Category = require('../../db/schema/category')

const get_category = (request, response) => {
  Category.findById(request.params.id).then(category => {
    if (category) {
      response.json(category)
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
}

module.exports = get_category;