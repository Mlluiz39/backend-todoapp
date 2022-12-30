import User from '../schemas/User'

class UserController {
  async store(req, res) {
    const { name, email, password_hash } = req.body

    const userExists = await User.findOne({ email })

    if (userExists)
      return res.status(400).json({ error: 'User already exists' })

    const user = await User.create({
      name,
      email,
      password_hash,
    })

    return res.status(201).json(user)
  }
}

export default new UserController()
