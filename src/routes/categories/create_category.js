const Category = require('../../db/schema/category')

const create_category = (request, response) => {
  const category = new Category(request.body);
  category.save().then(category => {
    response.status(201);
    response.json(category);
  }).catch(
      err => {
        response.status(500);
        response.json({error: err})
      })
}

module.exports = create_category
