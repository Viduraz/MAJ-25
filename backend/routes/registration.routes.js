import express from 'express';
import { createRegistration } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/', createRegistration);

export default router;
