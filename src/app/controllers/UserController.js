const { v4 } = require('uuid')
const { object, string } = require('yup')

const User = require('../models/User')

class UserController {
  async store(req, res) {
    const userSchema = object().shape({
      name: string().required(),
      email: string().email().required(),
      password: string().required().min(6),
    })

    // if (!(await userSchema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' })
    // }

    try {
      await userSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { name, email, password } = req.body

    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({ id: v4(), name, email, password })

    return res.status(201).json({ id: user.id, name, email })
  }

  async index(req, res) {
    const users = await User.findAll()

    return res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    })
  }
}

module.exports = new UserController()
