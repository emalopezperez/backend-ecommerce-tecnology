const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function (user) {
  const payload = {
    sub: user._id,
    nombres: user.nombre,
    apellidos: user.apellido,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }

  return jwt.encode(payload, process.env.JWRSECRET)
}