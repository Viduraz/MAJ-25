import express from 'express';

import { createRegistration, getRegistration, getAllRegistration, updateRegistration, deleteRegistration,getUserByEmail,getUsersBySchool } from '../controllers/registration.controller.js';


const router = express.Router();

router.post('/', createRegistration);
router.post('/single', getRegistration);
router.get('/:email', getUserByEmail);
router.get('/sameschool/all/:email', getUsersBySchool);
router.get('/', getAllRegistration);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);


export default router;
