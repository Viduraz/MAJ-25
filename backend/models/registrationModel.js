const mongoose = require('mongoose');

// Define the schema for registration
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  school: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['scout_master', 'scout', 'lady_scout'],
    required: true
  },
  qrCode: {
    type: String,
    required: true
  },
  classroom: {
    type: String,
    required: function() {
      return this.role === 'lady_scout';
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String,
  },
  medicalInfo: {
    allergies: [String],
    medications: [String],
    conditions: [String],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  activities: [{
    name: String,
    score: Number,
    completedAt: Date
  }]
}, {
  timestamps: true
});

// Add a pre-save hook to generate QR code if not provided
registrationSchema.pre('save', async function(next) {
  if (!this.qrCode) {
    // Here you would implement QR code 
    // For example:
    // this.qrCode = await generateQRCode(this._id.toString());
    console.log('QR code generation placeholder');
  }
  next();
});

// Export the model
const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
