import express from 'express';
import { createRegistration, getRegistration } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/', createRegistration);
router.post('/single', getRegistration);

export default router;
