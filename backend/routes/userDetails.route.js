import express from 'express';
import { getUserDetails, getUserDetailsByUserId, createUserDetails, deleteUserDetails } from '../controllers/userDetails.controller.js';



const router = express.Router();

router.get('/', getUserDetails);

router.get('/user/:id', getUserDetailsByUserId);

router.delete('/:id', deleteUserDetails);

router.post('/', createUserDetails);

export default router;