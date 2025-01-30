import express from 'express';
<<<<<<< HEAD

import { createRegistration, getRegistration, getAllRegistration, updateRegistration, deleteRegistration,getUserByEmail } from '../controllers/registration.controller.js';

=======
import { createRegistration, getRegistration } from '../controllers/registration.controller.js';
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

const router = express.Router();

router.post('/', createRegistration);
router.post('/single', getRegistration);
<<<<<<< HEAD
router.get('/:email', getUserByEmail);
router.get('/', getAllRegistration);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);

=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

export default router;
