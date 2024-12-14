import express from 'express';
import { test, updateUser , deleteUser} from '../controllers/user.controller.js';
import pkg from 'jsonwebtoken';      
const { verify } = pkg;
import { verifyToken } from '../Utils/VerifyUser.js';

const router = express.Router();

router.get('/', test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;