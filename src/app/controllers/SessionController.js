import bcrypt from 'bcrypt'

import User from '../schemas/User'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) return res.status(400).json({ error: 'User not found' })

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword)
      return res.status(401).json({ error: 'Invalid password' })

    return res.json({
      user,
      // token: user.generateToken(),
    })
  }
}

export default new SessionController()
