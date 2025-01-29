import express from 'express';
import { addAdmin, updateAdmin, deleteAdmin, getAdmins, loginAdmin } from '../controllers/adminadd.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAdmins);
router.post('/add', addAdmin);
router.put('/update/:id', updateAdmin);
router.delete('/delete/:id', deleteAdmin);
router.post('/login', loginAdmin);
router.get('/gallery', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to AGallery!' });
});
router.get('/activity', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to AActivity!' });
});
router.get('/aregistrations', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to Registrations!' });
});
router.get('/pass-activity', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to passactivity!' });
});



export default router;