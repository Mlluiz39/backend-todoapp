const { v4 } = require('uuid')

const User = require('../models/User')

class UserController {
  async store(req, res) {
    const { name, email, password_hash } = req.body

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
