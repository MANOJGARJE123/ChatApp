import express from 'express';
import { getMe, getAllUsers, getUserById, searchUser, updateUser, deleteUser } from '../controller/userController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.get('/me', isAuth, getMe);
router.get('/all', isAuth, getAllUsers);
router.get('/search', isAuth, searchUser);
router.get('/:id', isAuth, getUserById);
router.put('/update', isAuth, updateUser);
router.delete('/delete', isAuth, deleteUser);

export default router;
