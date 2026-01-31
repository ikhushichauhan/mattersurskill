# MattersUrSkill - Skill-Based Work Platform

A MERN stack web platform that connects skilled and unskilled individuals with genuine work opportunities. MattersUrSkill empowers students, housewives, and unemployed individuals by enabling them to earn from home or nearby locations.

## 🎯 Problem Statement

Many students, housewives, and uneducated individuals lack opportunities to earn money due to:
- Time constraints
- Lack of access to formal job platforms
- Absence of trusted platforms
- Dependency on middlemen
- Underutilization of practical skills

## 💡 Solution

MattersUrSkill provides a trusted digital platform that:
- Connects workers with work providers directly
- Eliminates middlemen
- Verifies users for security
- Supports location-based matching
- Offers flexible work options
- Promotes skill recognition over formal education

## 🚀 Features

### For Workers
- Register and create skill-based profiles
- Browse and apply for jobs
- Location-based job matching
- Flexible work options (home-based, part-time, remote)
- Build reputation through ratings and reviews
- Track application status

### For Work Providers
- Post job requirements with detailed specifications
- Review worker applications
- Accept/reject applicants
- Direct communication with workers
- Rate and review workers after job completion
- Manage multiple job postings

### Categories Supported
- **Home-based work**: Cooking, Packing, Handicrafts, Tailoring, Baking, Artwork
- **Local services**: Plumbing, Electrical, Repair, Delivery
- **Flexible work**: Part-time, Freelancing, Manual jobs

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT) for authentication
- Bcrypt.js for password hashing
- REST API architecture

### Frontend
- React.js
- React Router DOM
- Axios for API calls
- Context API for state management
- CSS3 for styling

## 📋 Prerequisites

Before running this project, make sure you have installed:
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/matterurskill
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=30d
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or start MongoDB manually
mongod
```

## 🚀 Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend
npm start

# For development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend Application

```bash
# From frontend directory
cd frontend
npm start
```

The frontend application will run on `http://localhost:3000`

## 📁 Project Structure

```
project/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User management
│   │   ├── jobController.js      # Job management
│   │   ├── reviewController.js   # Reviews & ratings
│   │   └── conversationController.js  # Messaging
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Job.js                # Job schema
│   │   ├── Review.js             # Review schema
│   │   └── Conversation.js       # Conversation schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── userRoutes.js         # User endpoints
│   │   ├── jobRoutes.js          # Job endpoints
│   │   ├── reviewRoutes.js       # Review endpoints
│   │   └── conversationRoutes.js # Messaging endpoints
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js         # Navigation component
    │   ├── context/
    │   │   └── AuthContext.js    # Authentication context
    │   ├── pages/
    │   │   ├── Home.js           # Landing page
    │   │   ├── Login.js          # Login page
    │   │   ├── Register.js       # Registration page
    │   │   ├── Jobs.js           # Job listings
    │   │   ├── JobDetails.js     # Individual job details
    │   │   ├── PostJob.js        # Post new job
    │   │   ├── Dashboard.js      # User dashboard
    │   │   ├── Workers.js        # Worker listings
    │   │   └── Profile.js        # User profile
    │   ├── App.js                # Main app component
    │   ├── App.css
    │   ├── index.js              # Entry point
    │   └── index.css             # Global styles
    ├── .gitignore
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users/workers` - Get all workers
- `GET /api/users/workers/search` - Search workers with filters
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `POST /api/jobs` - Create new job (Protected - Provider only)
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job (Protected - Provider only)
- `DELETE /api/jobs/:id` - Delete job (Protected - Provider only)
- `POST /api/jobs/:id/apply` - Apply for job (Protected - Worker only)
- `PUT /api/jobs/:id/complete` - Mark job as completed (Protected - Provider only)
- `PUT /api/jobs/:jobId/applicants/:applicantId` - Accept/reject applicant (Protected - Provider only)
- `GET /api/jobs/my/jobs` - Get user's jobs (Protected)

### Reviews
- `POST /api/reviews` - Create review (Protected)
- `GET /api/reviews/:userId` - Get user reviews
- `GET /api/reviews/review/:id` - Get review by ID

### Conversations
- `POST /api/conversations` - Create conversation (Protected)
- `GET /api/conversations` - Get user conversations (Protected)
- `GET /api/conversations/:id` - Get conversation details (Protected)
- `POST /api/conversations/:id/messages` - Send message (Protected)
- `PUT /api/conversations/:id/read` - Mark messages as read (Protected)

## 👥 User Types

### Worker
- Can create profile with skills and availability
- Can browse and apply for jobs
- Can receive ratings and reviews
- Can track application status

### Provider
- Can post job requirements
- Can review worker applications
- Can accept/reject applicants
- Can rate and review workers

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are generated upon login/registration
- Tokens are stored in localStorage
- Protected routes require valid token in Authorization header
- Token format: `Bearer <token>`

## 🎨 Key Features Implementation

### Location-Based Matching
- Jobs and workers include location information
- Search and filter by city/state
- Geospatial indexing support (MongoDB 2dsphere)

### Rating & Review System
- Both workers and providers can be reviewed
- Average rating calculation
- Review count tracking
- Prevents duplicate reviews

### Job Application System
- Workers can apply with cover letter
- Providers can accept/reject applications
- Job status tracking (open, in-progress, completed, cancelled)
- Application status tracking (pending, accepted, rejected)

### User Verification
- Email-based registration
- Phone number collection
- Verified badge system (placeholder for future implementation)

## 🚦 Usage Guide

### For Workers

1. **Register**: Create account as "Worker"
2. **Complete Profile**: Add skills, categories, and availability
3. **Browse Jobs**: Search for jobs matching your skills
4. **Apply**: Submit applications with cover letter
5. **Track Status**: Monitor applications in dashboard
6. **Build Reputation**: Complete jobs and receive ratings

### For Work Providers

1. **Register**: Create account as "Provider"
2. **Post Job**: Create detailed job listing
3. **Review Applications**: Check worker profiles and applications
4. **Select Worker**: Accept suitable applicant
5. **Manage Job**: Track job progress
6. **Complete & Review**: Mark job complete and rate worker

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongod

# Check MongoDB service status (Windows)
net start MongoDB
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### CORS Issues
- Ensure backend server is running on port 5000
- Frontend proxy is configured in package.json

## 🔮 Future Enhancements

- Real-time chat using Socket.io
- Email verification system
- SMS notifications
- Payment gateway integration
- Advanced search with filters
- Worker portfolio with images
- Job recommendation system
- Mobile application (React Native)
- Admin dashboard
- Analytics and reporting
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is for educational purposes.

## 👨‍💻 Developer

Created as a university project for addressing unemployment through skill-based work opportunities.

## 📧 Support

For support, email your-email@example.com or create an issue in the repository.

---

**MattersUrSkill** - Empowering Skills, Creating Opportunities 🚀
