# MindfulU - Mental Health Platform

A comprehensive digital mental health platform designed to support students with AI-powered chatbot, PHQ-9 assessments, counselor booking, peer support network, and resource access.


## 🌟 Features

- **AI Mental Health Chatbot** - Trained on mental health conversations with TensorFlow/Keras
- **PHQ-9 Depression Assessment** - Professional mental health screening tool
- **Resilient Peer Network** - Anonymous peer-to-peer support community with moderation
- **Counselor Booking System** - Connect with certified mental health professionals
- **Resource Hub** - Access to mental wellness articles, meditation guides, and self-help tools
- **User Authentication** - Secure signup/login with JWT tokens
- **Dashboard** - Personalized student wellness journey tracking
- **Crisis Support System** - Immediate help resources and emergency contacts
- **Responsive Design** - Optimized for mobile and desktop devices

## 🤝 Resilient Peer Network

### Core Features
- **Anonymous Support Groups** - Join topic-based support groups while maintaining privacy
- **Peer Mentorship Program** - Connect with trained student mentors who've overcome similar challenges
- **Safe Space Guidelines** - Community-driven moderation with professional oversight
- **Resource Sharing** - Peer-curated wellness content and coping strategies
- **Progress Celebration** - Anonymized milestone sharing to inspire others
- **Crisis Prevention Network** - Peer early warning system with professional escalation

### How It Works
1. **Anonymous Profiles** - Users create anonymous personas for peer interactions
2. **Interest Matching** - Algorithm matches users based on shared challenges/interests
3. **Moderated Discussions** - AI-assisted moderation with human oversight
4. **Peer Support Circles** - Small, focused groups (5-8 members) for intimate support
5. **Mentor Matching** - Connect with recovered peers who volunteer as mentors
6. **Resource Co-creation** - Community members contribute to shared resource library

### Safety Measures
- Professional moderator oversight
- AI content filtering for harmful content
- Escalation protocols for crisis situations
- Regular wellness check-ins for active participants
- Clear community guidelines and reporting systems

## 🏗️ Project Structure

```
```
Mental_Health/
├── backend/                # Node.js/Express API (auth, assessments, peer network)
│   ├── models/             # Mongoose models (User, SupportGroup, PeerMessage, MentorConnection)
│   ├── routes/             # API route handlers
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, moderation, error handling
│   ├── utils/              # Utility functions (encryption, matching)
│   ├── tests/              # Unit/integration tests
│   ├── .env.example        # Example environment variables
│   └── index.js            # API entry point
├── frontend/               # React 18 + Vite client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-based pages (Dashboard, Chatbot, PeerNetwork, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Frontend utilities
│   │   ├── assets/         # Images, icons, styles
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static files
│   ├── .env.example        # Example frontend env
│   └── vite.config.js      # Vite config
├── chatbot/                # Python AI chatbot (Flask + TensorFlow)
│   ├── intents.json        # Training data
│   ├── model/              # Saved model files
│   ├── training.py         # Model training script
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── utils.py            # NLP utilities
|
├── docs/                   # Additional documentation, diagrams
├── .gitignore
├── README.md
└── LICENSE
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local or Atlas)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/aditya-strategix/SIH-2025.git
cd SIH-2025/Mental_Health
```

### 2. Setup Backend (Node.js API)

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
PEER_NETWORK_SECRET=your_peer_network_secret_key
MODERATION_API_KEY=your_moderation_api_key
CRISIS_HOTLINE_API=your_crisis_support_api
```

Start the backend server:
```bash
npm run dev
# or
node index.js
```

Backend will run on: `http://localhost:5000`

### 3. Setup Frontend (React)

```bash
cd ../frontend
npm install
```

Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000
VITE_CHATBOT_URL=http://localhost:5001```

Start the frontend:
```bash
npm run dev
```


### 4. Setup AI Chatbot (Python)

```bash
cd ../chatbot
```

Install Python dependencies:
```bash
pip install flask flask-cors tensorflow nltk numpy pickle-mixin bcrypt
```

Download required NLTK data:
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('wordnet')"
```

Train the chatbot model (first time setup):
```bash
python training.py
```

Start the chatbot server:
```bash
python app.py
```

Chatbot API will run on: `http://localhost:5001`

### 5. Setup Peer Network Service

```bash
cd ../peer-network
npm install
```

Create `.env` file:
```env
PORT=5002
MONGO_URI=your_mongodb_connection_string_here
PEER_NETWORK_SECRET=your_peer_network_secret_key
MODERATION_API_KEY=your_moderation_api_key
CRISIS_ESCALATION_EMAIL=crisis-support@your-organization.com
```

Start the peer network service:
```bash
npm run dev
```

Peer Network API will run on: `http://localhost:5002`

## 🔧 Development Setup

### Backend API Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | User registration |
| POST | `/api/users/login` | User login |
| POST | `/api/users/create-peer-profile` | Create anonymous peer profile |

#### Assessment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/forms/submit` | Submit PHQ-9 assessment |
| GET | `/api/forms/responses/:email` | Get user assessments |

#### Peer Network
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/peer/groups` | List available support groups |
| POST | `/api/peer/groups/join` | Join a support group |
| POST | `/api/peer/groups/create` | Create new support group |
| GET | `/api/peer/mentors` | Find available mentors |
| POST | `/api/peer/connect` | Request mentor connection |
| POST | `/api/peer/message` | Send peer message |
| POST | `/api/peer/report` | Report inappropriate content |

### Chatbot API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check chatbot status |
| POST | `/chat` | Send message to AI |

### Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page |
| `/auth` | AuthPage | Login/Signup |
| `/dashboard` | Dashboard | User dashboard |
| `/chatbot` | Chatbot | AI chat interface |
| `/peer-network` | PeerNetwork | Peer support hub |
| `/support-groups` | SupportGroups | Browse and join groups |
| `/mentors` | MentorNetwork | Find and connect with mentors |
| `/phq9` | PHQ9Page | Mental health assessment |
| `/result` | AssessmentResult | Assessment results |
| `/counselors` | CounselorList | Counselor booking |
| `/resources` | ResourceHub | Mental health resources |
| `/crisis-support` | CrisisSupport | Emergency resources |

## 🧠 AI Chatbot Training

The chatbot is trained using TensorFlow/Keras with the following architecture:

```python
# Neural Network Architecture
Dense(128, activation='relu')
Dropout(0.5)
Dense(64, activation='relu') 
Dropout(0.5)
Dense(num_classes, activation='softmax')
```

### Training Data Structure (`intents.json`)

```json
{
  "intents": [
    {
      "tag": "greeting",
      "patterns": ["Hi", "Hello", "Hey"],
      "responses": ["Hello! I'm here to support you..."]
    },
    {
      "tag": "peer_support",
      "patterns": ["Connect with others", "Find peer support", "Talk to someone like me"],
      "responses": ["I can connect you with our peer support network. Would you like to join a support group or find a mentor?"]
    }
  ]
}
```

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```
## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time peer communication
- **Material Symbols** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### AI Chatbot
- **Python 3.8+** - Programming language
- **Flask** - Web framework
- **TensorFlow/Keras** - Deep learning
- **NLTK** - Natural language processing
- **NumPy** - Numerical computing

### Peer Network Service
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time messaging
- **MongoDB** - Database for peer data
- **Natural Language Processing** - Content moderation
- **Crypto** - Anonymous ID generation

## 🛡️ Safety & Moderation

### Content Moderation
- **AI-Powered Filtering** - Automatic detection of harmful content
- **Human Oversight** - Professional moderators review flagged content
- **Community Reporting** - Peer reporting system for inappropriate behavior
- **Escalation Protocols** - Crisis intervention pathways

### Privacy Protection
- **Anonymous Interactions** - No real identities shared in peer network
- **Data Encryption** - All peer communications encrypted
- **Selective Disclosure** - Users control what information to share
- **Audit Trails** - Secure logging for safety investigations

### Crisis Prevention
- **Early Warning System** - AI detection of crisis language
- **Peer Support Escalation** - Trained peers can escalate concerns
- **Professional Integration** - Direct connection to crisis counselors
- **Resource Automation** - Automatic sharing of crisis resources

## 🌐 Deployment

### Environment Configuration

Create production environment files:

**Backend `.env`:**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=30d
PEER_NETWORK_SECRET=your_production_peer_secret
MODERATION_API_KEY=your_production_moderation_key
CRISIS_HOTLINE_API=your_crisis_api_endpoint
EMAIL_SERVICE=your_email_service
ADMIN_EMAIL=admin@your-domain.com
```
```

### Deployment Steps

1. **Frontend (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy dist/ folder to hosting platform
```

2. **Backend (Railway/Heroku)**
```bash
cd backend
# Configure environment variables in hosting platform
# Deploy with automatic CI/CD
```

3. **Chatbot (Python App Service)**
```bash
cd chatbot
# Create requirements.txt
# Configure Python hosting environment
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test
npm run test:integration
```

### Frontend Testing
```bash
cd frontend
npm run test
npm run test:e2e
```

### Peer Network Testing
```bash
cd peer-network
npm run test
npm run test:peer-matching
```

## 🔒 Security Features

- **End-to-End Encryption** - Peer messages encrypted
- **Anonymous Authentication** - Separate identity system for peer network
- **Content Filtering** - AI-powered harmful content detection
- **Rate Limiting** - Prevent spam and abuse
- **Audit Logging** - Security event tracking
- **Crisis Detection** - AI monitoring for crisis language
- **Professional Escalation** - Automatic crisis intervention protocols

## 📱 Responsive Design

Optimized for all device sizes:
- **Mobile First** - Touch-friendly peer interaction interfaces
- **Tablet Optimized** - Enhanced group discussion layouts
- **Desktop Enhanced** - Multi-panel peer network interface
- **Accessibility** - Screen reader compatible, keyboard navigation

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic authentication system
- [x] PHQ-9 assessment tool
- [x] AI chatbot integration
- [x] Counselor listing
- [x] Resource hub
- [x] Basic peer network functionality

### Phase 2 (Q1 2026)
- [ ] Advanced peer matching algorithms
- [ ] Mentor certification program
- [ ] Crisis prevention AI system
- [ ] Mobile app for peer network
- [ ] Integration with campus counseling centers

### Phase 3 (Q2 2026)
- [ ] Peer-led support group facilitation
- [ ] Anonymous video support sessions
- [ ] Gamified peer support achievements
- [ ] Advanced analytics for intervention
- [ ] Integration with wearable devices

### Phase 4 (Q3 2026)
- [ ] AI-powered peer compatibility matching
- [ ] Peer network expansion to multiple campuses
- [ ] Professional training module for peer mentors
- [ ] Crisis prediction and prevention system
- [ ] Research collaboration platform

## 🤝 Contributing

### Development Guidelines

1. **Code Standards**
   - Follow ESLint rules for JavaScript/React
   - Follow PEP 8 for Python code
   - Use meaningful commit messages
   - Add tests for new features

2. **Peer Network Development**
   - Test all peer interaction features thoroughly
   - Ensure privacy protection in all peer features
   - Validate content moderation systems
   - Test crisis escalation protocols

3. **Pull Request Process**
   - Create feature branch from main
   - Include tests and documentation
   - Ensure all safety checks pass
   - Get review from maintainers

### Safety First Development

- All peer network features must pass safety review
- Content moderation systems require testing
- Crisis intervention features need professional validation
- Privacy protection measures must be verified

## 📞 Crisis Support Resources

### Immediate Help
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

### Professional Support
- Campus Counseling Centers
- Local Mental Health Services
- Online Therapy Platforms
- Peer Support Helplines

## 🆘 Support & Contact

For technical support:
- **GitHub Issues**: [Create an issue](https://github.com/aditya-strategix/SIH-2025/issues)
- **Documentation**: Project Wiki
- **Developer Discord**: [Join our community]

For crisis or safety concerns:
- **Crisis Support**: Use in-app crisis resources
- **Safety Reports**: safety@mindfulu.com
- **Moderation Issues**: moderation@mindfulu.com

## 🏆 Acknowledgments

- **Mental Health Professionals** - For guidance on peer support best practices
- **Crisis Intervention Specialists** - For safety protocol development
- **Student Mental Health Organizations** - For peer network insights
- **Privacy and Security Experts** - For anonymous interaction design
- **Open Source Community** - For foundational technologies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**MindfulU** - Building Resilient Communities for Student Mental Wellness 🌱

*Together, we're stronger. Together, we heal.*

Made with ❤️ for mental health awareness, peer support, and community resilience.