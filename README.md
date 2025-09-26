# SIH-2025
Digital Mental Health & Psychological Support System
Project Overview

This project aims to develop a comprehensive digital platform to support the mental health of college students. It combines AI-powered mood detection, peer support networks, gamified exercises, and multimedia analysis to provide accessible, stigma-free, and personalized psychological support.

Features

AI-Based Mood Detection

Detects emotions from voice, text, facial expressions, and music preferences.

Tracks mood trends over time for self-awareness.

Resilient Peer Network

Connects students with peers who have overcome mental health challenges.

Offers safe and anonymous support through chat and forums.

Gamified Micro-Tasks & Rewards

Interactive exercises, quizzes, and mini-games for mental wellness.

Rewards system encourages daily engagement.

Early Intervention Alerts

AI identifies high-risk moods and suggests interventions.

Optional alert system for trusted peers or counselors.

Trend Visualization & Dashboards

Track progress via charts and analytics for users and admins.

Tech Stack
Frontend

React → Web interface

Flutter → Mobile interface

Chart.js / D3.js → Trend visualization

Backend

Node.js → API & server handling

Django / Flask → AI/mood processing and server-side logic

Database

MongoDB → Unstructured data (chat messages, AI logs)

PostgreSQL → Structured data (user profiles, peer connections, rewards)

Machine Learning / AI

OpenCV / MediaPipe → Facial landmark detection

DeepFace / FaceNet → Emotion recognition

PyTorch / TensorFlow / Keras → Train CNNs/RNNs on video sequences

scikit-learn / Hugging Face → Multimodal analysis & text classification

Chatbot

Flask → API endpoints

Transformers (Hugging Face) → Intent detection & conversation management

Additional Tools

Streamlit → Prototyping AI models & dashboards

Redis / Elasticsearch → Optional caching and search

Docker / Kubernetes → Containerization & deployment

Installation

Clone the repository:

git clone https://github.com/yourusername/mental-health-app.git


Navigate to project directory:

cd mental-health-app


Install backend dependencies:

npm install # for Node.js backend
pip install -r requirements.txt # for Python AI modules


Set up databases:

Configure PostgreSQL for structured data.

Configure MongoDB for unstructured data.

Run the app:

npm start # Node.js backend
flutter run # Mobile frontend

Usage

Users can sign up, take mood check-ins, connect with peers, and perform gamified exercises.

Admins can view dashboards, monitor peer networks, and analyze mood trends.

Impact

Helps students track and improve mental health.

Reduces dependency on offline counseling through peer support and AI guidance.

Provides data-driven insights for colleges and organizations.

Contributing

Fork the repo and create a branch for your feature.

Make changes and submit a pull request.

Ensure code is tested, clean, and documented.

License

This project is licensed under the MIT License.
