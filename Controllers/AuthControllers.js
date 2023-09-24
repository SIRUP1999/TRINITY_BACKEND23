const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const User = require('../Model/User')
const User = {
  users: require('../Model/Users.json'),
  setUsers: function (data) {
    this.users = data
  },
}
//user Login
const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).send('username and password are required')

  // const foundUser = await User.findOne({ username }).exec()
  // if (!foundUser) return res.status(401).send('duplicate username')
  const foundUser = User.users.find((user) => user.username === username)
  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean)
    const accesstoken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    const refreshtoken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie('jwt', refreshtoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }) //secure:true,sameSite:none
    res.status(201).json({ roles, accesstoken })
  }
}

const refresh = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json('Unauthorized')

  const refreshtoken = cookies.jwt

  jwt.verify(
    refreshtoken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403) //forbiden
      // const foundUser = await User.findOne({
      //   username: decoded.username,
      // }).exec()
      const foundUser = User.users.find(
        (person) => person.username === decoded.username
      )
      if (!foundUser) return res.status(403).send('No User Found')
      const roles = Object.values(foundUser.roles).filter(Boolean)
      const username = foundUser.username
      const accesstoken = jwt.sign(
        {
          userInfo: {
            roles: foundUser.roles,
            username: foundUser.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      )
      res.json({ username, roles, accesstoken })
    }
  )
}

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies.jwt) return res.sendStatus(204) //no content
  res.clearCookie('jwt', { httpOnly: true })
  res.json({ message: 'logout successfully' })
}

module.exports = {
  login,
  logout,
  refresh,
}
