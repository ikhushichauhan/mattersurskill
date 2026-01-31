const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Provider only)
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skillsRequired,
      location,
      workType,
      duration,
      payment,
      deadline
    } = req.body;

    const job = await Job.create({
      title,
      description,
      category,
      skillsRequired,
      location,
      workType,
      duration,
      payment,
      deadline,
      provider: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res) => {
  try {
    const { category, city, status, workType } = req.query;
    const query = {};

    if (category) query.category = category;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (status) query.status = status;
    if (workType) query.workType = workType;

    const jobs = await Job.find(query)
      .populate('provider', 'name email phone rating location')
      .populate('assignedWorker', 'name email phone rating')
      .sort({ postedDate: -1 });

    res.json({
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('provider', 'name email phone rating location verified')
      .populate('assignedWorker', 'name email phone rating')
      .populate('applicants.worker', 'name email phone rating skills');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Provider only)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job provider
    if (job.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Provider only)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();

    res.json({ message: 'Job removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private (Worker only)
const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({ message: 'This job is no longer accepting applications' });
    }

    // Check if already applied
    const alreadyApplied = job.applicants.find(
      applicant => applicant.worker.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    job.applicants.push({
      worker: req.user._id,
      coverLetter: req.body.coverLetter,
    });

    await job.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept/Reject job application
// @route   PUT /api/jobs/:jobId/applicants/:applicantId
// @access  Private (Provider only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applicant = job.applicants.id(req.params.applicantId);

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    applicant.status = status;

    if (status === 'accepted') {
      job.assignedWorker = applicant.worker;
      job.status = 'in-progress';
    }

    await job.save();

    res.json({ message: `Application ${status}`, job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's jobs (posted or applied)
// @route   GET /api/jobs/my/jobs
// @access  Private
const getMyJobs = async (req, res) => {
  try {
    let jobs;

    if (req.user.userType === 'provider') {
      // Get jobs posted by provider
      jobs = await Job.find({ provider: req.user._id })
        .populate('assignedWorker', 'name email phone rating')
        .sort({ postedDate: -1 });
    } else {
      // Get jobs applied by worker
      jobs = await Job.find({ 'applicants.worker': req.user._id })
        .populate('provider', 'name email phone rating location')
        .sort({ postedDate: -1 });
    }

    res.json({
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Complete a job
// @route   PUT /api/jobs/:id/complete
// @access  Private (Provider only)
const completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    job.status = 'completed';
    await job.save();

    // Update worker's completed jobs count
    if (job.assignedWorker) {
      await User.findByIdAndUpdate(job.assignedWorker, {
        $inc: { completedJobs: 1 }
      });
    }

    res.json({ message: 'Job marked as completed', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  updateApplicationStatus,
  getMyJobs,
  completeJob,
};
