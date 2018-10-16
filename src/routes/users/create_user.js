const User = require('../../db/schema/user')

const create_user = (request, response) => {
  const user = new User(request.body);
  user.save().then(newUser => {
    response.status(201);
    response.json(newUser);
  }).catch(
      err => {
        response.status(500);
        response.json({error: err})
      })
}

module.exports = create_user
