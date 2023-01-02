import jwt from 'jsonwebtoken'
import dataConfig from '../../config/data'

export default (req, res, next) => {
  const authToken = req.headers.authorization

  if (!authToken) return res.status(401).json({ error: 'Token not provided' })

  const token = authToken.split(' ')[1]

  try {
    jwt.verify(token, dataConfig.secret, function (err, decoded) {
      if (err) {
        throw new Error()
      }
      req.userId = decoded.id

      return next()
    })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
