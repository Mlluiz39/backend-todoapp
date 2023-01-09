const User = require('../models/User')
const { object, string } = require('yup')
const jwt = require('jsonwebtoken')

class SessionController {
  async store(req, res) {
    const SessionSchema = object().shape({
      email: string().email().required(),
      password: string().required(),
    })

    if (!(await SessionSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email, password } = req.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' })
    }
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      }),
    })
  }
}

module.exports = new SessionController()
