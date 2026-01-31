const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['home-based', 'part-time', 'freelancing', 'local-services', 'manual-jobs', 'cooking', 'packing', 'handicrafts', 'tailoring', 'baking', 'artwork', 'plumbing', 'electrical', 'delivery', 'repair', 'other']
  },
  skillsRequired: [{
    type: String
  }],
  location: {
    address: String,
    city: {
      type: String,
      required: true
    },
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  workType: {
    type: String,
    enum: ['remote', 'on-site', 'hybrid'],
    default: 'on-site'
  },
  duration: {
    type: String,
    required: true
  },
  payment: {
    amount: {
      type: Number,
      required: [true, 'Please specify payment amount']
    },
    type: {
      type: String,
      enum: ['hourly', 'daily', 'fixed', 'monthly'],
      required: true
    }
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  applicants: [{
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    coverLetter: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  }],
  deadline: {
    type: Date
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for location-based searches
jobSchema.index({ 'location.coordinates': '2dsphere' });
jobSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);
