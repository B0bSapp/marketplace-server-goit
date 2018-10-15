const User = require('../../db/schema/user')

const get_users = (request, response) => {
  User.findById(request.params.id).then(users => {
    if (users) {
      response.json(users)
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

module.exports = get_users;