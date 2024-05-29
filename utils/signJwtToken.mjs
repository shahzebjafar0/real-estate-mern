import jwt from 'jsonwebtoken'

const signToken = user => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

export default signToken