# 🌟 Digital Mental Health & Psychological Support System

A **comprehensive digital platform** to support the mental health of college students, combining **AI-powered mood detection, peer support networks, gamified exercises, and multimedia analysis** for **accessible, stigma-free, personalized psychological support**.

---

## 🎯 Features

### **1. AI-Based Mood Detection**
- Detect emotions from **voice, text, facial expressions, and music preferences**.  
- Track **mood trends over time** for self-awareness.  

### **2. Resilient Peer Network**
- Connect students with peers who have **overcome mental health challenges**.  
- Offers **safe and anonymous support** through chat and forums.  

### **3. Gamified Micro-Tasks & Rewards**
- Interactive exercises, quizzes, and mini-games for mental wellness.  
- **Rewards system** encourages daily engagement.  

### **4. Early Intervention Alerts**
- AI identifies **high-risk moods** and suggests interventions.  
- Optional alert system for **trusted peers or counselors**.  

### **5. Trend Visualization & Dashboards**
- Track progress via **charts and analytics** for users and admins.  

---

## 🛠 Tech Stack

### **Frontend**
- **React** → Web interface  
- **Flutter** → Mobile interface  
- **Chart.js / D3.js** → Trend visualization  

### **Backend**
- **Node.js** → API & server handling  
- **Django / Flask** → AI/mood processing & server-side logic  

### **Database**
- **MongoDB** → Unstructured data (chat messages, AI logs)  
- **PostgreSQL** → Structured data (user profiles, peer connections, rewards)  

### **Machine Learning / AI**
- **OpenCV / MediaPipe** → Facial landmark detection  
- **DeepFace / FaceNet** → Emotion recognition  
- **PyTorch / TensorFlow / Keras** → Train CNNs/RNNs on video sequences  
- **scikit-learn / Hugging Face** → Multimodal analysis & text classification  

### **Chatbot**
- **Flask** → API endpoints  
- **Transformers (Hugging Face)** → Intent detection & conversation management  

### **Additional Tools**
- **Streamlit** → Prototyping AI models & dashboards  
- **Redis / Elasticsearch** → Optional caching & search  
- **Docker / Kubernetes** → Containerization & deployment  

---

## ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mental-health-app.git

# Navigate to project directory
cd mental-health-app

# Install backend dependencies
npm install       # Node.js backend
pip install -r requirements.txt   # Python AI modules

# Set up databases
# PostgreSQL → structured data
# MongoDB → unstructured data

# Run the app
npm start         # Node.js backend
flutter run       # Mobile frontend
