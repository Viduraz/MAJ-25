import express from 'express';
import { createRegistration, getRegistration, getAllRegistration, updateRegistration, deleteRegistration } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/', createRegistration);
router.post('/single', getRegistration);
router.get('/', getAllRegistration);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);

export default router;
