import express from 'express';
import { getUserDetails, getUserDetailsByUserId, createUserDetails,updateUserDetails, deleteUserDetails } from '../controllers/userDetails.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getUserDetails);

router.get('/user/:id', getUserDetailsByUserId);

router.delete('/:id', deleteUserDetails);

router.put('/user/:id',protect, updateUserDetails)

router.post('/', createUserDetails);

export default router;