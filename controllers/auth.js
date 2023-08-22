const User = require('../models/Users')
const Roles = require('../models/Roles')
const jwt = require('jsonwebtoken');


const singUp = async (req, res) => {
  const { email, password, roles, nombre } = req.body;

  if (!email || !password || !nombre) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos obligatorios' });
  }

  try {
    const encryptedPassword = await User.encryptPassword(password);

    const newUser = new User({
      nombre,
      email,
      password: encryptedPassword,
    });

    if (roles) {
      const foundRoles = await Roles.find({ name: { $in: roles } })

      newUser.roles = foundRoles.map(role => role._id)
    } else {
      const role = await Roles.findOne({ name: "user" })
      newUser.roles = [role._id]
    }

    const saveUser = await newUser.save();
    const token = jwt.sign({ id: saveUser._id }, process.env.JWRSECRET, {
      expiresIn: 86400
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};


const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).populate('roles')

  if (!user) {
    return res.status(400).json({ menssage: 'User no found' })
  }
  const matchPassword = await User.comparePassword(req.body.password, user.password)
  if (!matchPassword) {
    return res.status(400).json({ token: null, menssage: 'contrasena no valida' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWRSECRET, {
    expiresIn: 86400
  })

  res.status(200).json({ usuario: user, token })

}



module.exports = {
  singUp,
  login
}
