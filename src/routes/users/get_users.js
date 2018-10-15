const User = require('../../db/schema/user')

const get_user = (request, response) => {
  User.find().then(users => {
    response.json(users)
  }).catch(err => {
    response.status(500);
    response.json({error: err})
  });
}

module.exports = get_user;