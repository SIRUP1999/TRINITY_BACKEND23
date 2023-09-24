// const User = require('../Model/User')
const bcrypt = require('bcrypt')
// const s = require('socket.io')

const User = {
  users: require('../Model/Users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

const fspromises = require('fs').promises
const path = require('path')
const findAllUsers = async (req, res) => {
  // const user = await User.find().lean()
  const user1 = User.users
  if (!User?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(user1)
}

// socket injection********starts//

const CreateUser = async (req, res) => {
  const { username, password, roles, active } = req.body
  if (!username || !password)
    return res.status(404).send('username and password are required')
  // const duplicate = await User.findOne({ username }).exec()
  // if (duplicate) return res.status(409).json({ message: 'duplicate username' })
  const hashedPwd = await bcrypt.hash(password, 10)
  // const newUser =
  //   !Array.isArray(roles) || !roles.length
  //     ? { username, password: hashedPwd, active }
  //     : { username, password: hashedPwd, active, roles }
  // await User.create(newUser)
  // res.status(201).json({ message: `sucess,username ${username} created` })
  const duplicate = User.users.find((user) => user.username === username)
  if (duplicate) return res.status(409).json('duplicate users')
  if (!Array.isArray(roles) || !roles.length) {
    res.json('role not accepted')
  }

  const NewUser = {
    username,
    password: hashedPwd,
    roles,
    active,
  }
  const oldUsers = User.users.filter((user) => user.username !== username)
  const postedUsers = [...oldUsers, NewUser]
  User.setUsers(postedUsers)

  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'Users.json'),
    JSON.stringify(User.users)
  )

  res.json('user created sucessfully')
}

const UpdateUser = async (req, res) => {
  const { id, username, roles, active, password } = req.body

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return res
      .status(400)
      .json({ message: 'All fields except password are required' })
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec()

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  user.username = username
  user.roles = roles
  user.active = active

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10) // salt rounds
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated` })
}

const deleteUser = async (req, res) => {
  const { id } = req.body
  const user = await User.findById(id).exec()
  if (!user) return res.status(403).json({ message: 'forbidden,no user exist' })
  await user.deleteOne()
  const message = ` ${user.username} was deleted sucessfully`
  res.json(message)
}

module.exports = {
  findAllUsers,
  CreateUser,
  UpdateUser,
  deleteUser,
}
