import express from 'express';
import { getUserDetails, getUserDetailsByUserId, createUserDetails,updateUserDetails, deleteUserDetails } from '../controllers/userDetails.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getUserDetails);

router.get('/user/:id', getUserDetailsByUserId);

router.delete('user/:id', deleteUserDetails);

router.patch('/user/:id',protect, updateUserDetails)

router.post('/user', createUserDetails);

export default router;