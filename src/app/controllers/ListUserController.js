import User from '../schemas/User'

class ListUserController {
  async index(req, res) {
    const users = await User.find()

    return res.json(users)
  }
}

export default new ListUserController()
