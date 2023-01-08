const { v4 } = require('uuid')
const { object, string } = require('yup')

const User = require('../models/User')

class UserController {
  async store(req, res) {
    const userSchema = object().shape({
      name: string().required(),
      email: string().email().required(),
      password_hash: string().required().min(6),
    })

    // if (!(await userSchema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' })
    // }

    try {
      await userSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { name, email, password_hash } = req.body

    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({ id: v4(), name, email, password_hash })

    return res.status(201).json({ id: user.id, name, email })
  }

  async index(req, res) {
    const users = await User.findAll()

    return res
      .status(200)
      .json({ id: users.id, name: users.name, email: users.email })
  }
}

module.exports = new UserController()
