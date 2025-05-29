import express from 'express';
import { getUserDetails, getUserDetailsById, createUserDetails, deleteUserDetails } from '../controllers/userDetails.controller.js';



const router = express.Router();

router.get('/', getUserDetails);

router.get('/:id', getUserDetailsById);

router.delete('/:id', deleteUserDetails);

router.post('/', createUserDetails);

export default router;