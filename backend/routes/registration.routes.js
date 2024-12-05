import express from 'express';
import { createRegistration } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/registration', createRegistration);

export default router;
