import express from 'express';
import { createRegistration, getRegistration,getUserByEmail } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/', createRegistration);
router.post('/single', getRegistration);
router.get('/:email', getUserByEmail);

export default router;
