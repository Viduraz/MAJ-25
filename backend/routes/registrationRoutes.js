const express = require('express');
const router = express.Router();
const {
  registerParticipant,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getRegistrationsByRole,
  updateRegistrationStatus,
  addActivity,
  getRegistrationStats
} = require('../controllers/registrationController');

// Middleware for protected routes (you'll need to implement this)
const { protect, admin } = require('../middleware/authMiddleware');

// Middleware for input validation
const { validateRegistration } = require('../middleware/validationMiddleware');

// Middleware for rate limiting
const { registrationLimiter } = require('../middleware/rateLimitMiddleware');

// Public routes with rate limiting and validation
router.post('/', registrationLimiter, validateRegistration, registerParticipant);

// Protected routes (require authentication)
router.get('/', protect, admin, getRegistrations);
router.get('/role/:role', protect, getRegistrationsByRole);
router.get('/:id', protect, getRegistrationById);
router.put('/:id', protect, updateRegistration);
router.delete('/:id', protect, admin, deleteRegistration);

// New routes for enhanced functionality
router.patch('/:id/status', protect, admin, updateRegistrationStatus);
router.post('/:id/activities', protect, addActivity);
router.get('/statistics', protect, admin, getRegistrationStats);

module.exports = router;
