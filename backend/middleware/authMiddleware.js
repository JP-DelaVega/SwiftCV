import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt
  if(token){
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find the user by ID
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
        console.error('Token verification failed:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }

  }
  else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
}
);


// admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
