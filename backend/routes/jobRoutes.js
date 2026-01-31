const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  updateApplicationStatus,
  getMyJobs,
  completeJob,
} = require('../controllers/jobController');
const { protect, authorizeUserType } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllJobs)
  .post(protect, authorizeUserType('provider'), createJob);

router.get('/my/jobs', protect, getMyJobs);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorizeUserType('provider'), updateJob)
  .delete(protect, authorizeUserType('provider'), deleteJob);

router.post('/:id/apply', protect, authorizeUserType('worker'), applyForJob);
router.put('/:id/complete', protect, authorizeUserType('provider'), completeJob);
router.put('/:jobId/applicants/:applicantId', protect, authorizeUserType('provider'), updateApplicationStatus);

module.exports = router;
