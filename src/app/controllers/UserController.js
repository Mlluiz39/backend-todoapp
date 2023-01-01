import bcrypt from 'bcrypt'

import User from '../schemas/User'

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists)
      return res.status(400).json({ error: 'User already exists' })

    const salt = await bcrypt.genSalt(10)

    const password_hash = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: password_hash,
    })

    try {
      await user.save()

      return res.status(201).json({ msg: 'User created successfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Registration failed' })
    }
  }

  async index(req, res) {
    const users = await User.find()

    return res.json(users)
  }
}

export default new UserController()
