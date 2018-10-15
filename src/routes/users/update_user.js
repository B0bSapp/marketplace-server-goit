const User = require('../../db/schema/user')

const update_user = (request, response) => {
  const userId = request.params.id;
  User.findOneAndUpdate(userId, request.body, {new: true}).then(
      newUser => {
        response.status(200);
        response.json(newUser);
      }).catch(
      err => {
        response.status(500);
        response.json({error: err})
      })
}

module.exports = update_user;