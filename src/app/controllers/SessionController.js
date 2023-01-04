import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../schemas/User'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ error: 'User not found' })

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword)
      return res.status(401).json({ error: 'Invalid password' })

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      }),
    })
  }
}

export default new SessionController()
