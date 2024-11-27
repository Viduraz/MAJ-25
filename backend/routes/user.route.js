import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import pkg from 'jsonwebtoken';      
const { verify } = pkg;
import { verifyToken } from '../Utils/VerifyUser.js';

const router = express.Router();

router.get('/', test);
router.post("/update/:id", verifyToken, updateUser);

export default router;