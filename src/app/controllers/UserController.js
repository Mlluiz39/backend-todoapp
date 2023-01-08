const yup = require('yup')
const bcrypt = require('bcrypt')

const User = require('../schemas/User')

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    })

    try {
      schema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists)
      return res.status(400).json({ error: 'User already exists' })

    const salt = await bcrypt.genSalt(10)

    const password_hash = await bcrypt.hash(password, salt)

    const { tasks } = req.body

    try {
      const user = await User.create({
        name,
        email,
        password: password_hash,
      })

      // eslint-disable-next-line array-callback-return
      await Promise.all(
        tasks.map(async (task) => {
          // eslint-disable-next-line new-cap, no-undef
          const userTask = new Task({ ...task, user: user._id })

          await userTask.save()

          user.tasks.push(userTask)
        })
      )

      await user.save()

      return res.status(201).json({ msg: 'User created successfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Registration failed' })
    }
  }

  async index(req, res) {
    const users = await User.find()

    return res.status(200).json(users)
  }
}

module.exports = new UserController()
