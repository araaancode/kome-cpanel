const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Owner = require('../models/Owner')

const authOwner = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization


  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // extract token from authHeader string
      token = authHeader.split(' ')[1]

      // verified token returns owner id
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // find owner's obj in db and assign to req.Owner
      req.owner = await Owner.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})



module.exports = authOwner