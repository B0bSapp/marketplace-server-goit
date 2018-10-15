const Category = require('../../db/schema/category')

const get_categories = (request, response) => {
  Category.find().then(categories => {
    response.json(categories)
  }).catch(err => {
    response.status(500);
    response.json({error: err})
  });
}

module.exports = get_categories;