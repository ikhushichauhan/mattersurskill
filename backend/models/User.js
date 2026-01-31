const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number']
  },
  userType: {
    type: String,
    enum: ['worker', 'provider'],
    required: [true, 'Please specify user type']
  },
  // Worker specific fields
  skills: [{
    type: String
  }],
  categories: [{
    type: String,
    enum: ['home-based', 'part-time', 'freelancing', 'local-services', 'manual-jobs', 'cooking', 'packing', 'handicrafts', 'tailoring', 'baking', 'artwork', 'plumbing', 'electrical', 'delivery', 'repair']
  }],
  experience: {
    type: String
  },
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'flexible', 'weekends-only']
  },
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  bio: {
    type: String,
    maxlength: 500
  },
  verified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  profilePicture: {
    type: String,
    default: ''
  },
  idProof: {
    type: String
  },
  completedJobs: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
