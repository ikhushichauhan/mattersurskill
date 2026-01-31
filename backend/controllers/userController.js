const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;

    if (user.userType === 'worker') {
      user.skills = req.body.skills || user.skills;
      user.categories = req.body.categories || user.categories;
      user.availability = req.body.availability || user.availability;
      user.experience = req.body.experience || user.experience;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      userType: updatedUser.userType,
      bio: updatedUser.bio,
      location: updatedUser.location,
      skills: updatedUser.skills,
      categories: updatedUser.categories,
      availability: updatedUser.availability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search workers
// @route   GET /api/users/workers/search
// @access  Public
const searchWorkers = async (req, res) => {
  try {
    const { category, skills, city, availability } = req.query;
    const query = { userType: 'worker' };

    if (category) {
      query.categories = category;
    }

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (availability) {
      query.availability = availability;
    }

    const workers = await User.find(query).select('-password');

    res.json({
      count: workers.length,
      workers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all workers
// @route   GET /api/users/workers
// @access  Public
const getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ userType: 'worker' })
      .select('-password')
      .sort({ rating: -1 });

    res.json({
      count: workers.length,
      workers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  searchWorkers,
  getAllWorkers,
};
