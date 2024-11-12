const Registration = require('../models/registrationModel');
const QRCode = require('qrcode');
const asyncHandler = require('express-async-handler');

// Generate QR Code
const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    throw new Error('QR Code generation failed');
  }
};

// @desc    Register new participant
// @route   POST /api/registration
// @access  Public
const registerParticipant = asyncHandler(async (req, res) => {
  const { name, school, role } = req.body;

  // Validate required fields
  if (!name || !school || !role) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  // Generate QR code using name and timestamp
  const qrCodeData = `${name}-${Date.now()}`;
  const qrCode = await generateQRCode(qrCodeData);

  // Create registration
  const registration = await Registration.create({
    name,
    school,
    role,
    qrCode,
    classroom: role === 'lady_scout' ? req.body.classroom : undefined
  });

  if (registration) {
    res.status(201).json({
      _id: registration._id,
      name: registration.name,
      school: registration.school,
      role: registration.role,
      qrCode: registration.qrCode,
      classroom: registration.classroom
    });
  } else {
    res.status(400);
    throw new Error('Invalid registration data');
  }
});

// @desc    Get all registrations
// @route   GET /api/registration
// @access  Private/Admin
const getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({});
  res.status(200).json(registrations);
});

// @desc    Get registration by ID
// @route   GET /api/registration/:id
// @access  Private
const getRegistrationById = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  
  if (registration) {
    res.status(200).json(registration);
  } else {
    res.status(404);
    throw new Error('Registration not found');
  }
});

// @desc    Update registration
// @route   PUT /api/registration/:id
// @access  Private
const updateRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }

  const updatedRegistration = await Registration.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedRegistration);
});

// @desc    Delete registration
// @route   DELETE /api/registration/:id
// @access  Private/Admin
const deleteRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }

  await registration.deleteOne();
  res.status(200).json({ message: 'Registration removed' });
});

// @desc    Get registrations by role
// @route   GET /api/registration/role/:role
// @access  Private
const getRegistrationsByRole = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ role: req.params.role });
  res.status(200).json(registrations);
});

// Get registration statistics
const getRegistrationStats = asyncHandler(async (req, res) => {
  const stats = await Registration.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        schools: { $addToSet: '$school' }
      }
    }
  ]);
  res.json(stats);
});

// Add activity to registration
const addActivity = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }
  
  registration.activities.push(req.body);
  await registration.save();
  res.status(200).json(registration);
});

module.exports = {
  registerParticipant,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getRegistrationsByRole,
  getRegistrationStats,
  addActivity
};
