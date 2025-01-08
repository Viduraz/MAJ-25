import express from 'express';
import { createRegistration, getRegistration, getAllRegistration } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/', createRegistration);
router.post('/single', getRegistration);
router.get('/', getAllRegistration);

export default router;
