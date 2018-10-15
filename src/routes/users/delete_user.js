const User = require('../../db/schema/user')

const delete_user = (request, response) => {
  User.findByIdAndRemove(request.params.id).then(user => {
        response.status(200);
        response.json(user)
      }
  ).catch(err => {
    response.status(500);
    response.json({error: err})
  });
}

module.exports = delete_user