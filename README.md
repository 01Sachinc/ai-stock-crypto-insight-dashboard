# 🔥 AI Stock & Crypto Insight Dashboard

A premium, production-ready SaaS-style dashboard for tracking financial assets with AI-powered sentiment analysis and system monitoring.

![Aesthetic Dashboard](https://images.unsplash.com/photo-1611974714658-dc3d40909562?auto=format&fit=crop&q=80&w=1200)

## 🎯 Features

- **Real-time Market Data**: Track Bitcoin, Ethereum, Apple, and more via CoinGecko and Yahoo Finance.
- **AI Insight Engine**: Get Bullish/Bearish trends and risk assessments powered by Mistral 7B (HuggingFace).
- **Premium Dark UI**: Glassmorphic design with smooth animations and responsive charts.
- **User Authentication**: Secure JWT-based login and signup.
- **Asset Watchlist**: Save and monitor your favorite stocks and cryptos.
- **Enterprise Monitoring**: Spring Boot Actuator + Prometheus endpoint for system health.

## 🧱 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Recharts, Lucide Icons, Framer Motion.
- **Backend**: Spring Boot (Java 17), Maven, MongoDB.
- **Security**: Spring Security + JWT.
- **AI**: HuggingFace Inference API (Mistral-7B).
- **Monitoring**: micrometer-registry-prometheus.

## 🚀 Getting Started

### 1. Prerequisites
- Java 17+
- Node.js 18+
- MongoDB (running locally or on Atlas)
- HuggingFace API Key (Free)

### 2. Backend Setup
```bash
cd backend
# Update src/main/resources/application.properties with your keys
mvn clean install
mvn spring-boot:run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Monitoring
- Metrics available at: `http://localhost:8080/actuator/prometheus`

## 🌐 Deployment

- **Frontend**: Deploy `frontend/` to **Vercel** or **Netlify**.
- **Backend**: Deploy `backend/` to **Render** or **Railway** (requires MongoDB).

## 📄 License
MIT License. Created by Sachin.
